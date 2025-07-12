// Forked from unjs/defu (MIT)
import {obj_assign_props} from "@gaubee/util/object";
import type {MergeConfig} from "./types.ts";
import {isPlainObject} from "./utils.ts";

// Base function to apply defaults
function _merge_config<T>(baseObject: T, defaults: any, namespace = ".", merger?: MergeConfig.Merger): T {
  if (!isPlainObject(defaults)) {
    return _merge_config(baseObject, {}, namespace, merger);
  }

  const object = Object.assign({}, defaults);

  for (const key in baseObject) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }

    const value = baseObject[key];

    if (value === null || value === undefined) {
      continue;
    }

    if (merger && merger(object, key, value, namespace)) {
      continue;
    }

    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isPlainObject(value) && isPlainObject(object[key])) {
      object[key] = _merge_config(value, object[key], (namespace ? `${namespace}.` : "") + key.toString(), merger);
    } else {
      object[key] = value;
    }
  }

  return object;
}

// Create defu wrapper with optional merger and multi arg support
export function createMergeConfig(merger?: MergeConfig.Merger): MergeConfig.MergeFn {
  return (...args) =>
    // eslint-disable-next-line unicorn/no-array-reduce
    args.reduce((p, c) => _merge_config(p, c, "", merger), {} as any);
}

// Custom version with function merge support
const defuFn = createMergeConfig((object, key, currentValue) => {
  if (object[key] !== undefined && typeof currentValue === "function") {
    object[key] = currentValue(object[key]);
    return true;
  }
});

// Custom version with function merge support only for defined arrays
const defuArrayFn = createMergeConfig((object, key, currentValue) => {
  if (Array.isArray(object[key]) && typeof currentValue === "function") {
    object[key] = currentValue(object[key]);
    return true;
  }
});

// Standard version
export const mergeConfig: MergeConfig.Instance = obj_assign_props(createMergeConfig(), {
  fn: defuFn,
  arrayFn: defuArrayFn,
  create: createMergeConfig,
});
