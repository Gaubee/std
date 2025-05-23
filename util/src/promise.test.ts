import assert from "node:assert";
import {disposable} from "./disposable.ts";
import {delay, promise_once_then, promise_safe_race, timmers} from "./promise.ts";

Deno.test("promise_once_then", async () => {
  const p = delay(100).then(() => 123);
  const r: number[] = [];
  promise_once_then(p, {
    resolve() {
      r.push(1);
    },
  });
  assert.deepStrictEqual(r, [] as number[]);
  await p;
  assert.deepStrictEqual(r, [1]);
  promise_once_then(p, {
    resolve() {
      r.push(2);
    },
  });
  assert.deepStrictEqual(r, [1, 2]);
});

Deno.test("promise_safe_race 基础功能", async () => {
  const disposer = disposable();

  // 测试同步值优先
  const syncResult = await promise_safe_race([
    42,
    delay(10, {disposer}).then(
      () => 100,
      () => 0,
    ),
  ]);
  assert.strictEqual(syncResult, 42);

  // 测试异步优先
  const asyncResult = await promise_safe_race([
    delay(20, {disposer}).then(
      () => "slow",
      () => "",
    ),
    delay(5, {disposer}).then(
      () => "fast",
      () => "",
    ),
  ]);
  assert.strictEqual(asyncResult, "fast");
  await disposer.dispose();
});

Deno.test("promise_safe_race 拒绝处理", async () => {
  const disposer = disposable();
  await assert.rejects(
    async () => {
      await promise_safe_race([
        delay(10, {disposer}).then(() => {
          throw new Error("boom");
        }),
        delay(20, {disposer}).catch(() => ""),
      ]);
    },
    {name: "Error", message: "boom"},
  );
  disposer.dispose();
});

Deno.test("promise_safe_race 空迭代器处理", async () => {
  // 默认行为
  await assert.rejects(
    async () => {
      await promise_safe_race([]);
    },
    {name: "TypeError"},
  );

  // 自定义空处理
  const result = await promise_safe_race([], {
    ifEmpty: () => "default",
  });
  assert.strictEqual(result, "default");
});

Deno.test("promise_safe_race 内存安全验证", async () => {
  // 创建可追踪的 Promise
  const createTrackablePromise = () => {
    let settled = false;
    const p = new Promise((resolve) => {
      setTimeout(() => {
        if (!settled) resolve("done");
      }, 100);
    });
    return {
      promise: p,
      isSettled: () => settled,
      cancel: () => {
        settled = true;
      },
    };
  };

  const p1 = createTrackablePromise();
  const p2 = createTrackablePromise();

  const racePromise = promise_safe_race([p1.promise, p2.promise]);
  await delay(50);
  await racePromise;

  // 验证未完成的 Promise 是否取消监听
  assert.strictEqual(p1.isSettled(), false);
  assert.strictEqual(p2.isSettled(), false);
});

Deno.test("promise_safe_race 混合类型处理", async () => {
  const disposer = disposable();
  // 同步值在中间
  const result1 = await promise_safe_race([
    delay(10, {disposer}).then(
      () => "async",
      () => 0,
    ),
    "sync",
    delay(5, {disposer}).then(
      () => 1,
      () => 0,
    ),
  ]);
  assert.strictEqual(result1, "sync");

  // 拒绝在同步值之后
  await assert.rejects(
    async () => {
      await promise_safe_race([Promise.reject(new Error("error"))]);
    },
    {name: "Error", message: "error"},
  );
  disposer.dispose();
});

Deno.test("promise_safe_race 迭代器只遍历一次", async () => {
  const disposer = disposable();
  let callCount = 0;
  const iterable = {
    *[Symbol.iterator]() {
      callCount++;
      yield delay(10, {disposer}).then(
        () => 1,
        () => 0,
      );
      yield 42;
    },
  };

  const result = await promise_safe_race(iterable);
  assert.strictEqual(result, 42);
  assert.strictEqual(callCount, 1);
  disposer.dispose();
});

Deno.test("delay return", async () => {
  const target = new EventTarget();
  const message = new Event("message");
  delay(1).then(() => {
    target.dispatchEvent(message);
  });
  // target.addEventListener("abort")
  const res = await delay(timmers.eventTarget(target, "message"));
  assert.strictEqual(res, message);
});
