import { func_catch, func_lazy, func_remember } from "./func.ts";
import { curryThisFn } from "@gaubee/util";

Deno.test("func_remember", async () => {
    const fn = func_remember(async () => await crypto.randomUUID());
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
        return await `async ${a}+${b}`;
    }).catchType<string>();
    const fn4 = func_catch(async (a: number, b: string) => {
        throw await `async ${a}+${b}`;
    }).catchType<string>();

    assert.deepEqual(fn1(1, "2"), [undefined, `sync 1+2`]);
    assert.deepEqual(fn2(1, "2"), [`sync 1+2`, undefined]);
    assert.deepEqual(await fn3(1, "2"), [undefined, `async 1+2`]);
    assert.deepEqual(await fn4(1, "2"), [`async 1+2`, undefined]);
});

Deno.test("func_lazy", () => {
    let factoryCallCount = 0;

    const lazyFn = func_lazy(() => {
        factoryCallCount++;
        return (x: number) => x * 2;
    });

    // Factory should not be called until first use
    assert.equal(factoryCallCount, 0);

    // First call should create the function
    assert.equal(lazyFn(5), 10);
    assert.equal(factoryCallCount, 1);

    // Subsequent calls should reuse the same function
    assert.equal(lazyFn(7), 14);
    assert.equal(factoryCallCount, 1);
});

Deno.test("func_lazy with this context", () => {
    let factoryCallCount = 0;

    const lazyFn = func_lazy(() => {
        factoryCallCount++;
        return function (this: { multiplier: number }, x: number) {
            return x * this.multiplier;
        };
    });
    const obj = { multiplier: 3, fn: lazyFn };

    // Test with this context
    assert.equal(obj.fn(5), 15);
    assert.equal(factoryCallCount, 1);

    // Should reuse the same function
    assert.equal(obj.fn(7), 21);
    assert.equal(factoryCallCount, 1);
});
