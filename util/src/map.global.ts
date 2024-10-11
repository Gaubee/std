import { curryThisFn, extendsMethod } from "./func.ts";
import { map_delete_and_get, map_get_or_put, map_get_or_put_async } from "./map.ts";

const getOrPut = curryThisFn(map_get_or_put);
const getOrPutAsync = curryThisFn(map_get_or_put_async);
const deleteAndGet = curryThisFn(map_delete_and_get);

extendsMethod(Map.prototype, "getOrPut", getOrPut);
extendsMethod(Map.prototype, "getOrPutAsync", getOrPutAsync);
extendsMethod(Map.prototype, "deleteAndGet", deleteAndGet);

extendsMethod(WeakMap.prototype, "getOrPut", getOrPut);
extendsMethod(WeakMap.prototype, "getOrPutAsync", getOrPutAsync);
extendsMethod(WeakMap.prototype, "deleteAndGet", deleteAndGet);

declare global {
    interface Map<K, V> {
        getOrPut: typeof getOrPut;
        getOrPutAsync: typeof getOrPutAsync;
        deleteAndGet: typeof deleteAndGet;
    }
    interface WeakMap<K extends WeakKey, V> {
        getOrPut: typeof getOrPut;
        getOrPutAsync: typeof getOrPutAsync;
        deleteAndGet: typeof deleteAndGet;
    }
}
