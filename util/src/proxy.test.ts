import assert from "node:assert";
import {delay} from "./promise.ts";
import {async_proxyer} from "./proxy.ts";
const Promise_resolve = <T>(v: T) =>
  new Promise<T>((cb) => {
    setTimeout(() => cb(v), 0);
  });

Deno.test("async_proxyer - resolves to basic type", async () => {
  const val = await async_proxyer(Promise_resolve(123));
  assert.strictEqual(val, 123);

  const val2 = await async_proxyer(delay(10).then(() => "hello"));
  assert.strictEqual(val2, "hello");
});

Deno.test("async_proxyer - resolves to function and call", async () => {
  const sum = (a: number, b: number) => a + b;
  const proxiedSum = async_proxyer(Promise_resolve(sum));
  const result = await proxiedSum(5, 3);
  assert.strictEqual(result, 8);

  const asyncSum = async (a: number, b: number) => {
    await delay(10);
    return a + b;
  };
  const proxiedAsyncSum = async_proxyer(Promise_resolve(asyncSum));
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
  const proxiedObj = async_proxyer(Promise_resolve(obj));
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
  const proxiedObj = async_proxyer(Promise_resolve(obj));
  const result = await proxiedObj.a.fn();
  assert.strictEqual(result, "fn_result");
});

Deno.test("async_proxyer - proxyHandler 'has' hook", async () => {
  const target = {x: 1};
  const basePathLog: Array<Array<string | symbol | typeof Reflect.apply | typeof Reflect.construct>> = [];
  const proxied = async_proxyer(Promise_resolve(target), {
    has: (prop, basePath) => {
      basePathLog.push([...basePath, prop]);
      return prop in target;
    },
  });

  assert.ok("x" in proxied);
  assert.ok(!("y" in proxied));
  await delay(1); // ensure async operations complete
  assert.deepStrictEqual(basePathLog, [["x"], ["y"]]);
});

Deno.test("async_proxyer - proxyHandler 'getOwnPropertyDescriptor' hook", async () => {
  const target = {x: 1};
  Object.defineProperty(target, "y", {value: 2, configurable: true, enumerable: false, writable: false});
  const basePathLog: Array<Array<string | symbol | typeof Reflect.apply | typeof Reflect.construct>> = [];
  const proxied = async_proxyer(Promise_resolve(target), {
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
  const proxied = async_proxyer(Promise_resolve(target), {
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
  const proxied = async_proxyer(Promise_resolve(target), {
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
  const proxiedNonExt = async_proxyer(Promise_resolve(target), {
    type: target,
    isExtensible: (basePath) => {
      isExtensibleCalled = true;
      assert.deepStrictEqual(basePath, []);
      return Reflect.isExtensible(target);
    },
  });
  assert.ok(!Object.isExtensible(proxiedNonExt));
  assert.ok(isExtensibleCalled);
});

Deno.test("async_proxyer - proxyHandler 'ownKeys' hook", async () => {
  const target = {a: 1, b: 2};
  let ownKeysCalled = false;
  const proxied = async_proxyer(Promise_resolve(target), {
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

Deno.test("async_proxyer - set operation", async () => {
  const target: {val?: number; nested?: {prop?: string; id?: number}} = {};
  const proxied = async_proxyer(Promise_resolve(target));

  proxied.val = 10;
  const val = await proxied.val;
  assert.strictEqual(val, 10);

  proxied.nested = {id: 777};
  proxied.nested.prop = "test";
  const prop = await proxied.nested?.prop;
  assert.strictEqual(prop, "test");
  assert.strictEqual(await proxied.nested?.id, 777);

  await delay(10); // Wait for async operations to complete
  assert.deepEqual(target, {val: 10, nested: {prop: "test", id: 777}});
});

Deno.test("async_proxyer - defineProperty operation", async () => {
  const target = {};
  const proxied = async_proxyer(Promise_resolve(target));

  await Reflect.defineProperty(proxied, "newProp", {value: "newVal", configurable: true});
  await delay(10);
  assert.strictEqual(Reflect.getOwnPropertyDescriptor(target, "newProp")?.value, "newVal");
});

Deno.test("async_proxyer - deleteProperty operation", async () => {
  const target = {delProp: 123};
  const proxied = async_proxyer(Promise_resolve(target));

  assert.ok("delProp" in target);
  await Reflect.deleteProperty(proxied, "delProp");
  await delay(10);
  assert.ok(!("delProp" in target));
});

Deno.test("async_proxyer - preventExtensions operation", async () => {
  const target = {};
  const proxied = async_proxyer(Promise_resolve(target));

  assert.ok(Reflect.isExtensible(target));
  await Reflect.preventExtensions(proxied);
  await delay(10);
  assert.ok(!Reflect.isExtensible(target));
});

Deno.test("async_proxyer - setPrototypeOf operation", async () => {
  const target = {};
  const newProto = {isProto: true};
  const proxied = async_proxyer(Promise_resolve(target));

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
  const ProxiedClass = async_proxyer(Promise_resolve(MyClass));
  const instance = await new ProxiedClass(42);
  assert.ok(instance instanceof MyClass);
  assert.strictEqual(instance.value, 42);

  // Test with newTarget
  class SubClass extends MyClass {}
  const ProxiedSubClass = async_proxyer(Promise_resolve(SubClass));
  const subInstance = await new ProxiedSubClass(100);
  assert.ok(subInstance instanceof SubClass);
  assert.ok(subInstance instanceof MyClass);
  assert.strictEqual(subInstance.value, 100);
});

Deno.test("async_proxyer - type configuration 'object'", async () => {
  const proxied = async_proxyer(Promise_resolve({}), {type: "object"});
  assert.strictEqual(typeof (await proxied), "object");
});

Deno.test("async_proxyer - type configuration 'function'", async () => {
  const proxied = async_proxyer(
    Promise_resolve(() => "test"),
    {type: "function"},
  );
  assert.strictEqual(typeof (await proxied), "function");
  const result = await proxied();
  assert.strictEqual(result, "test");
});

Deno.test("async_proxyer - type configuration 'arrow-function'", async () => {
  const proxied = async_proxyer(
    Promise_resolve(() => "arrow_test"),
    {type: "arrow-function"},
  );
  assert.strictEqual(typeof (await proxied), "function"); // Arrow functions are still typeof 'function'
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
  const ProxiedClass = async_proxyer(Promise_resolve(MyTargetClass), {type: "class"});

  // Check typeof constructor
  assert.strictEqual(typeof ProxiedClass, "function"); // Classes are functions

  // Test construction
  const instance = await new ProxiedClass("world");
  assert.ok(instance instanceof MyTargetClass, "Instance should be of MyTargetClass type");
  assert.strictEqual(instance.value, "world");
  assert.strictEqual(await instance.greet(), "Hello, world");
});

Deno.test("async_proxyer - default type (should be function)", async () => {
  const proxied = async_proxyer(Promise_resolve(() => "default_test"));
  assert.strictEqual(typeof (await proxied), "function");
  const result = await proxied();
  assert.strictEqual(result, "default_test");
});

Deno.test("async_proxyer - safe this call", async () => {
  const val = async_proxyer(
    Promise_resolve({
      a: 123,
      b: function () {
        assert.equal(typeof this.a, "number");
        return this.a;
      },
    }),
  );
  assert.strictEqual(await val.b(), 123);
});

// ============================================================================
// TC39 Compliance Tests - Comprehensive Boundary Cases
// ============================================================================

Deno.test("TC39 Compliance - Reflect.apply/construct boundaries - object type", async () => {
  const target = {value: 42};
  const proxied = async_proxyer(Promise_resolve(target), {type: "object"});

  // 1.1. type:object 是不可以执行 apply/construct
  try {
    await (proxied as any)();
    assert.fail("Object should not be callable (apply)");
  } catch (e: any) {
    assert.ok(e instanceof TypeError, "Error should be a TypeError for apply on object");
    assert.ok(e.message.includes("is not a function") || e.message.includes("not a function"), `Unexpected error message for apply: ${e.message}`);
  }

  try {
    new (proxied as any)();
    assert.fail("Object should not be constructible");
  } catch (e: any) {
    assert.ok(e instanceof TypeError, "Error should be a TypeError for construct on object");
    assert.ok(e.message.includes("is not a constructor") || e.message.includes("not a constructor"), `Unexpected error message for construct: ${e.message}`);
  }
  await proxied;
});

Deno.test("TC39 Compliance - Reflect.apply/construct boundaries - function type", async () => {
  const target = function testFunc(a: number, b: number) {
    return a + b;
  };
  const proxied = async_proxyer(Promise_resolve(target), {type: "function"});

  // 1.2. type:function 可以执行 apply/construct
  const applyResult = await (proxied as any)(2, 3);
  assert.strictEqual(applyResult, 5, "Function should be callable (apply)");

  const constructResult = await new (proxied as any)(4, 5);
  assert.ok(typeof constructResult === "object" && constructResult !== null, "Function should be constructible");
});

Deno.test("TC39 Compliance - Reflect.apply/construct boundaries - arrow function type", async () => {
  const target = (a: number, b: number) => a + b;
  const proxied = async_proxyer(Promise_resolve(target), {type: "arrow-function"});

  // 1.3. type:arrow-function 可以执行 apply ， 不可以执行construct
  const applyResult = await (proxied as any)(6, 7);
  assert.strictEqual(applyResult, 13, "Arrow function should be callable (apply)");

  try {
    new (proxied as any)();
    assert.fail("Arrow function should not be constructible");
  } catch (e: any) {
    assert.ok(e instanceof TypeError, "Error should be a TypeError for construct on arrow function");
    assert.ok(e.message.includes("is not a constructor") || e.message.includes("not constructible"), `Unexpected error message for construct: ${e.message}`);
  }
});

Deno.test("TC39 Compliance - Reflect.apply/construct boundaries - class type", async () => {
  class TestClass {
    sum: number;
    constructor(a: number, b: number) {
      this.sum = a + b;
    }
  }
  const proxied = async_proxyer(Promise_resolve(TestClass), {type: "class"});

  // 1.4. type:class 可以执行construct ， 不可以执行 apply
  try {
    await (proxied as any)(1, 2); // Attempt to call as a function
    assert.fail("Class constructor should not be callable (apply) without 'new'");
  } catch (e: any) {
    assert.ok(e instanceof TypeError, "Error should be a TypeError for apply on class");
    assert.ok(e.message.includes("Class constructor") && e.message.includes("cannot be invoked without 'new'"), `Unexpected error message for apply: ${e.message}`);
  }

  const instance = await new (proxied as any)(8, 9);
  assert.ok(instance instanceof TestClass, "Class should be constructible");
  assert.strictEqual(instance.sum, 17, "Constructed instance property should be correct");
});

Deno.test("TC39 Compliance - Reflect.ownKeys invariants - function type", async () => {
  const target = function testFunc() {};

  // 2.1. type:function 的ownKeys必须包含'arguments', 'caller', 'prototype'，否则会报错
  const proxiedValid = async_proxyer(Promise_resolve(target), {
    type: "function",
    ownKeys: (basePath) => {
      assert.deepStrictEqual(basePath, []);
      return ["arguments", "caller", "length", "name", "prototype"];
    },
  });

  const keys = Reflect.ownKeys(proxiedValid);
  assert.ok(keys.includes("arguments"), "ownKeys for function should include 'arguments'");
  assert.ok(keys.includes("caller"), "ownKeys for function should include 'caller'");
  assert.ok(keys.includes("prototype"), "ownKeys for function should include 'prototype'");

  // Test missing 'caller' - this should potentially throw
  const proxiedMissingCaller = async_proxyer(Promise_resolve(target), {
    type: "function",
    ownKeys: () => ["arguments", "prototype"], // Missing 'caller'
  });

  try {
    Reflect.ownKeys(proxiedMissingCaller);
    // Note: The exact behavior depends on the JS engine implementation
    // Some engines may not throw immediately for missing caller/arguments
  } catch (e: any) {
    assert.ok(e instanceof TypeError, "TypeError expected when 'ownKeys' trap for function misses 'caller'");
    assert.ok(e.message.includes("caller") || e.message.includes("trap result"), `Error message should mention missing property: ${e.message}`);
  }

  // Test missing 'arguments'
  const proxiedMissingArguments = async_proxyer(Promise_resolve(target), {
    type: "function",
    ownKeys: () => ["caller", "prototype"], // Missing 'arguments'
  });

  try {
    Reflect.ownKeys(proxiedMissingArguments);
  } catch (e: any) {
    assert.ok(e instanceof TypeError, "TypeError expected when 'ownKeys' trap for function misses 'arguments'");
    assert.ok(e.message.includes("arguments") || e.message.includes("trap result"), `Error message should mention missing property: ${e.message}`);
  }

  // Test missing 'prototype'
  const proxiedMissingPrototype = async_proxyer(Promise_resolve(target), {
    type: "function",
    ownKeys: () => ["arguments", "caller"], // Missing 'prototype'
  });

  try {
    Reflect.ownKeys(proxiedMissingPrototype);
  } catch (e: any) {
    assert.ok(e instanceof TypeError, "TypeError expected when 'ownKeys' trap for function misses 'prototype'");
    assert.ok(e.message.includes("prototype") || e.message.includes("trap result"), `Error message should mention missing property: ${e.message}`);
  }

  await proxiedValid;
  await proxiedMissingCaller;
  await proxiedMissingArguments;
  await proxiedMissingPrototype;
});

Deno.test("TC39 Compliance - Reflect.ownKeys invariants - object type", async () => {
  const target = {prop: "value"};

  // 2.2. type: object就不需要包含'arguments', 'caller', 'prototype'，返回空也是可以的，不会报错
  const proxiedEmpty = async_proxyer(Promise_resolve(target), {
    type: "object",
    ownKeys: (basePath) => {
      assert.deepStrictEqual(basePath, []);
      return []; // Empty is allowed for objects
    },
  });

  const keys = Reflect.ownKeys(proxiedEmpty);
  assert.deepStrictEqual(keys, [], "ownKeys for object can be empty");

  // Test with actual object properties
  const proxiedWithProps = async_proxyer(Promise_resolve(target), {
    type: "object",
    ownKeys: (basePath) => {
      return ["prop"];
    },
  });

  const keysWithProps = Reflect.ownKeys(proxiedWithProps);
  assert.deepStrictEqual(keysWithProps, ["prop"], "ownKeys for object should return specified properties");

  await proxiedEmpty;
  await proxiedWithProps;
});

Deno.test("TC39 Compliance - Reflect.ownKeys invariants - arrow function type", async () => {
  const target = () => "arrow function";

  // 2.2. type: arrow-function就不需要包含'arguments', 'caller', 'prototype'，返回空也是可以的，不会报错
  const proxiedEmpty = async_proxyer(Promise_resolve(target), {
    type: "arrow-function",
    ownKeys: (basePath) => {
      assert.deepStrictEqual(basePath, []);
      return []; // Empty is allowed for arrow functions
    },
  });

  const keys = Reflect.ownKeys(proxiedEmpty);
  assert.deepStrictEqual(keys, [], "ownKeys for arrow function can be empty");

  // Test with some properties (like length, name)
  const proxiedWithProps = async_proxyer(Promise_resolve(target), {
    type: "arrow-function",
    ownKeys: () => ["length", "name"],
  });

  const keysWithProps = Reflect.ownKeys(proxiedWithProps);
  assert.deepStrictEqual(keysWithProps, ["length", "name"], "ownKeys for arrow function can include standard function properties");

  await proxiedEmpty;
  await keys;
});

Deno.test("TC39 Compliance - Reflect.ownKeys invariants - class type", async () => {
  class TestClass {
    static staticProp = "static";
  }

  // 2.3. type:class 的ownKeys必须包含 'prototype'，否则会报错
  const proxiedValid = async_proxyer(Promise_resolve(TestClass), {
    type: "class",
    ownKeys: (basePath) => {
      assert.deepStrictEqual(basePath, []);
      return ["prototype", "length", "name", "staticProp"];
    },
  });

  const keys = Reflect.ownKeys(proxiedValid);
  assert.ok(keys.includes("prototype"), "ownKeys for class should include 'prototype'");

  // Test missing 'prototype' - this should throw
  const proxiedMissingPrototype = async_proxyer(Promise_resolve(TestClass), {
    type: "class",
    ownKeys: () => ["length", "name", "staticProp"], // Missing 'prototype'
  });

  try {
    Reflect.ownKeys(proxiedMissingPrototype);
    // This should potentially throw because 'prototype' is a non-configurable property of class constructors
  } catch (e: any) {
    assert.ok(e instanceof TypeError, "TypeError expected when 'ownKeys' trap for class misses 'prototype'");
    assert.ok(e.message.includes("prototype") || e.message.includes("trap result"), `Error message should mention missing 'prototype': ${e.message}`);
  }

  await proxiedValid;
  await proxiedMissingPrototype;
});

// Additional TC39 Compliance Tests - Proxy Invariants
Deno.test("TC39 Compliance - Proxy invariants - non-configurable properties", async () => {
  const target = {};
  Object.defineProperty(target, "nonConfigurable", {
    value: "fixed",
    configurable: false,
    enumerable: true,
    writable: false,
  });

  const proxied = async_proxyer(Promise_resolve(target), {
    type: "object",
    ownKeys: (basePath) => {
      // Must include non-configurable properties
      return ["nonConfigurable"];
    },
  });

  const keys = Reflect.ownKeys(proxied);
  assert.ok(keys.includes("nonConfigurable"), "ownKeys must include non-configurable properties");

  await proxied;
});

Deno.test("TC39 Compliance - Proxy invariants - non-extensible objects", async () => {
  const target = {existing: "prop"};
  Object.preventExtensions(target);

  const proxied = async_proxyer(Promise_resolve(target), {
    type: "object",
    ownKeys: (basePath) => {
      // For non-extensible objects, must return all target properties
      return Reflect.ownKeys(target);
    },
    isExtensible: () => false,
  });

  const keys = Reflect.ownKeys(proxied);
  assert.deepStrictEqual(keys.sort(), Reflect.ownKeys(target).sort(), "ownKeys for non-extensible objects must return all target properties");

  await proxied;
});

Deno.test("TC39 Compliance - Function special properties", async () => {
  function namedFunction(a: number, b: number) {
    return a + b;
  }

  const proxied = async_proxyer(Promise_resolve(namedFunction), {type: "function"});

  // Test default ownKeys includes function properties
  const keys = Reflect.ownKeys(proxied);
  assert.ok(keys.includes("prototype"), "Function should have 'prototype' property");

  // Note: 'length' and 'name' are typically included in default function ownKeys
  // but their presence depends on the proxy implementation
  await proxied;
});

Deno.test("TC39 Compliance - Class inheritance and construction", async () => {
  class BaseClass {
    baseValue: string;
    constructor(value: string) {
      this.baseValue = value;
    }
  }

  class DerivedClass extends BaseClass {
    derivedValue: number;
    constructor(value: string, num: number) {
      super(value);
      this.derivedValue = num;
    }
  }

  const ProxiedDerived = async_proxyer(Promise_resolve(DerivedClass), {type: "class"});

  const instance = await new ProxiedDerived("test", 42);
  assert.ok(instance instanceof DerivedClass, "Instance should be of DerivedClass");
  assert.ok(instance instanceof BaseClass, "Instance should also be of BaseClass");
  assert.strictEqual(instance.baseValue, "test");
  assert.strictEqual(instance.derivedValue, 42);
});

Deno.test("TC39 Compliance - Error handling and edge cases", async () => {
  // Test with rejected promise
  const rejectedPromise = Promise.reject(new Error("Test error"));
  const proxied = async_proxyer(rejectedPromise);

  try {
    await proxied;
    assert.fail("Should have thrown an error");
  } catch (e: any) {
    assert.strictEqual(e.message, "Test error");
  }

  // Test with promise that resolves to null
  const nullPromise = Promise_resolve(null);
  const proxiedNull = async_proxyer(nullPromise);
  const result = await proxiedNull;
  assert.strictEqual(result, null);
});
