export type IterableItem<A, OR = never> = A extends Iterable<infer T> ? T : OR;

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
export const iter_get_first_or_null = <T>(items: Iterable<T>): T | undefined => iter_get_first_or_default(items, () => void 0);

/**
 * 取集合第一个元素
 *
 * 否则取默认返回值
 */
export const iter_get_first_or_default = <T, R>(items: Iterable<T>, defaultValue: () => R): T | R => {
  for (const first of items) {
    return first;
  }
  return defaultValue();
};

/**
 * 遍历集合，返回 PromiseSettledResult。
 * 等同于 Promise.allSettled([...items].map(...))
 */
export const iter_map_async_try = <TS extends Iterable<T>, T = IterableItem<TS>, R = unknown>(
  values: TS,
  callbackfn: (value: T, index: number, values: TS) => R,
): Promise<PromiseSettledResult<Awaited<R>>[]> => {
  const result: R[] = [];
  let index = 0;
  for (const item of values) {
    result.push(callbackfn(item, index++, values));
  }
  return Promise.allSettled(result);
};

export const iter_map_async = <TS extends Iterable<T>, T = IterableItem<TS>, R = unknown>(
  values: TS,
  callbackfn: (value: T, index: number, values: TS) => R,
): Promise<Awaited<R>[]> => {
  const result: R[] = [];
  let index = 0;
  for (const item of values) {
    result.push(callbackfn(item, index++, values));
  }
  return Promise.all(result);
};

/**
 * 遍历集合进行 归约操作。
 * 等同于 Array<T>.reduce
 */
export const iter_reduce = <TS extends Iterable<T>, T = IterableItem<TS>, R = unknown>(
  values: TS,
  callbackfn: (previousValue: R, currentValue: T, currentIndex: number, values: TS) => R,
  initialValue: R,
): R => {
  let index = 0;
  for (const value of values) {
    initialValue = callbackfn(initialValue, value, index++, values);
  }
  return initialValue;
};

/**
 * 对集合进行 拆分然后归约 的操作。
 * 类似于 Array<T>.map.flat.reduce
 */
export const iter_map_reduce = <TS extends Iterable<T>, MS extends Iterable<M>, T = IterableItem<TS>, M = IterableItem<MS>, R = unknown>(
  sources: TS,
  mapfn: (value: T, index: number, values: TS) => MS,
  reducefn: (previousValue: R, currentValue: M, currentIndex: number, values: MS) => R,
  initialValue: R,
): R => {
  let mapIndex = 0;
  let reduceIndex = 0;
  for (const source of sources) {
    const values = mapfn(source, mapIndex++, sources);
    for (const value of values) {
      initialValue = reducefn(initialValue, value, reduceIndex++, values);
    }
  }
  return initialValue;
};

/**
 * 等同于 map 并且 filter 出非空元素
 *
 * 支持任何可迭代的对象
 */
export const iter_map_not_null = <TS extends Iterable<T>, T = IterableItem<TS>, R = T>(
  values: TS,
  callbackfn?: (value: T, index: number, values: TS) => R,
): Array<NonNullable<R>> => {
  const result: NonNullable<R>[] = [];
  let index = 0;
  if (callbackfn) {
    for (const value of values) {
      const r = callbackfn(value, index++, values);
      if (r != null) {
        result.push(r);
      }
    }
  } else {
    for (const value of values) {
      if (value != null) {
        result.push(value as unknown as NonNullable<R>);
      }
    }
  }
  return result;
};

/**
 * 类似与 map not null，但只取第一个
 *
 * 支持任何可迭代的对象
 */
export const iter_first_not_null = <TS extends Iterable<T>, T = IterableItem<TS>, R = unknown>(
  values: TS,
  callbackfn?: (value: T, index: number, values: TS) => R,
): NonNullable<R> | undefined => {
  let index = 0;
  if (callbackfn) {
    for (const value of values) {
      const r = callbackfn(value, index++, values);
      if (r != null) {
        return r;
      }
    }
  } else {
    for (const value of values) {
      if (value != null) {
        return value as unknown as NonNullable<R>;
      }
    }
  }
};

export const iter_iterable = <T>(items: Iterator<T> | Iterable<T> | {length: number; [index: number]: T}): Iterable<T> => {
  if (Symbol.iterator in items) {
    return items as Iterable<T>;
  }
  if ("length" in items) {
    return {
      [Symbol.iterator]: () => {
        let index = 0;
        return {
          next: () => {
            const done = index < items.length;
            return done ? {done, value: void 0} : {done, value: items[index++]};
          },
        };
      },
    };
  }
  return {
    [Symbol.iterator]() {
      return items;
    },
  };
};
