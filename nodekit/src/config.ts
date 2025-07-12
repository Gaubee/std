import {obj_assign_props} from "@gaubee/util/object";
import * as defu from "defu";
export type {Defu as MergeConfig} from "defu";

export const mergeConfig = obj_assign_props(defu.defu, {
  create: defu.createDefu,
  fn: defu.defuFn,
  arrayFn: defu.defuArrayFn,
});
