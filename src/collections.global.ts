import {
    arr_get_first,
    arr_get_first_or_null,
    arr_get_last,
    arr_get_last_or_null,
    iter_map_not_null,
} from "./collections.ts";
import { curryThisFn, extendsMethod } from "./func.ts";

extendsMethod(Array.prototype, "first", curryThisFn(arr_get_first));
extendsMethod(Array.prototype, "firstOrNull", curryThisFn(arr_get_first_or_null));
extendsMethod(Array.prototype, "last", curryThisFn(arr_get_last));
extendsMethod(Array.prototype, "lastOrNull", curryThisFn(arr_get_last_or_null));
const mapNotNull = curryThisFn(iter_map_not_null);
extendsMethod(Array.prototype, "mapNotNull", mapNotNull);

declare global {
    interface Array<T> {
        readonly first: T;
        readonly firstOrNull: T | undefined;
        readonly last: T;
        readonly lastOrNull: T | undefined;
        mapNotNull: typeof mapNotNull;
    }
}
