import {type Func, func_remember} from "./func.ts";

type BasePath = Array<string | symbol | typeof Reflect.apply | typeof Reflect.construct>;
/**
 * 对象异步代理者
 *
 * ```ts
 * const val = await async_proxyer(Promise.resolve(1)) // 1
 * ```
 * ```ts
 * const val = await async_proxyer(Promise.resolve((a,b)=>{
 *      return a+b
 * }))(1,2) // 3
 * ```
 * ```ts
 * const val = await async_proxyer(Promise.resolve({
 *     a: {
 *          b: "b"
 *     }
 * })).a.b // "b"
 * ```
 * ```ts
 * const val = await async_proxyer(Promise.resolve({
 *     a: {
 *          fn: async ()=>{ return "fn" }
 *     }
 * })).a.fn() // "fn"
 * ```
 * @param obj
 * @param ready
 * @returns
 */
export const async_proxyer = <T>(
  ready: PromiseLike<T>,
  proxyConfig: {
    type?: "object" | "class" | "function" | "arrow-function" | object | Func | (new (...args: any[]) => any);
    basePath?: BasePath;
    has?: (prop: string | symbol, basePath: BasePath) => boolean;
    getOwnPropertyDescriptor?: (prop: string | symbol, basePath: BasePath) => PropertyDescriptor | undefined;
    getPrototypeOf?: (basePath: BasePath) => object | undefined;
    isExtensible?: (basePath: BasePath) => boolean;
    ownKeys?: (basePath: BasePath) => Array<string | symbol>;
  } = {},
  thisArg?: PromiseLike<any>,
): Awaited<T> => {
  const then_fn = func_remember(() => ready.then.bind(ready));
  const async_reflect = <F extends Func<unknown, [T]>>(basePath: BasePath, fn: F, thisArg: PromiseLike<any> = ready) => {
    return async_proxyer(async_call(fn), {...proxyConfig, basePath}, thisArg);
  };
  const async_call = <F extends Func<unknown, [T]>>(fn: F) => {
    return ready.then((r) => {
      return fn(r);
    });
  };
  const basePath = proxyConfig.basePath ?? [];
  let source: any;
  switch (proxyConfig.type) {
    case "class":
      source = class {};
      break;
    case "function":
      source = function () {};
      break;
    case "arrow-function":
      source = () => {};
      break;
    case "object":
      source = {};
      break;
    default:
      source = proxyConfig.type ?? function () {};
  }
  return new Proxy(source, {
    get(_, prop) {
      if (prop === "then") {
        return then_fn();
      }
      return async_reflect([...basePath, prop], (r) => Reflect.get(r as object, prop));
    },
    set(_, prop, value) {
      void async_call((r) => Reflect.set(r as object, prop, value));
      return true;
    },
    apply(_, _thisArg, argArray) {
      return async_reflect([...basePath, Reflect.apply], async (r) => Reflect.apply(r as Func, await thisArg, argArray));
    },
    construct(_, argArray) {
      return async_reflect([...basePath, Reflect.construct], (r) => Reflect.construct(r as any, argArray, r as any));
    },
    has(_, prop) {
      if (prop === "then") {
        return true;
      }
      return proxyConfig.has?.(prop, basePath) ?? false;
    },
    defineProperty(_, prop, attributes) {
      void async_call((r) => Reflect.defineProperty(r as object, prop, attributes));
      return true;
    },
    deleteProperty(_, prop) {
      void async_call((r) => Reflect.deleteProperty(r as object, prop));
      return true;
    },
    getOwnPropertyDescriptor(_, prop) {
      if (prop === "then") {
        return {
          value: then_fn(),
          writable: true,
          enumerable: false,
          configurable: true,
        };
      }
      return proxyConfig.getOwnPropertyDescriptor?.(prop, basePath);
    },
    getPrototypeOf() {
      return proxyConfig.getPrototypeOf?.(basePath) ?? null;
    },
    isExtensible() {
      return proxyConfig.isExtensible?.(basePath) ?? Object.isExtensible(source);
    },
    ownKeys() {
      const keys = proxyConfig.ownKeys?.(basePath) ?? Reflect.ownKeys(source);
      return keys;
    },
    preventExtensions() {
      void async_call((r) => Reflect.preventExtensions(r as object));
      Object.preventExtensions(source);
      return true;
    },
    setPrototypeOf(_, proto) {
      void async_call((r) => Reflect.setPrototypeOf(r as object, proto));
      return true;
    },
  }) as Awaited<T>;
};
