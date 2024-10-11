import assert from "node:assert";
import { AGF, GF } from "./generator.ts";
import { str_reverse } from "./string.ts";

Deno.test("GF & AGF", () => {
    assert.deepStrictEqual(GF, (function* () {}).constructor);
    assert.deepStrictEqual(AGF, (async function* () {}).constructor);
});
