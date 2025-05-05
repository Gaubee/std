import { func_throttle } from "./throttle.ts";
import { curryThisFn } from "@gaubee/util";
import { delay } from "./promise.ts";

Deno.test("should throttle function calls", async () => {
    let callCount = 0;
    const fn = () => callCount++;

    // 测试 leading: false 的情况
    const throttled = func_throttle(fn, 100);

    throttled(); // 不会立即执行
    assert.equal(callCount, 0);

    await delay(150);
    assert.equal(callCount, 1); // 延迟后执行
});
Deno.test("should support `before` option", async () => {
    let callCount = 0;
    const fn = () => {
        callCount++;
    };
    const throttled = func_throttle(fn, 100, { before: true });

    throttled(); // 立即执行（假设默认配置）
    assert.equal(callCount, 1); // 第一次立即调用

    throttled();
    throttled();

    assert.equal(callCount, 1);

    await delay(150); // 超过节流时间
    assert.equal(callCount, 2); // 新时间窗口的第一次调用
});

Deno.test("should cancel pending execution", async () => {
    let callCount = 0;
    const fn = () => callCount++;
    const throttled = func_throttle(fn, 100);

    throttled(); // 立即执行
    throttled.cancel();

    await delay(150);
    assert.equal(callCount, 0); // 取消后不应再执行
});

Deno.test("should flush pending execution", async () => {
    let callCount = 0;
    const fn = () => callCount++;
    const throttled = func_throttle(fn, 100, { before: false });

    throttled();
    throttled.flush(); // 立即执行

    assert.equal(callCount, 1);
    await delay(150);
    assert.equal(callCount, 1); // 不应重复执行
});

Deno.test("should return promise with result", async () => {
    const fn = () => "result";
    const throttled = func_throttle(fn, 100);

    const result = await throttled();
    assert.equal(result, "result");
});

Deno.test("should track pending status", async () => {
    const fn = () => {};
    const throttled = func_throttle(fn, 100, { before: false });

    assert(!throttled.isPending);

    throttled();
    assert(throttled.isPending); // 有等待中的执行

    await delay(150);
    assert(!throttled.isPending);
});
