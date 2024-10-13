import { event_target_on } from "./event_target.ts";
import { func_wrap } from "./func.ts";

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
): Promise<void> & {
    cancel(cause?: unknown): void;
} => {
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

export const promise_try = async <R>(fn: () => R): Promise<PromiseSettledResult<Awaited<R>>> => {
    try {
        const value = await fn();
        return { status: "fulfilled", value };
    } catch (reason) {
        return { status: "rejected", reason };
    }
};

export type PromiseMaybe<T> = PromiseLike<Awaited<T>> | Awaited<T>;
