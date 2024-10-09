export const set_next = <T>(arr: Array<T>, item: T): void => {
  arr[arr.length] = item;
};
export const get_first = <T>(arr: ArrayLike<T>): T => {
  if (arr.length <= 0) {
    throw new RangeError("could not get first element");
  }
  return arr[0];
};
export const get_first_or_null = <T>(arr: ArrayLike<T>): T | undefined => {
  return arr[0] as T | undefined;
};
export const get_last = <T>(arr: ArrayLike<T>): T => {
  const len = arr.length;
  if (len <= 0) {
    throw new RangeError("could not get last element");
  }
  return arr[len - 1];
};

export const get_last_or_null = <T>(arr: ArrayLike<T>): T | undefined => {
  const len = arr.length;
  if (len > 0) {
    return arr[len - 1] as T | undefined;
  }
};

type IArrItem<A> = A extends Iterable<infer T> ? T : never;
export const mapAsync = <T extends Iterable<unknown>, R>(
  items: T,
  callbackfn: (value: IArrItem<T>, index: number, source: T) => R,
): Promise<PromiseSettledResult<Awaited<R>>[]> => {
  const result: R[] = [];
  let index = 0;
  for (const item of items) {
    result.push(callbackfn(item as IArrItem<T>, index++, items));
  }
  return Promise.allSettled(result);
};

export const mapNotNull = <T extends Iterable<unknown>, R>(
  items: T,
  callbackfn: (
    value: NonNullable<IArrItem<T>>,
    index: number,
    source: T,
  ) => R,
): Array<NonNullable<R>> => {
  const result: NonNullable<R>[] = [];
  let pos = 0;
  for (const item of items) {
    const r = callbackfn(
      item as NonNullable<IArrItem<T>>,
      pos++,
      items,
    );
    if (r != null) {
      result.push(r);
    }
  }
  return result;
};
