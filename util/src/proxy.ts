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
): Awaited<T> => {
  const then_fn = func_remember(() => ready.then.bind(ready));
  type RemoveFirstArgs<T> = T extends (first: any, ...args: infer A) => any ? A : never;
  const async_reflect = <F extends Func>(basePath: BasePath, fn: F, ...args: RemoveFirstArgs<F>) => {
    return async_proxyer(async_call(fn, args), {...proxyConfig, basePath});
  };
  const async_call = <F extends Func>(fn: F, args: RemoveFirstArgs<F>) => {
    return ready.then((r) => fn(r, ...args));
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
      return async_reflect([...basePath, prop], Reflect.get, prop);
    },
    set(_, prop, value) {
      void async_call(Reflect.set, [prop, value]);
      return true;
    },
    apply(_, thisArg, argArray) {
      return async_reflect([...basePath, Reflect.apply], Reflect.apply, thisArg, argArray);
    },
    construct(_, argArray) {
      return async_reflect([...basePath, Reflect.construct], (r) => Reflect.construct(r as any, argArray, r));
    },
    has(_, prop) {
      if (prop === "then") {
        return true;
      }
      return proxyConfig.has?.(prop, basePath) ?? false;
    },
    defineProperty(_, prop, attributes) {
      void async_call(Reflect.defineProperty, [prop, attributes]);
      return true;
    },
    deleteProperty(_, prop) {
      void async_call(Reflect.deleteProperty, [prop]);
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
      void async_call(Reflect.preventExtensions, []);
      Object.preventExtensions(source);
      return true;
    },
    setPrototypeOf(_, proto) {
      void async_call(Reflect.setPrototypeOf, [proto]);
      return true;
    },
  }) as Awaited<T>;
};
