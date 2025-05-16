export * from "./set.types.ts";
/**
 * Checks if the new Set methods (intersection, union, difference, etc.) are supported.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set#set_composition
 * - Chrome: 122+
 * - Safari: 17+
 */
export const caniuseSetMethods = "intersection" in Set.prototype;
import {
  set_difference as native_set_difference,
  set_intersection as native_set_intersection,
  set_is_disjoint_from as native_set_is_disjoint_from,
  set_is_subset_of as native_set_is_subset_of,
  set_is_superset_of as native_set_is_superset_of,
  set_symmetric_difference as native_set_symmetric_difference,
  set_union as native_set_union,
} from "./set.native.ts";
import {
  set_difference as shim_set_difference,
  set_intersection as shim_set_intersection,
  set_is_disjoint_from as shim_set_is_disjoint_from,
  set_is_subset_of as shim_set_is_subset_of,
  set_is_superset_of as shim_set_is_superset_of,
  set_symmetric_difference as shim_set_symmetric_difference,
  set_union as shim_set_union,
} from "./set.shim.ts";
/*@__NO_SIDE_EFFECTS__*/
const use = <R>([native, shim]: R[]): R => (caniuseSetMethods ? native : shim);

export const set_union = use([native_set_union, shim_set_union]);

export const set_intersection = use([native_set_intersection, shim_set_intersection]);

export const set_difference = use([native_set_difference, shim_set_difference]);

export const set_symmetric_difference = use([native_set_symmetric_difference, shim_set_symmetric_difference]);

export const set_is_subset_of = use([native_set_is_subset_of, shim_set_is_subset_of]);

export const set_is_superset_of = use([native_set_is_superset_of, shim_set_is_superset_of]);

export const set_is_disjoint_from = use([native_set_is_disjoint_from, shim_set_is_disjoint_from]);
