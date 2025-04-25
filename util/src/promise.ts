import { event_target_on } from "./event_target.ts";
import { type Func, func_wrap } from "./func.ts";
import type { IterableItem } from "./iterable.ts";
import { map_get_or_put } from "./map.ts";
import { isPromiseLike, type PromiseMaybe } from "./promise-helper.ts";
import type { PureEvent } from "./pure_event.ts";
export * from "./promise-helper.ts";

export type Timmer<T = unknown> = (cb: Func<unknown, [T]>) => Timmer.Clear;
export namespace Timmer {
    export type Clear = () => void;

    export type From<T extends number | Timmer<any>> = T extends number ? Timmer<void> : T;
    export type Type<T> = T extends Timmer<infer R> ? Timmer<R> : never;
    export type FromType<T extends number | Timmer<any>> = T extends number ? void
        : T extends Timmer<infer R> ? R
        : never;

    export interface EventEmiter {
        <EE extends import("node:events").EventEmitter, N extends Timmer.EventEmiter.GetEventName<EE>>(
            emitter: EE,
            name: N,
            filter?: (...args: Timmer.EventEmiter.GetEventType<EE, N>) => boolean | void,
        ): Timmer<Timmer.EventEmiter.GetEventType<EE, N>>;
        <Args extends unknown[]>(
            emitter: import("node:events").EventEmitter,
            name: string,
            filter?: (...args: Args) => boolean | void,
        ): Timmer<Args>;
    }
    export namespace EventEmiter {
        export type GetEventMap<EE> = EE extends
            import("node:events").EventEmitter<infer E extends Record<keyof E, any[]>> ? E : Record<string, any[]>;
        export type GetEventName<EE> = keyof GetEventMap<EE>;
        export type GetEventType<EE, N> = N extends keyof GetEventMap<EE>
            ? GetEventMap<EE>[N] extends unknown[] ? GetEventMap<EE>[N] : unknown[]
            : unknown[];
    }
}

export const timmers = {
    timeout: (ms: number): Timmer<void> => {
        return ((cb: Func) => {
            const ti = setTimeout(cb, ms);
            return () => clearTimeout(ti);
        });
    },
    raf: ((cb: Func) => {
        const ti = requestAnimationFrame(cb);
        return () => cancelAnimationFrame(ti);
    }) as Timmer<number>,
    microtask: ((cb: Func) => {
        let cancel = false;
        queueMicrotask(() => {
            if (cancel) {
                return;
            }
            cb();
        });
        return () => {
            cancel = true;
        };
    }) as Timmer<void>,
    eventTarget: <T extends Event>(
        target: Pick<EventTarget, "addEventListener" | "removeEventListener">,
        eventType: string,
        filter?: (event: T) => boolean | void,
    ): Timmer<T> => {
        return ((resolve) => {
            let cb: (evt: T) => void;
            if (typeof filter === "function") {
                cb = (event) => {
                    if (filter(event)) {
                        resolve(event);
                        target.removeEventListener(eventType, cb as EventListener);
                    }
                };
                target.addEventListener(eventType, cb as EventListener);
            } else {
                cb = resolve;
                target.addEventListener(eventType, cb as EventListener, { once: true });
            }
            return () => target.removeEventListener(eventType, cb as EventListener);
        });
    },
    eventEmitter: ((
        emitter: import("node:events").EventEmitter,
        name: string,
        filter?: (...args: unknown[]) => boolean | void,
    ) => {
        return ((resolve) => {
            let cb: (args: unknown[]) => void;
            if (typeof filter === "function") {
                cb = (...args) => {
                    if (filter(...args)) {
                        resolve(args);
                        emitter.off(name, cb);
                    }
                };
                emitter.on(name, cb);
            } else {
                emitter.once(name as string, cb = (...args) => resolve(args));
            }
            return () => emitter.off(name, cb);
        }) as Timmer<unknown[]>;
    }) as Timmer.EventEmiter,
    from: <T extends number | Timmer<any>>(ms: T): Timmer.From<T> => {
        return (typeof ms === "number" ? (ms <= 0 ? timmers.microtask : timmers.timeout(ms)) : ms) as Timmer.From<T>;
    },
};
/**
 * setTimeout/clearTimeout 的 promise 版本
 * @example
 * ```ts
 * const d = delay(1000)
 *
 * await d; // is promise
 *
 * d.cancel(); // clearTimeout
 *
 * d.cancel('some reason'); // clearTimeout and reject promise
 *
 * const ac = new AbortController()
 * const d = delay(1000, { signal: ac.signal }) // with AbortSignal
 * ac.abort('some reason'); // clearTimeout and reject promise
 * ```
 *
 * 如果 ms = 0，那么会使用 queueMicrotask 而不是setTimeot，当然cancel仍然是可以工作的
 */
export const delay = <T extends number | Timmer<any>>(
    ms: T,
    options?: { signal?: AbortSignal | null; disposer?: PureEvent<void> },
): delay.Delayer<Timmer.FromType<T>> => {
    const signal = options?.signal;
    signal?.throwIfAborted();

    const job = Promise.withResolvers<Timmer.FromType<T>>();
    let resolve = job.resolve;
    let reject = job.reject;
    const timmer = timmers.from(ms);
    const clear = timmer(resolve);
    const result = Object.assign(job.promise, {
        cancel(cause?: unknown) {
            clear();

            reject(cause);
        },
    });
    if (signal != null) {
        const off = event_target_on(signal, "abort", () => {
            result.cancel(signal.reason);
        }, { once: true });
        // 不使用 promise.finally ，因为它会创建一个新的 promise
        resolve = func_wrap(resolve, (_, next) => {
            off();
            next();
        });
        reject = func_wrap(reject, (_, next) => {
            off();
            next();
        });
    }
    const disposer = options?.disposer;
    if (disposer != null) {
        disposer.watch(result.cancel);
    }
    return result;
};

export namespace delay {
    export type Delayer<T = void> = Promise<T> & {
        cancel(cause?: unknown): void;
    };
}

export const promise_try = async <R>(fn: () => R): Promise<PromiseSettledResult<Awaited<R>>> => {
    try {
        const value = await fn();
        return { status: "fulfilled", value };
    } catch (reason) {
        return { status: "rejected", reason };
    }
};

type PromiseOnceThenState<T> = PromiseOnceThenRegister<T> | PromiseOnceThenResolved<T> | PromiseOnceThenReject<T>;
type PromiseOnceThenRegister<T> = {
    state: "pending";
    tasks: Map<unknown, PromiseOnceThenTask<T>>;
};
type PromiseOnceThenResolved<T> = { state: "resolved"; value: T };
type PromiseOnceThenReject<T> = { state: "rejected"; err: unknown };
const _pot = /*@__PURE__*/ new WeakMap<PromiseLike<unknown>, PromiseOnceThenState<any>>();

export type PromiseOnceThenTask<T> = {
    key?: unknown;
    resolve?: null | ((value: T) => void);
    reject?: null | ((error: any, value?: T) => void);
};

/**
 * 一个内存安全的、只专注于执行回调 promise then 方法。
 * 因为 promise.then 是会创建一个新的 promise 的，在某些场景下，这会带来严重的内存问题，比如说，如果你将一个 promise 作为一个锁
 * 而如果你只是想进行回调注册，使用这个方法。
 *
 * @param promise
 * @param onfulfilled
 * @param onrejected
 * @returns
 */
export const promise_once_then = <P extends PromiseLike<any>, T = Awaited<P>>(
    promise: P,
    task: PromiseOnceThenTask<T>,
): () => void => {
    const state = map_get_or_put(_pot, promise, () => {
        const pending_state: PromiseOnceThenRegister<T> = { state: "pending", tasks: new Map() };
        promise.then((value: T) => {
            _pot.set(promise, { state: "resolved", value: value });
            _promise_once_then_onfulfilled(value, pending_state.tasks.values());
        }, (err) => {
            _pot.set(promise, { state: "rejected", err });
            _promise_once_then_onrejected(err, pending_state.tasks.values());
        });
        return pending_state;
    });
    if (state.state === "pending") {
        state.tasks.set(task.key ?? task.resolve ?? task.reject, task);
        return () => promise_once_then_cancel(promise, task);
    } else if (state.state === "resolved") {
        _promise_once_then_onfulfilled(state.value, [task]);
    } else if (state.state === "rejected") {
        _promise_once_then_onrejected(state.err, [task]);
    }
    return () => {};
};

export const promise_once_then_cancel = <P extends PromiseLike<any>, T = Awaited<P>>(
    promise: P,
    task: PromiseOnceThenTask<T>,
): void => {
    const state = _pot.get(promise);
    if (state?.state === "pending") {
        state.tasks.delete(task.key ?? task.resolve ?? task.reject);
    }
};

const _promise_once_then_onfulfilled = <T>(value: T, tasks: Iterable<PromiseOnceThenTask<T>>) => {
    for (const task of tasks) {
        if (task.resolve == null) {
            continue;
        }
        try {
            const res = task.resolve(value);
            // 如果onfulfilled的返回值是一个promise，那么使用onrejected对其进行错误捕捉
            if (isPromiseLike(res) && task.reject) {
                res.then(null, task.reject);
            }
        } catch (err) {
            task.reject?.(err, value);
        }
    }
};

const _promise_once_then_onrejected = <T>(err: unknown, tasks: Iterable<PromiseOnceThenTask<T>>) => {
    for (const task of tasks) {
        if (task.reject == null) {
            continue;
        }
        // 这里没有 onrejected 的错误捕捉，所以如果 onrejected 出错了，就成为 uncatched error
        // 这里不使用 onrejected 捕捉 onrejected
        task.reject(err);
    }
};

export type PromiseRaceOptions<T> = {
    ifEmpty?: () => PromiseMaybe<T>;
};

export const promise_safe_race = <
    V extends Iterable<any>,
    T = Awaited<IterableItem<V, unknown>>,
>(
    values: V,
    options: PromiseRaceOptions<T> = {},
): PromiseMaybe<T> => {
    const promises: PromiseLike<T>[] = Array.isArray(values) ? values : [];
    // 遍历第一遍，寻找是否是直接值，从而避免不必要的开销

    // 注意这里一共只遍历一次 values，然后收集成 promises，因为迭代器的每一次遍历可能都不一样
    for (const item of values) {
        if (!isPromiseLike<T>(item)) {
            return item as Awaited<T>;
        }
        if (promises !== values as any) {
            promises.push(item);
        }
    }
    const { promise, resolve, reject } = Promise.withResolvers<Awaited<T>>();
    const registeredTasks = new Map<PromiseLike<T>, () => void>();
    let settled = false;

    // 清理所有注册的监听器
    const cleanup = () => {
        settled = true;
        for (const cancel of registeredTasks.values()) {
            cancel();
        }
        registeredTasks.clear();
    };

    // 统一解决函数
    const settle = (result: any, isError: boolean) => {
        if (settled) return;
        cleanup();
        isError ? reject(result) : resolve(result);
    };

    // 遍历第二遍，注册 promise 回调
    for (const value of promises) {
        // 因为使用 promise_once_then ，所以有可能立即执行了 settle 回调
        if (settled) break;
        // 注册监听
        registeredTasks.set(
            value,
            promise_once_then(value, {
                resolve: (val) => settle(val, false),
                reject: (err) => settle(err, true),
            }),
        );
    }

    // 处理空迭代器的情况
    // 原版的 Promise.race 会直接返回一个始终 pending 的 Promise
    // 这里依赖类型安全与用户配置，进行返回或者异常抛出
    if (!settled && registeredTasks.size === 0) {
        const {
            ifEmpty = () => {
                reject(new TypeError("Argument is empty iterable"));
                return promise;
            },
        } = options;
        return ifEmpty();
    }

    return promise;
};
