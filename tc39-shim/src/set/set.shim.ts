/**
 * 参考 https://github.com/rauschma/set-methods-polyfill
 */

import {iter_iterable, withEffect} from "@gaubee/util";
import type {AnySet, NativeFn} from "./set.types.ts";

/*@__NO_SIDE_EFFECTS__*/
const safeSetFn = <P extends keyof AnySet>(prop: P, fn: NativeFn<P>) =>
  withEffect(fn, () =>
    Object.defineProperty(Set.prototype, prop, {
      value: fn,
      writable: true,
      enumerable: false,
      configurable: true,
    }),
  );

export const set_union = safeSetFn("union", <T, U>(self: Set<T>, other: ReadonlySetLike<U>): Set<T | U> => {
  CheckSetRecord(other);
  const result = new Set<T | U>(self);
  for (const elem of iter_iterable(other.keys())) {
    result.add(elem);
  }
  return result;
});

export const set_intersection = safeSetFn("intersection", <T, U>(self: Set<T>, other: ReadonlySetLike<U>): Set<T & U> => {
  CheckSetRecord(other);
  let smallerElems: Iterator<T | U> | Iterable<T | U>;
  let largerHas: ReadonlySetLike<T | U>;
  if (self.size <= other.size) {
    smallerElems = self;
    largerHas = other;
  } else {
    smallerElems = other.keys();
    largerHas = self;
  }
  const result = new Set<T & U>();

  for (const elem of iter_iterable(smallerElems)) {
    if (largerHas.has(elem)) {
      result.add(elem as T & U);
    }
  }
  return result;
});

export const set_difference = safeSetFn("difference", <T, U>(self: Set<T>, other: ReadonlySetLike<U>): Set<T> => {
  CheckSetRecord(other);
  const result = new Set<T>(self);
  if (self.size <= other.size) {
    for (const elem of self) {
      if (other.has(elem as any)) {
        result.delete(elem);
      }
    }
  } else {
    for (const elem of iter_iterable(other.keys() as Iterator<T & U>)) {
      if (result.has(elem)) {
        result.delete(elem);
      }
    }
  }
  return result;
});

/**
 * - this − other ∪ other − this
 * - xor
 * - the union minus the intersection
 * - all elements that don’t exist in both Sets
 */
export const set_symmetric_difference = safeSetFn("symmetricDifference", <T, U>(self: Set<T>, other: ReadonlySetLike<U>): Set<T | U> => {
  CheckSetRecord(other);
  const result = new Set<T | U>(self);
  for (const elem of iter_iterable(other.keys())) {
    if (self.has(elem as any)) {
      // Delete elements of `this` that also exist in `other`
      result.delete(elem);
    } else {
      // Add elements of `other` that don’t exist in `this`
      result.add(elem);
    }
  }
  return result;
});

export const set_is_subset_of = safeSetFn("isSubsetOf", <T>(self: Set<T>, other: ReadonlySetLike<unknown>): boolean => {
  CheckSetRecord(other);
  for (const elem of self) {
    if (!other.has(elem)) return false;
  }
  return true;
});

export const set_is_superset_of = safeSetFn("isSupersetOf", <T>(self: Set<T>, other: ReadonlySetLike<unknown>): boolean => {
  CheckSetRecord(other);
  for (const elem of iter_iterable(other.keys())) {
    if (!self.has(elem as any)) return false;
  }
  return true;
});

export const set_is_disjoint_from = safeSetFn("isDisjointFrom", <T>(self: Set<T>, other: ReadonlySetLike<T>): boolean => {
  CheckSetRecord(other);
  if (self.size <= other.size) {
    for (const elem of self) {
      if (other.has(elem)) return false;
    }
  } else {
    for (const elem of iter_iterable(other.keys())) {
      if (self.has(elem)) return false;
    }
  }
  return true;
});

/**
 * A simpler version of GetSetRecord that only performs checks.
 */
function CheckSetRecord<T>(obj: ReadonlySetLike<T>): void {
  if (!isObject(obj)) {
    throw new TypeError();
  }
  const rawSize = obj.size;
  const numSize = Number(rawSize);
  // NaN if rawSize is `undefined`
  if (Number.isNaN(numSize)) {
    throw new TypeError();
  }
  // const intSize = ToIntegerOrInfinity(numSize);
  if (typeof obj.has !== "function") {
    throw new TypeError();
  }
  if (typeof obj.keys !== "function") {
    throw new TypeError();
  }
}

function isObject(value: unknown) {
  if (value === null) return false;
  const t = typeof value;
  return t === "object" || t === "function";
}
