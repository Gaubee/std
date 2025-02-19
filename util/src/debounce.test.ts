import { func_debounce } from "./debounce.ts";
import assert from "node:assert";
import { delay } from "./promise.ts";

Deno.test("should debounce function calls", async () => {
    let callCount = 0;
    const fn = () => {
        callCount++;
    };

    const debounced = func_debounce(fn, 100);

    debounced();
    debounced();
    debounced();

    assert.equal(callCount, 0);

    await delay(200);

    assert.equal(callCount, 1);
});

Deno.test("should call the function immediately if `before` option is true", async () => {
    let callCount = 0;
    const fn = () => {
        callCount++;
    };

    const debounced = func_debounce(fn, 100, { before: true });

    debounced();

    assert.equal(callCount, 1);

    await delay(200);

    assert.equal(callCount, 1);
});

Deno.test("should clear the timer with `cancel` method", async () => {
    let callCount = 0;
    const fn = () => {
        callCount++;
    };

    const debounced = func_debounce(fn, 100);

    debounced();
    debounced.clear();

    await delay(200);

    assert.equal(callCount, 0);
});

Deno.test("should flush the timer with `flush` method", async () => {
    let callCount = 0;
    const fn = () => {
        callCount++;
    };

    const debounced = func_debounce(fn, 100);

    debounced();
    debounced.flush();

    assert.equal(callCount, 1);

    await delay(200);

    assert.equal(callCount, 1);
});

Deno.test("should return a promise that resolves with the function result", async () => {
    const fn = () => "result";

    const debounced = func_debounce(fn, 100);

    const result = await debounced();

    assert.equal(result, "result");
});

Deno.test("should have `isPending` property", async () => {
    let callCount = 0;
    const fn = () => {
        callCount++;
    };

    const debounced = func_debounce(fn, 100);

    assert(!debounced.isPending);

    debounced();

    assert(debounced.isPending);

    await delay(200);

    assert(!debounced.isPending);
});
