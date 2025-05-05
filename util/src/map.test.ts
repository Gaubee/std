import { map_get_or_put_async } from "./map.ts";
import { delay } from "./promise.ts";
import { curryThisFn } from "@gaubee/util";

Deno.test("map_get_or_put_async", async () => {
    const map = new Map<string, number>();
    const v1 = map_get_or_put_async(map, "qaq", async () => {
        console.log(1);
        await delay(100);
        return 1;
    });
    const v2 = map_get_or_put_async(map, "qaq", async () => {
        console.log(2);
        await delay(100);
        return 2;
    });
    const v3 = map_get_or_put_async(map, "qaq", async () => {
        console.log(3);
        await delay(100);
        return 3;
    });
    assert.deepEqual(await Promise.all([v1, v2, v3]), [1, 1, 1]);
});
