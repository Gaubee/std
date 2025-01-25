import { func_catch, func_remember } from "./func.ts";
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

Deno.test("func_catch", async () => {
    const fn1 = func_catch((a: number, b: string) => {
        return `sync ${a}+${b}`;
    }).catchType<string>();
    const fn2 = func_catch((a: number, b: string) => {
        throw `sync ${a}+${b}`;
    }).catchType<string>();

    const fn3 = func_catch(async (a: number, b: string) => {
        return `async ${a}+${b}`;
    }).catchType<string>();
    const fn4 = func_catch(async (a: number, b: string) => {
        throw `async ${a}+${b}`;
    }).catchType<string>();

    assert.deepEqual(fn1(1, "2"), [undefined, `sync 1+2`]);
    assert.deepEqual(fn2(1, "2"), [`sync 1+2`, undefined]);
    assert.deepEqual(await fn3(1, "2"), [undefined, `async 1+2`]);
    assert.deepEqual(await fn4(1, "2"), [`async 1+2`, undefined]);
});
