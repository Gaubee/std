import {type Func, uncurryThisFn} from "@gaubee/util";
import type {AnySet, NativeFn} from "./set.types.ts";

/*@__NO_SIDE_EFFECTS__*/
const currySetFn = <P extends keyof AnySet>(prop: P): NativeFn<P> => {
  return uncurryThisFn(Set.prototype[prop] as Func);
};

export const set_union = currySetFn("union");

export const set_intersection = currySetFn("intersection");

export const set_difference = currySetFn("difference");

export const set_symmetric_difference = currySetFn("symmetricDifference");

export const set_is_subset_of = currySetFn("isSubsetOf");

export const set_is_superset_of = currySetFn("isSupersetOf");

export const set_is_disjoint_from = currySetFn("isDisjointFrom");
