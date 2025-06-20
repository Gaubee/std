import type {PromiseMaybe} from "./promise.ts";

/**
 * 遍历 map 对象，将结果聚合 array 对象返回
 */
export const map_to_array = <K, V, R>(map: Map<K, V>, mapper: (value: V, key: K) => R): R[] => {
  const arr: R[] = [];
  map.forEach((value, key) => {
    arr.push(mapper(value, key));
  });
  return arr;
};

export interface CommonMap<K = unknown, V = unknown> {
  has(key: K): boolean;
  get(key: K): V | undefined;
  set(key: K, value: V): unknown;
  delete(key: K): boolean;
}

type GetMapKey<T extends CommonMap> = T extends CommonMap<infer K> ? K : unknown;
type GetMapValue<T extends CommonMap> = T extends CommonMap<unknown, infer V> ? V : unknown;

/**
 * 读取一个map中的值，如果没有，就创建它
 */
export const map_get_or_put = <T extends CommonMap, K extends GetMapKey<T>>(map: T, key: K, put: (key: K, map: T) => GetMapValue<T>): GetMapValue<T> => {
  let value: GetMapValue<T>;
  if (map.has(key)) {
    value = map.get(key) as GetMapValue<T>;
  } else {
    value = put(key, map);
    map.set(key, value);
  }
  return value;
};

/**
 * 删除一个map中的值，同时返回它
 */
export const map_delete_and_get = <T extends CommonMap, K extends GetMapKey<T>>(map: T, key: K): GetMapValue<T> | undefined => {
  let value: GetMapValue<T> | undefined;
  if (map.has(key)) {
    value = map.get(key) as GetMapValue<T>;
    map.delete(key);
  }
  return value;
};

/**
 * 读取一个map中的值，如果没有，就异步地创建它
 * 使用该函数进行异步创建是会互斥上锁的（如果外部修改了map，写入了值，那么最终会以外部修改为准）
 */
export const map_get_or_put_async = async <T extends CommonMap, K extends GetMapKey<T>>(
  map: T,
  key: K,
  put: (key: K, map: T) => PromiseMaybe<GetMapValue<T>>,
): Promise<GetMapValue<T>> => {
  while (true) {
    const pre_lock = (map as any)[locks_keys]?.get(key);
    if (pre_lock != null) {
      await pre_lock;
    } else {
      break;
    }
    if (map.has(key)) {
      return map.get(key) as GetMapValue<T>;
    }
  }
  const locks: Map<any, Promise<void>> = ((map as any)[locks_keys] ??= new Map());
  const lock = Promise.withResolvers<void>();
  locks.set(key, lock.promise);
  try {
    if (map.has(key)) {
      return map.get(key) as GetMapValue<T>;
    }
    const value = await put(key, map);
    map.set(key, value);
    return value;
  } finally {
    locks.delete(key);
    lock.resolve();
  }
};
const locks_keys = /*@__PURE__*/ Symbol.for("map_get_or_put_async-locks");
