export const set_next = <T>(arr: Array<T>, item: T) => {
  arr[arr.length] = item;
};
export const get_first = <T>(arr: ArrayLike<T>) => {
  if (arr.length <= 0) {
    throw new RangeError("could not get first element");
  }
  return arr[0];
};
export const get_first_or_null = <T>(arr: ArrayLike<T>) => {
  return arr[0] as T | undefined;
};
export const get_last = <T>(arr: ArrayLike<T>) => {
  const len = arr.length;
  if (len <= 0) {
    throw new RangeError("could not get last element");
  }
  return arr[len - 1];
};

export const get_last_or_null = <T>(arr: ArrayLike<T>) => {
  const len = arr.length;
  if (len > 0) {
    return arr[len - 1] as T | undefined;
  }
};

type IArrItem<A> = A extends Iterable<infer T> ? T : never;
export const mapAsync = <T extends Iterable<unknown>, R>(
  items: T,
  callbackfn: (value: IArrItem<T>, index: number, source: T, target: R[]) => R
) => {
  const result: R[] = [];
  let index = 0;
  for (const item of items) {
    result.push(callbackfn(item as IArrItem<T>, index++, items, result));
  }
  return Promise.allSettled(result);
};

export const mapNotNull = <T extends Iterable<unknown>, R>(
  items: T,
  callbackfn: (
    value: NonNullable<IArrItem<T>>,
    index: number,
    source: T,
    target: R[]
  ) => R
) => {
  const result: R[] = [];
  let pos = 0;
  for (const item of items) {
    const index = pos++;
    if (item != null) {
      result.push(
        callbackfn(item as NonNullable<IArrItem<T>>, index, items, result)
      );
    }
  }
  return result;
};
