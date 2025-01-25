import { event_target_on } from "./event_target.ts";
import { func_wrap } from "./func.ts";
import { map_get_or_put } from "./map.ts";

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
 */
export const delay = (
    ms: number,
    options?: { signal?: AbortSignal | null },
): delay.Delayer => {
    const signal = options?.signal;
    if (signal?.aborted) {
        throw signal.reason;
    }

    const job = Promise.withResolvers<void>();
    let resolve = job.resolve;
    let reject = job.reject;
    const ti = setTimeout(() => resolve(), ms);
    const result = Object.assign(job.promise, {
        cancel(cause?: unknown) {
            clearTimeout(ti);
            if (cause == null) {
                resolve();
            } else {
                reject(cause);
            }
        },
    });
    if (signal != null) {
        const off = event_target_on(signal, "abort", () => {
            result.cancel(signal.reason);
        });
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
    return result;
};

export namespace delay {
    export type Delayer = Promise<void> & {
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

export type PromiseMaybe<T> = PromiseLike<Awaited<T>> | Awaited<T>;
export const isPromiseLike = (p: unknown): p is PromiseLike<unknown> =>
    typeof p === "object" && p != null && "then" in p && typeof p.then === "function";

type PromiseOnceThenState<T> = PromiseOnceThenRegister<T> | PromiseOnceThenResolved<T> | PromiseOnceThenReject<T>;
type PromiseOnceThenRegister<T> = {
    state: "pending";
    tasks: Map<unknown, PromiseOnceThenTask<T>>;
};
type PromiseOnceThenResolved<T> = { state: "resolved"; value: T };
type PromiseOnceThenReject<T> = { state: "rejected"; err: unknown };
const _pot = new WeakMap<PromiseLike<unknown>, PromiseOnceThenState<any>>();

export type PromiseOnceThenTask<T> = {
    key?: unknown;
    onfulfilled?: null | ((value: T) => void);
    onrejected?: null | ((error: any, value?: T) => void);
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
) => {
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
        state.tasks.set(task.key, task);
    } else if (state.state === "resolved") {
        _promise_once_then_onfulfilled(state.value, [task]);
    } else if (state.state === "rejected") {
        _promise_once_then_onrejected(state.err, [task]);
    }
};

const _promise_once_then_onfulfilled = <T>(value: T, tasks: Iterable<PromiseOnceThenTask<T>>) => {
    for (const task of tasks) {
        if (task.onfulfilled == null) {
            continue;
        }
        try {
            const res = task.onfulfilled(value);
            // 如果onfulfilled的返回值是一个promise，那么使用onrejected对其进行错误捕捉
            if (isPromiseLike(res) && task.onrejected) {
                res.then(null, task.onrejected);
            }
        } catch (err) {
            task.onrejected?.(err, value);
        }
    }
};

const _promise_once_then_onrejected = <T>(err: unknown, tasks: Iterable<PromiseOnceThenTask<T>>) => {
    for (const task of tasks) {
        if (task.onrejected == null) {
            continue;
        }
        // 这里没有 onrejected 的错误捕捉，所以如果 onrejected 出错了，就成为 uncatched error
        // 这里不使用 onrejected 捕捉 onrejected
        task.onrejected(err);
    }
};
