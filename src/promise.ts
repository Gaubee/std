import { event_target_on } from "./event_target.ts";
import { func_wrap } from "./func.ts";

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
