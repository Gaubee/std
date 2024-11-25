import { func_remember } from "./func.ts";
import assert from "node:assert";

Deno.test("func_remember", async () => {
    const fn = func_remember(async () => crypto.randomUUID());
    const a = fn();
    assert.ok(fn.runned);
    const b = fn();
    assert.equal(await a, await b);
    fn.reset();
    assert.equal(fn.runned, false);
    const c = fn();
    assert.notEqual(await c, await b);
    assert.ok(fn.runned);
});
