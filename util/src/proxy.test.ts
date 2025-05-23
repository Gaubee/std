import assert from "node:assert";
import {delay} from "./promise.ts";
import {async_proxyer} from "./proxy.ts";

Deno.test("async_proxyer - resolves to basic type", async () => {
  const val = await async_proxyer(Promise.resolve(123));
  assert.strictEqual(val, 123);

  const val2 = await async_proxyer(delay(10).then(() => "hello"));
  assert.strictEqual(val2, "hello");
});

Deno.test("async_proxyer - resolves to function and call", async () => {
  const sum = (a: number, b: number) => a + b;
  const proxiedSum = async_proxyer(Promise.resolve(sum));
  const result = await proxiedSum(5, 3);
  assert.strictEqual(result, 8);

  const asyncSum = async (a: number, b: number) => {
    await delay(10);
    return a + b;
  };
  const proxiedAsyncSum = async_proxyer(Promise.resolve(asyncSum));
  const asyncResult = await proxiedAsyncSum(10, 5);
  assert.strictEqual(asyncResult, 15);
});

Deno.test("async_proxyer - resolves to object and access properties", async () => {
  const obj = {
    a: {
      b: "b_val",
      c: 100,
    },
    d: true,
  };
  const proxiedObj = async_proxyer(Promise.resolve(obj));
  assert.strictEqual(await proxiedObj.a.b, "b_val");
  assert.strictEqual(await proxiedObj.a.c, 100);
  assert.strictEqual(await proxiedObj.d, true);
});

Deno.test("async_proxyer - resolves to object with async function", async () => {
  const obj = {
    a: {
      fn: async () => {
        await delay(10);
        return "fn_result";
      },
    },
  };
  const proxiedObj = async_proxyer(Promise.resolve(obj));
  const result = await proxiedObj.a.fn();
  assert.strictEqual(result, "fn_result");
});

Deno.test("async_proxyer - proxyHandler 'has' hook", async () => {
  const target = {x: 1};
  const basePathLog: Array<Array<string | symbol | typeof Reflect.apply | typeof Reflect.construct>> = [];
  const proxied = async_proxyer(Promise.resolve(target), {
    has: (prop, basePath) => {
      basePathLog.push([...basePath, prop]);
      return prop in target;
    },
  });

  assert.ok("x" in proxied);
  assert.ok(!("y" in proxied));
  await delay(1); // ensure async operations complete
  // Convert Reflect.apply and Reflect.construct to string representations for comparison if needed, or ensure type matches
  // For simplicity, if direct comparison is problematic due to function references, consider logging/asserting lengths or specific known string/symbol keys.
  // Assuming direct comparison of BasePath elements is intended and works in this test environment for string/symbol.
  // If Reflect.apply/construct are actual functions, direct deepStrictEqual might be tricky.
  // Let's assume the test intends to check the sequence of properties accessed.
  // We'll keep the assertion as is, assuming the type change for basePathLog is the primary fix.
  assert.deepStrictEqual(basePathLog, [["x"], ["y"]]);
});

Deno.test("async_proxyer - proxyHandler 'getOwnPropertyDescriptor' hook", async () => {
  const target = {x: 1};
  Object.defineProperty(target, "y", {value: 2, configurable: true, enumerable: false, writable: false});
  const basePathLog: Array<Array<string | symbol | typeof Reflect.apply | typeof Reflect.construct>> = [];
  const proxied = async_proxyer(Promise.resolve(target), {
    getOwnPropertyDescriptor: (prop, basePath) => {
      basePathLog.push([...basePath, prop]);
      return Reflect.getOwnPropertyDescriptor(target, prop);
    },
  });

  const descX = Object.getOwnPropertyDescriptor(proxied, "x");
  assert.ok(descX);
  assert.strictEqual(descX.value, 1);

  const descY = Object.getOwnPropertyDescriptor(proxied, "y");
  assert.ok(descY);
  assert.strictEqual(descY.value, 2);
  assert.strictEqual(descY.enumerable, false);

  const descZ = Object.getOwnPropertyDescriptor(proxied, "z");
  assert.strictEqual(descZ, undefined);
  await delay(1);
  assert.deepStrictEqual(basePathLog, [["x"], ["y"], ["z"]]);
});

Deno.test("async_proxyer - proxyHandler 'getPrototypeOf' hook", async () => {
  class MyClass {}
  const target = new MyClass();
  let getPrototypeOfCalled = false;
  const proxied = async_proxyer(Promise.resolve(target), {
    getPrototypeOf: (basePath) => {
      getPrototypeOfCalled = true;
      assert.deepStrictEqual(basePath, []);
      const proto = Reflect.getPrototypeOf(target);
      return proto === null ? undefined : proto;
    },
  });

  assert.strictEqual(Object.getPrototypeOf(proxied), MyClass.prototype);
  await delay(1);
  assert.ok(getPrototypeOfCalled);
});

Deno.test("async_proxyer - proxyHandler 'isExtensible' hook", async () => {
  const target = {};
  let isExtensibleCalled = false;
  const proxied = async_proxyer(Promise.resolve(target), {
    isExtensible: (basePath) => {
      isExtensibleCalled = true;
      assert.deepStrictEqual(basePath, []);
      return Reflect.isExtensible(target);
    },
  });

  assert.ok(Object.isExtensible(proxied));
  await delay(1);
  assert.ok(isExtensibleCalled);

  Reflect.preventExtensions(target);
  isExtensibleCalled = false;
  const proxiedNonExt = async_proxyer(Promise.resolve(target), {
    isExtensible: (basePath) => {
      isExtensibleCalled = true;
      assert.deepStrictEqual(basePath, []);
      return Reflect.isExtensible(target);
    },
  });
  assert.ok(!Object.isExtensible(proxiedNonExt));
  await delay(1);
  assert.ok(isExtensibleCalled);
});

Deno.test("async_proxyer - proxyHandler 'ownKeys' hook", async () => {
  const target = {a: 1, b: 2};
  let ownKeysCalled = false;
  const proxied = async_proxyer(Promise.resolve(target), {
    type: "object",
    ownKeys: (basePath) => {
      ownKeysCalled = true;
      assert.deepStrictEqual(basePath, []);
      return Reflect.ownKeys(target);
    },
  });

  assert.deepStrictEqual(Reflect.ownKeys(proxied).sort(), ["a", "b"].sort());
  await delay(1);
  assert.ok(ownKeysCalled);
});

Deno.test("async_proxyer - ownKeys for function includes 'prototype'", async () => {
  const target = function() {};
  const proxied = async_proxyer(Promise.resolve(target), { type: "function" });
  const keys = Reflect.ownKeys(proxied);
  assert.ok(keys.includes("prototype"), "ownKeys for function should include 'prototype'");
});

Deno.test("async_proxyer - class constructor cannot be called without 'new'", async () => {
  class MyClass {}
  const ProxiedClass = async_proxyer(Promise.resolve(MyClass), { type: "class" });
  try {
    await (ProxiedClass as any)(); // Attempt to call as a function
    assert.fail("Class constructor should not be callable without 'new'");
  } catch (e: any) {
    assert.ok(e instanceof TypeError, "Error should be a TypeError");
    // Check for a message similar to "Class constructor MyClass cannot be invoked without 'new'"
    // Note: Exact error messages can vary between JavaScript engines.
    // We'll check for the presence of key phrases.
    assert.ok(e.message.includes("Class constructor") && e.message.includes("cannot be invoked without 'new'"), `Unexpected error message: ${e.message}`);
  }
});

Deno.test("async_proxyer - set operation", async () => {
  const target: {val?: number; nested?: {prop?: string; id?: number}} = {};
  const proxied = async_proxyer(Promise.resolve(target));

  proxied.val = 10;
  const val = await proxied.val;
  assert.strictEqual(val, 10);

  proxied.nested = {id: 777};
  proxied.nested.prop = "test";
  const prop = await proxied.nested?.prop;
  assert.strictEqual(prop, "test");

  assert.deepEqual(target, {val: 10, nested: {prop: "test", id: 777}});
});

Deno.test("async_proxyer - defineProperty operation", async () => {
  const target = {};
  const proxied = async_proxyer(Promise.resolve(target));

  await Reflect.defineProperty(proxied, "newProp", {value: "newVal", configurable: true});
  await delay(10);
  assert.strictEqual(Reflect.getOwnPropertyDescriptor(target, "newProp")?.value, "newVal");
});

Deno.test("async_proxyer - deleteProperty operation", async () => {
  const target = {delProp: 123};
  const proxied = async_proxyer(Promise.resolve(target));

  assert.ok("delProp" in target);
  await Reflect.deleteProperty(proxied, "delProp");
  await delay(10);
  assert.ok(!("delProp" in target));
});

Deno.test("async_proxyer - preventExtensions operation", async () => {
  const target = {};
  const proxied = async_proxyer(Promise.resolve(target));

  assert.ok(Reflect.isExtensible(target));
  await Reflect.preventExtensions(proxied);
  await delay(10);
  assert.ok(!Reflect.isExtensible(target));
});

Deno.test("async_proxyer - setPrototypeOf operation", async () => {
  const target = {};
  const newProto = {isProto: true};
  const proxied = async_proxyer(Promise.resolve(target));

  assert.notStrictEqual(Object.getPrototypeOf(target), newProto);
  await Reflect.setPrototypeOf(proxied, newProto);
  await delay(10);
  assert.strictEqual(Object.getPrototypeOf(target), newProto);
});

Deno.test("async_proxyer - construct operation", async () => {
  class MyClass {
    value: number;
    constructor(val: number) {
      this.value = val;
    }
  }
  const ProxiedClass = async_proxyer(Promise.resolve(MyClass));
  const instance = await new ProxiedClass(42);
  assert.ok(instance instanceof MyClass);
  assert.strictEqual(instance.value, 42);

  // Test with newTarget
  class SubClass extends MyClass {}
  const ProxiedSubClass = async_proxyer(Promise.resolve(SubClass));
  const subInstance = await new ProxiedSubClass(100);
  assert.ok(subInstance instanceof SubClass);
  assert.ok(subInstance instanceof MyClass);
  assert.strictEqual(subInstance.value, 100);
});

Deno.test("async_proxyer - type configuration 'object'", async () => {
  const proxied = async_proxyer(Promise.resolve({}), { type: "object" });
  assert.strictEqual(typeof await proxied, "object");
  // Attempting to call or construct should ideally throw or be handled gracefully
  // For now, we'll just check the type
});

Deno.test("async_proxyer - type configuration 'function'", async () => {
  const proxied = async_proxyer(Promise.resolve(() => "test"), { type: "function" });
  assert.strictEqual(typeof await proxied, "function");
  const result = await proxied();
  assert.strictEqual(result, "test");
});

Deno.test("async_proxyer - type configuration 'arrow-function'", async () => {
  const proxied = async_proxyer(Promise.resolve(() => "arrow_test"), { type: "arrow-function" });
  assert.strictEqual(typeof await proxied, "function"); // Arrow functions are still typeof 'function'
  const result = await proxied();
  assert.strictEqual(result, "arrow_test");
});

Deno.test("async_proxyer - type configuration 'class'", async () => {
  class MyTargetClass {
    value: string;
    constructor(value: string) {
      this.value = value;
    }
    greet() {
      return `Hello, ${this.value}`;
    }
  }
  const ProxiedClass = async_proxyer(Promise.resolve(MyTargetClass), { type: "class" });

  // Check typeof constructor
  assert.strictEqual(typeof ProxiedClass, "function"); // Classes are functions

  // Test construction
  const instance = await new ProxiedClass("world");
  assert.ok(instance instanceof MyTargetClass, "Instance should be of MyTargetClass type");
  assert.strictEqual(instance.value, "world");
  assert.strictEqual(await instance.greet(), "Hello, world");

  // Test accessing static-like properties (if the class had them and proxy passed them through)
  // For this test, we focus on construction and instance methods
});

Deno.test("async_proxyer - default type (should be function)", async () => {
  const proxied = async_proxyer(Promise.resolve(() => "default_test"));
  assert.strictEqual(typeof await proxied, "function");
  const result = await proxied();
  assert.strictEqual(result, "default_test");
});
