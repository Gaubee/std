import {obj_assign_props} from "./object.ts";
import {isPromiseLike} from "./promise-helper.ts";
import {pureEvent, PureEventWithApply} from "./pure_event.ts";

/**
 * 函数转化，一个新函数：它的第一个参数 将作为 原函数的 this
 */
export const uncurryThisFn = <T, ARGS extends readonly unknown[], R>(func: (this: T, ...args: ARGS) => R): ((self: T, ...restArgs: ARGS) => R) => {
  // deno-lint-ignore no-explicit-any
  return func.call.bind(func as any) as any;
};
export type UncurryThisFn<T> = T extends Func ? ReturnType<typeof uncurryThisFn<Func.This<T>, Func.Args<T>, Func.Return<T>>> : never;
/**
 * 函数转化，一个新函数，它的this 是原函数的第一个参数
 */
export const curryThisFn = <T, ARGS extends readonly unknown[], R>(func: (self: T, ...args: ARGS) => R): ((this: T, ...args: ARGS) => R) => {
  return function (this: T, ...args: ARGS): R {
    return func(this, ...args);
  };
};
export type CurryThisFn<T> = T extends Func ? ReturnType<typeof curryThisFn<Func.This<T>, Func.Args<T>, Func.Return<T>>> : never;

/**
 * 类型安全的函数定义
 */
export type Func<This = any, Arguments extends readonly unknown[] = any[], Return extends unknown = any> = Arguments["length"] extends 0
  ? (this: This) => Return
  : (this: This, ...args: Arguments) => Return;
export namespace Func {
  export type Return<F> = F extends Func ? ReturnType<F> : never;
  export type AwaitedResult<F> =
    | {
        type: "resolved";
        result: Awaited<Return<F>>;
      }
    | {
        type: "rejected";
        error: unknown;
      };
  export type Args<F> = F extends Func ? Parameters<F> : never;
  export type This<F> = F extends Func<infer T> ? T : never;
  export type SetReturn<T, R> = Func<This<T>, Args<T>, R>;
}
type KeyFun<F extends Func> = Func<ThisParameterType<F>, Parameters<F>>;
export type FuncRemember<F extends Func, K extends KeyFun<F> | void = void> = F & {
  readonly source: F;
  readonly key: Func.Return<K> | undefined;
  readonly runned: boolean;
  readonly returnValue: Func.Return<F> | undefined;
  readonly awaitedReturnValue: Func.AwaitedResult<F> | undefined;
  reset(): void;
  rerun(...args: Parameters<F>): Func.Return<F>;
};
export namespace func_remember {
  export type Return<F extends Func, K extends KeyFun<F> | void = void> = FuncRemember<F, K>;
}
/**
 * 让一个函数的返回结果是缓存的
 * @param key 自定义缓存key生成器，如果生成的key不一样，那么缓存失效
 * @returns
 */
/*@__NO_SIDE_EFFECTS__*/
export const func_remember = <F extends Func, K extends Func<ThisParameterType<F>, Parameters<F>> | void | void>(func: F, key?: K, cacheAwaited?: boolean): FuncRemember<F, K> => {
  let result:
    | {
        key: Func.Return<K>;
        res: Func.Return<F>;
        awaitedRes: Func.AwaitedResult<F> | undefined;
      }
    | undefined;

  const once_fn = function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    const newKey = key?.apply(this, args);
    if (result === undefined || newKey !== result.key) {
      const res = func.apply(this, args);

      result = {
        key: newKey,
        res: res,
        awaitedRes: undefined,
      };
      if (cacheAwaited) {
        if (typeof res === "object" && res && "then" in res && typeof res.then === "function") {
          res.then(
            (r: any) => {
              if (result && res === result.res) {
                result.awaitedRes = {type: "resolved", result: r};
              }
            },
            (e: any) => {
              if (result && res === result.res) {
                result.awaitedRes = {type: "rejected", error: e};
              }
            },
          );
        } else {
          result.awaitedRes = res;
        }
      }
    }
    return result.res;
  };

  const once_fn_mix = obj_assign_props(once_fn as F, {
    get source() {
      return func;
    },
    get key() {
      return result?.key;
    },
    get runned() {
      return result != null;
    },
    get returnValue() {
      return result?.res;
    },
    get awaitedReturnValue() {
      return result?.awaitedRes;
    },
    reset() {
      result = undefined;
    },
    rerun(...args: Parameters<F>) {
      once_fn_mix.reset();
      return once_fn_mix(...args) as Func.Return<F>;
    },
  });

  return once_fn_mix;
};

/**
 * 包裹一个“目标函数”，将它的执行权交给“包裹函数”。
 * 包裹函数可以在目标函数执行之前或者执行之后做一些工作，比如参数检查，比如返回值修改
 * @param func 目标函数
 * @param wrapper 包裹函数，第一个参数是 context，可以获得详细的上下文；第二个参数是 next，可以用于快速执行“目标函数”
 */
/*@__NO_SIDE_EFFECTS__*/
export const func_wrap = <F extends Func, R>(
  func: F,
  wrapper: (
    context: {
      target: F;
      this: ThisParameterType<F>;
      arguments: Parameters<F>;
    },
    next: () => ReturnType<F>,
  ) => R,
): ((this: ThisParameterType<F>, ...args: Parameters<F>) => R) => {
  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    const context = {
      target: func,
      this: this,
      arguments: args,
    };
    return wrapper(context, () => Reflect.apply(func, context.this, context.arguments));
  };
};

type PrototypeToThis<T> = T extends String ? string : T extends Number ? number : T extends Boolean ? boolean : T extends BigInt ? bigint : T extends Symbol ? symbol : T;
/**
 * 向某一个对象配置函数属性
 */
export const extendsMethod = <T extends object>(target: T, prop: PropertyKey, method: Func<PrototypeToThis<T>>): void => {
  Object.defineProperty(target, prop, {
    configurable: true,
    writable: true,
    value: method,
  });
};

/**
 * 向某一个对象配置getter属性
 */
/*@__NO_SIDE_EFFECTS__*/
export const extendsGetter = <T extends object>(target: T, prop: PropertyKey, getter: Func<PrototypeToThis<T>, []>): void => {
  Object.defineProperty(target, prop, {
    configurable: true,
    get: getter,
  });
};

export interface FuncCatch {
  <E = unknown, F extends Func = Func>(fn: F, errorParser?: (err: unknown) => E): FuncCatch.Wrapper<E, F>;
  wrapSuccess: <R>(resule: R) => FuncCatch.SuccessReturn<R>;
  wrapError: <E>(err: E, errorParser?: (err: unknown) => E) => FuncCatch.ErrorReturn<E>;
}
export namespace FuncCatch {
  export type Wrapper<E, F extends Func> = Func<ThisParameterType<F>, Parameters<F>, Return<E, ReturnType<F>>> & {
    catchType<E>(errorParser?: (err: unknown) => E): Wrapper<E, F>;
  };
  export type SuccessReturn<R> = readonly [undefined, R] & {
    readonly success: true;
    readonly result: R;
    readonly error: void;
  };
  export type ErrorReturn<E> = readonly [E, undefined] & {
    readonly success: false;
    readonly result: void;
    readonly error: E;
  };
  export type Return<E, R> = [R] extends [never]
    ? ErrorReturn<E>
    : R extends PromiseLike<infer T>
      ? PromiseLike<SuccessReturn<T> | ErrorReturn<E>>
      : SuccessReturn<R> | ErrorReturn<E>;
}

const wrapSuccess = <R>(result: R): FuncCatch.SuccessReturn<R> => {
  return Object.defineProperties(
    [undefined, result] as const,
    {
      success: {value: true, writable: false, enumerable: false, configurable: true},
      result: {value: result, writable: false, enumerable: false, configurable: true},
      error: {value: undefined, writable: false, enumerable: false, configurable: true},
    } as const,
  ) as FuncCatch.SuccessReturn<R>;
};
const wrapError = <E>(err: E, errorParser?: (err: unknown) => E): FuncCatch.ErrorReturn<E> => {
  const error = errorParser ? errorParser(err) : (err as E);
  return Object.defineProperties(
    [error, undefined] as const,
    {
      success: {value: false, writable: false, enumerable: false, configurable: true},
      result: {value: undefined, writable: false, enumerable: false, configurable: true},
      error: {value: error, writable: false, enumerable: false, configurable: true},
    } as const,
  ) as FuncCatch.ErrorReturn<E>;
};
/**
 * 包裹一个函数，并对其进行错误捕捉并返回
 */
export const func_catch: FuncCatch = /*@__PURE__*/ Object.assign(
  <E = unknown, F extends Func = Func>(fn: F, errorParser?: (err: unknown) => E) => {
    return Object.assign(
      function (this: ThisParameterType<F>) {
        try {
          const res: ReturnType<F> = fn.apply(this, arguments as any);
          if (isPromiseLike(res)) {
            return res.then(
              (value: unknown) => wrapSuccess(value),
              (err: unknown) => wrapError(err, errorParser),
            );
          }
          return wrapSuccess(res);
        } catch (err) {
          return wrapError(err, errorParser);
        }
      },
      {
        catchType<E>(errorParser?: (err: unknown) => E) {
          return func_catch(fn, errorParser);
        },
      },
    );
  },
  {
    wrapSuccess,
    wrapError,
  },
);

/**
 * 一个能延迟执行的函数包裹
 * 和 func_remember 不同，`func_lazy(...args)` 等同于 `func_remember()(...args)`
 * @param factory
 * @returns
 */
/*@__NO_SIDE_EFFECTS__*/
export const func_lazy = <T extends Func>(factory: Func.SetReturn<T, T>): T => {
  let fn: T | undefined;
  return new Proxy(factory as unknown as T, {
    apply(_, thisArg, argArray) {
      if (fn == undefined) {
        fn = Reflect.apply(factory, thisArg, argArray);
      }
      return Reflect.apply(fn!, thisArg, argArray);
    },
  });
};

const effect_symbol = Symbol.for("effect");
type WithEffect<T = unknown> = {[effect_symbol]: Func<void, [T]>};
/**
 * 让一个对象附带副作用
 * @param source
 * @param effect
 * @returns
 */
export const withEffect = <T extends object>(source: T, effect: Func<void, [T]>): T & WithEffect<T> => {
  return obj_assign_props(source, {[effect_symbol]: effect});
};
/**
 * 执行副作用
 * @param sources
 */
export const applyEffect = (...sources: (WithEffect | object)[]): void => {
  for (const source of sources) {
    if (effect_symbol in source) {
      const effect = source[effect_symbol];
      if (typeof effect === "function") {
        effect.call(void 0, source);
      }
    }
  }
};

/**
 * 并行执行一组函数，并限制并发数量。
 *
 * @template T - 函数的类型，这些函数不接受参数
 * @param {Iterable<T>} funcs - 一个可迭代的函数集合，这些函数将被并行执行。
 * @param {number} limit - 并发执行函数的最大数量。
 * @returns {{ emit: (data: { source: T; result: FuncCatch.Return<unknown, Func.Return<T>> }) => void, on: (cb: (data: { source: T; result: FuncCatch.Return<unknown, Func.Return<T>> }) => void) => () => void, off: (cb: (data: { source: T; result: FuncCatch.Return<unknown, Func.Return<T>> }) => void) => void, once: (cb: (data: { source: T; result: FuncCatch.Return<unknown, Func.Return<T>> }) => void) => () => void, then: Promise<void>['then'] }} 返回一个对象，包含一个事件发射器 `returns` 用于监听每个函数完成时的结果，以及一个 `then` 方法，该方法在所有函数都执行完毕后 resolve。
 * 每个函数的结果会通过 `returns` 事件的 `emit` 方法发出，数据格式为 `{ source: T; result: FuncCatch.Return<unknown, Func.Return<T>> }`。
 * `result` 是一个元组，成功时为 `[undefined, R]`，失败时为 `[E, undefined]`，并附带 `success`、`result` 和 `error` 属性。
 */
export const func_parallel_limit = <T extends Func<void>>(
  funcs: Iterable<T> | AsyncIterable<T>,
  limit: number,
): PureEventWithApply<{
  source: T;
  result: FuncCatch.Return<unknown, Func.Return<T>>;
}> &
  PromiseLike<void[]> => {
  const returns = pureEvent<{source: T; result: FuncCatch.Return<unknown, Func.Return<T>>}>();
  const func_iter = Symbol.asyncIterator in funcs ? funcs[Symbol.asyncIterator]() : funcs[Symbol.iterator]();
  const done = Promise.withResolvers<void[]>();
  let canLoop = true;
  const jobs = Array(limit)
    .fill(0)
    .map(async () => {
      while (canLoop) {
        const next = await func_iter.next();
        if (next.done) {
          canLoop = false;
          return;
        }
        const func = next.value;
        //@ts-ignore
        const result = (await func_catch(func)()) as FuncCatch.Return<unknown, Func.Return<T>>;
        void returns.emit({source: func, result});
      }
    });
  done.resolve(Promise.all(jobs));

  return obj_assign_props(returns, {then: done.promise.then.bind(done.promise)});
};

// const createTask = (ms: number, log: string) => {
//   return Object.assign(
//     async () => {
//       console.log(log, "start");
//       await delay(ms);
//       console.log(log, "done");
//     },
//     {
//       id: log,
//     },
//   );
// };
// await func_parallel_limit(
//   [
//     //
//     createTask(1000, "task1"),
//     createTask(1000, "task2"),
//     createTask(1000, "task3"),
//     createTask(1000, "task4"),
//     createTask(1000, "task5"),
//     createTask(1000, "task6"),
//   ],
//   2,
// );
// console.log("all done");
