/**
 * 在数组末尾追加元素
 *
 * @example
 * ```ts
 * const arr = [] as number[]
 *
 * arr_set_next(arr, 1)
 *
 * // arr == [1]
 * ```
 */
export const arr_set_next = <T>(arr: Array<T>, item: T): void => {
  arr[arr.length] = item;
};
/**
 * 取数字第一个元素
 * 如果是稀疏数组，会跳过稀疏部分，取第一个
 *
 * 注意，如果不存在，会抛出异常
 */
export const sparse_arr_get_first = <T>(arr: ArrayLike<T>): T =>
  sparse_arr_get_first_or_default(arr, () => {
    throw new RangeError("could not get first element");
  });
/**
 * 取数字第一个元素
 * 如果是稀疏数组，会跳过稀疏部分，取第一个
 */
export const sparse_arr_get_first_or_null = <T>(
  arr: ArrayLike<T>,
): T | undefined => sparse_arr_get_first_or_default(arr, () => void 0);
/**
 * 取数字第一个元素
 * 如果是稀疏数组，会跳过稀疏部分，取第一个
 * 否则取默认返回值
 */
export const sparse_arr_get_first_or_default = <T, R>(
  arr: ArrayLike<T>,
  defaultValue: () => R,
): T | R => {
  if (arr.length <= 0) {
    return defaultValue();
  }
  if (0 in arr) {
    return arr[0];
  }
  for (const key in arr) {
    return arr[key];
  }
  return defaultValue();
};
/**
 * 取数字第一个元素（下标 0）
 *
 * 注意，如果不存在，会抛出异常
 */
export const arr_get_first = <T>(
  arr: ArrayLike<T>,
): T =>
  arr_get_first_or_default(arr, () => {
    throw new RangeError("could not get first element");
  });
/**
 * 取数字第一个元素（下标 0）
 */
export const arr_get_first_or_null = <T>(
  arr: ArrayLike<T>,
): T | undefined => arr_get_first_or_default(arr, () => void 0);
/**
 * 取数字第一个元素（下标 0）
 *
 * 否则取默认返回值
 */
export const arr_get_first_or_default = <T, R>(
  arr: ArrayLike<T>,
  defaultValue: () => R,
): T | R => {
  if (arr.length <= 0) {
    return defaultValue();
  }
  return arr[0];
};

/**
 * 取数字最后一个元素
 * 如果是稀疏数组，会跳过稀疏部分
 *
 * 注意，如果不存在，会抛出异常
 */
export const sparse_arr_get_last = <T>(arr: ArrayLike<T>): T =>
  sparse_arr_get_last_or_default(arr, () => {
    throw new RangeError("could not get last element");
  });

/**
 * 取数字最后一个元素
 * 如果是稀疏数组，会跳过稀疏部分
 */
export const sparse_arr_get_last_or_null = <T>(
  arr: ArrayLike<T>,
): T | undefined => sparse_arr_get_last_or_default(arr, () => void 0);

/**
 * 取数字最后一个元素
 * 如果是稀疏数组，会跳过稀疏部分
 *
 * 否则取默认返回值
 */
export const sparse_arr_get_last_or_default = <T, R>(
  arr: ArrayLike<T>,
  defaultValue: () => R,
): T | R => {
  const at = arr.length - 1;
  if (at < 0) {
    return defaultValue();
  }
  if (at in arr) {
    return arr[at];
  }
  if (Array.isArray(arr)) {
    let value: T;
    let hasValue = false;
    try {
      arr.reduceRight((_, last) => {
        hasValue = true;
        value = last;
        throw null;
      });
      // deno-lint-ignore no-empty
    } catch {}
    if (hasValue) {
      return value!;
    }
  } else {
    let lastKey: string | undefined;
    for (const key in arr) {
      if (Number.isFinite(key)) {
        lastKey = key;
      }
    }
    if (lastKey != null) {
      return arr[lastKey as any];
    }
  }
  return defaultValue();
};
/**
 * 取数字最后一个元素（下标 length-1）
 *
 * 注意，如果不存在，会抛出异常
 */
export const arr_get_last = <T>(
  arr: ArrayLike<T>,
): T =>
  arr_get_last_or_default(arr, () => {
    throw new RangeError("could not get last element");
  });
/**
 * 取数字最后一个元素（下标 length-1）
 */
export const arr_get_last_or_null = <T>(
  arr: ArrayLike<T>,
): T | undefined => arr_get_last_or_default(arr, () => void 0);

/**
 * 取数字最后一个元素（下标 length-1）
 *
 * 否则取默认返回值
 */
export const arr_get_last_or_default = <T, R>(
  arr: ArrayLike<T>,
  defaultValue: () => R,
): T | R => {
  const at = arr.length - 1;
  if (at < 0) {
    return defaultValue();
  }
  return arr[at];
};

type IterableItem<A> = A extends Iterable<infer T> ? T : never;

/**
 * 取集合第一个元素
 *
 * 注意，如果不存在，会抛出异常
 */
export const iter_get_first = <T>(items: Iterable<T>): T =>
  iter_get_first_or_default(items, () => {
    throw new RangeError("could not get first element");
  });

/**
 * 取集合第一个元素
 */
export const iter_get_first_or_null = <T>(items: Iterable<T>): T | undefined =>
  iter_get_first_or_default(items, () => void 0);

/**
 * 取集合第一个元素
 *
 * 否则取默认返回值
 */
export const iter_get_first_or_default = <T, R>(
  items: Iterable<T>,
  defaultValue: () => R,
): T | R => {
  for (const first of items) {
    return first;
  }
  return defaultValue();
};

/**
 * 遍历集合，返回 PromiseSettledResult。
 * 等同于 Promise.allSettled([...items].map(...))
 */
export const iter_map_async = <T extends Iterable<unknown>, R>(
  items: T,
  callbackfn: (value: IterableItem<T>, index: number, source: T) => R,
): Promise<PromiseSettledResult<Awaited<R>>[]> => {
  const result: R[] = [];
  let index = 0;
  for (const item of items) {
    result.push(callbackfn(item as IterableItem<T>, index++, items));
  }
  return Promise.allSettled(result);
};

/**
 * 等同于 map 并且 filter 出非空元素
 *
 * 支持任何可迭代的对象
 */
export const iter_map_not_null = <T extends Iterable<unknown>, R>(
  items: T,
  callbackfn: (
    value: NonNullable<IterableItem<T>>,
    index: number,
    source: T,
  ) => R,
): Array<NonNullable<R>> => {
  const result: NonNullable<R>[] = [];
  let pos = 0;
  for (const item of items) {
    const r = callbackfn(
      item as NonNullable<IterableItem<T>>,
      pos++,
      items,
    );
    if (r != null) {
      result.push(r);
    }
  }
  return result;
};
