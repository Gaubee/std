import {arr_get_first, arr_get_first_or_null, arr_get_last, arr_get_last_or_null, iter_first_not_null, iter_map_not_null} from "./collections.ts";
import {curryThisFn, extendsMethod} from "./func.ts";
import {GF} from "./generator.ts";

extendsMethod(Array.prototype, "first", curryThisFn(arr_get_first));
extendsMethod(Array.prototype, "firstOrNull", curryThisFn(arr_get_first_or_null));
extendsMethod(Array.prototype, "last", curryThisFn(arr_get_last));
extendsMethod(Array.prototype, "lastOrNull", curryThisFn(arr_get_last_or_null));
const mapNotNull = curryThisFn(iter_map_not_null);
extendsMethod(Array.prototype, "mapNotNull", mapNotNull);
extendsMethod(Map.prototype, "mapNotNull", mapNotNull);
extendsMethod(Set.prototype, "mapNotNull", mapNotNull);
extendsMethod(GF.prototype, "mapNotNull", mapNotNull);
const firstNotNull = curryThisFn(iter_first_not_null);
extendsMethod(Array.prototype, "firstNotNull", firstNotNull);
extendsMethod(Map.prototype, "firstNotNull", firstNotNull);
extendsMethod(Set.prototype, "firstNotNull", firstNotNull);
extendsMethod(GF.prototype, "firstNotNull", firstNotNull);

declare global {
  interface Array<T> {
    readonly first: T;
    readonly firstOrNull: T | undefined;
    readonly last: T;
    readonly lastOrNull: T | undefined;
    mapNotNull: typeof mapNotNull;
    firstNotNull: typeof firstNotNull;
  }

  interface Map<K, V> {
    mapNotNull: typeof mapNotNull;
    firstNotNull: typeof firstNotNull;
  }
  interface Set<T> {
    mapNotNull: typeof mapNotNull;
    firstNotNull: typeof firstNotNull;
  }
  interface Generator<T = unknown, TReturn = any, TNext = unknown> extends Iterator<T, TReturn, TNext> {
    mapNotNull: typeof mapNotNull;
    firstNotNull: typeof firstNotNull;
  }
}
