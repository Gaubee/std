import { curryThisFn } from "@gaubee/util";
import { iter_first_not_null } from "./collections.ts";

Deno.test("iter_first_not_null", () => {
    const result = iter_first_not_null([1, 2, 3, 4], (v) => {
        if (v > 2) {
            return `data:${v}`;
        }
    });
    assert.equal(result, "data:3");
});
