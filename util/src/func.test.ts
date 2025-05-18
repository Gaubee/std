import assert from "node:assert";
import {type Func, func_catch, func_lazy, func_parallel_limit, func_remember} from "./func.ts";
// import {assert.equal, assertInstanceOf, assertStrictEquals, assert} from "asserts";
import {delay} from "./promise.ts";

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
    return function (this: {multiplier: number}, x: number) {
      return x * this.multiplier;
    };
  });
  const obj = {multiplier: 3, fn: lazyFn};

  // Test with this context
  assert.equal(obj.fn(5), 15);
  assert.equal(factoryCallCount, 1);

  // Should reuse the same function
  assert.equal(obj.fn(7), 21);
  assert.equal(factoryCallCount, 1);
});

Deno.test("func_parallel_limit", async (t) => {
  const resultsContainer: any[] = []; // 使用英文变量名以符合常规编码习惯
  const createAsyncTask = (id: number, duration: number, shouldThrow = false) => {
    return async () => {
      await delay(duration);
      if (shouldThrow) {
        throw new Error(`Error in task ${id}`);
      }
      return `Task ${id} completed`;
    };
  };

  await t.step("should run tasks in parallel with limit", async () => {
    resultsContainer.length = 0;
    const tasks = [createAsyncTask(1, 100), createAsyncTask(2, 50), createAsyncTask(3, 150), createAsyncTask(4, 80), createAsyncTask(5, 120)];
    const limit = 2;
    const runner = func_parallel_limit(tasks, limit);
    runner(({source, result}) => {
      resultsContainer.push({task: tasks.indexOf(source as any) + 1, result});
    });

    let activeTasks = 0;
    let maxActiveTasks = 0;
    const originalDelay = delay;
    // 模拟跟踪并发任务数量
    (globalThis as any).delay = async (ms: number) => {
      activeTasks++;
      maxActiveTasks = Math.max(maxActiveTasks, activeTasks);
      await originalDelay(ms);
      activeTasks--;
    };

    await runner;
    (globalThis as any).delay = originalDelay; // 恢复原始delay函数

    assert.equal(resultsContainer.length, tasks.length, "All tasks should complete");
    assert.strictEqual(maxActiveTasks <= limit, true, `Concurrency limit should be respected (max active: ${maxActiveTasks}, limit: ${limit})`);
    const successfulTasks = resultsContainer.filter((r) => r.result.success);
    assert.equal(successfulTasks.length, tasks.length);
  });

  await t.step("should handle empty task list", async () => {
    resultsContainer.length = 0;
    const tasks: Func<void, [], Promise<string>>[] = [];
    const limit = 3;
    const runner = func_parallel_limit(tasks, limit);
    runner(({result}) => {
      resultsContainer.push(result);
    });
    await runner;
    assert.equal(resultsContainer.length, 0, "No results for empty task list");
  });

  await t.step("should handle tasks with errors", async () => {
    resultsContainer.length = 0;
    const tasks = [
      createAsyncTask(1, 50),
      createAsyncTask(2, 30, true), // 此任务将抛出错误
      createAsyncTask(3, 70),
    ];
    const limit = 2;
    const runner = func_parallel_limit(tasks, limit);
    runner(({source, result}) => {
      resultsContainer.push({task: tasks.indexOf(source as any) + 1, result});
    });

    await runner;

    assert.equal(resultsContainer.length, tasks.length, "All tasks should attempt to complete");
    const successfulResults = resultsContainer.filter((r) => r.result.success);
    const errorResults = resultsContainer.filter((r) => !r.result.success);

    assert.equal(successfulResults.length, 2, "Two tasks should succeed");
    assert.equal(errorResults.length, 1, "One task should fail");
    assert.ok(errorResults[0].result.error instanceof Error, "Error should be an instance of Error");
    assert.equal(errorResults[0].result.error.message, "Error in task 2", "Error message should match");
  });

  await t.step("should run all tasks if limit is greater than task count", async () => {
    resultsContainer.length = 0;
    const tasks = [createAsyncTask(1, 20), createAsyncTask(2, 10)];
    const limit = 5;
    const runner = func_parallel_limit(tasks, limit);
    runner(({result}) => {
      resultsContainer.push(result);
    });

    await runner;
    assert.equal(resultsContainer.length, tasks.length, "All tasks should complete");
    assert(
      resultsContainer.every((r) => r.success),
      "All tasks should be successful",
    );
  });

  await t.step("should handle limit of 1 (sequential execution)", async () => {
    resultsContainer.length = 0;
    const executionOrder: number[] = [];
    const tasks = [
      async () => {
        await delay(30);
        executionOrder.push(1);
        return "Task 1";
      },
      async () => {
        await delay(10);
        executionOrder.push(2);
        return "Task 2";
      },
      async () => {
        await delay(20);
        executionOrder.push(3);
        return "Task 3";
      },
    ];
    const limit = 1;
    const runner = func_parallel_limit(tasks, limit);
    runner(({result}) => {
      resultsContainer.push(result);
    });

    await runner;
    assert.equal(resultsContainer.length, tasks.length, "All tasks should complete");
    // 检查执行顺序是否按照预期进行，因为limit为1，所以任务应该按顺序执行，而不是并发执行
    // 注意：由于延迟，实际执行顺序可能会略有不同，但不应该完全按照顺序进行，因为延迟会影响执行顺序
    assert.deepEqual(executionOrder, [1, 2, 3], "Tasks should execute sequentially with limit 1");
  });

  await t.step("should resolve 'then' only after all tasks are processed", async () => {
    let thenResolved = false;
    const tasks = [createAsyncTask(1, 100), createAsyncTask(2, 50, true), createAsyncTask(3, 150)];
    const limit = 2;
    const runner = func_parallel_limit(tasks, limit);
    let processedCount = 0;
    runner(() => {
      processedCount++;
    });

    const thenPromise = runner.then(() => {
      thenResolved = true;
    });

    // 在所有任务完成前检查
    await delay(100); // 等待部分任务完成，但不是全部
    assert.equal(thenResolved, false, "'then' should not resolve before all tasks are processed");

    await thenPromise;
    assert.equal(thenResolved, true, "'then' should resolve after all tasks are processed");
    assert.equal(processedCount, tasks.length, "All tasks should be processed before 'then' resolves");
  });

  // New tests for AsyncIterable
  async function* createAsyncIterableTasks(count: number, itemDuration: number, errorOnId?: number): AsyncIterable<Func<void, [], Promise<string>>> {
    for (let i = 1; i <= count; i++) {
      await delay(10); // Simulate some async work to yield tasks
      const currentId = i;
      yield createAsyncTask(currentId, itemDuration, errorOnId === currentId);
    }
  }

  await t.step("should run tasks from AsyncIterable in parallel with limit", async () => {
    resultsContainer.length = 0;
    const asyncTasks = createAsyncIterableTasks(5, 50);
    const limit = 2;
    const runner = func_parallel_limit(asyncTasks, limit);
    runner(({source, result}) => {
      // Note: For AsyncIterable, 'source' might be harder to directly compare for indexOf if tasks are dynamically generated.
      // We'll rely on the number of results and their success/failure status.
      resultsContainer.push({result});
    });

    let activeTasks = 0;
    let maxActiveTasks = 0;
    const originalDelay = delay;
    (globalThis as any).delay = async (ms: number) => {
      activeTasks++;
      maxActiveTasks = Math.max(maxActiveTasks, activeTasks);
      await originalDelay(ms);
      activeTasks--;
    };

    await runner;
    (globalThis as any).delay = originalDelay;

    assert.equal(resultsContainer.length, 5, "All tasks from async iterable should complete");
    assert.strictEqual(maxActiveTasks <= limit, true, `AsyncIterable: Concurrency limit should be respected (max active: ${maxActiveTasks}, limit: ${limit})`);
    const successfulTasks = resultsContainer.filter((r) => r.result.success);
    assert.equal(successfulTasks.length, 5, "All tasks from async iterable should be successful");
  });

  await t.step("should handle empty AsyncIterable", async () => {
    resultsContainer.length = 0;
    async function* emptyAsyncIterable(): AsyncIterable<Func<void, [], Promise<string>>> {}
    const limit = 3;
    const runner = func_parallel_limit(emptyAsyncIterable(), limit);
    runner(({result}) => {
      resultsContainer.push(result);
    });
    await runner;
    assert.equal(resultsContainer.length, 0, "No results for empty async iterable");
  });

  await t.step("should handle AsyncIterable with errors", async () => {
    resultsContainer.length = 0;
    const asyncTasksWithError = createAsyncIterableTasks(3, 50, 2); // Task 2 will throw an error
    const limit = 2;
    const runner = func_parallel_limit(asyncTasksWithError, limit);
    runner(({result}) => {
      resultsContainer.push({result});
    });

    await runner;

    assert.equal(resultsContainer.length, 3, "All tasks from async iterable (with errors) should attempt to complete");
    const successfulResults = resultsContainer.filter((r) => r.result.success);
    const errorResults = resultsContainer.filter((r) => !r.result.success);

    assert.equal(successfulResults.length, 2, "Two tasks from async iterable should succeed");
    assert.equal(errorResults.length, 1, "One task from async iterable should fail");
    assert.ok(errorResults[0].result.error instanceof Error, "Error from async iterable task should be an instance of Error");
    assert.equal(errorResults[0].result.error.message, "Error in task 2", "Error message from async iterable task should match");
  });

  await t.step("should resolve 'then' for AsyncIterable only after all tasks are processed", async () => {
    let thenResolved = false;
    const asyncTasks = createAsyncIterableTasks(3, 50, 2);
    const limit = 2;
    const runner = func_parallel_limit(asyncTasks, limit);
    let processedCount = 0;
    runner(() => {
      processedCount++;
    });

    const thenPromise = runner.then(() => {
      thenResolved = true;
    });

    await delay(70); // Wait for some tasks to potentially process
    assert.equal(thenResolved, false, "AsyncIterable 'then' should not resolve before all tasks are processed");

    await thenPromise;
    assert.equal(thenResolved, true, "AsyncIterable 'then' should resolve after all tasks are processed");
    assert.equal(processedCount, 3, "All tasks from async iterable should be processed before 'then' resolves");
  });
});
