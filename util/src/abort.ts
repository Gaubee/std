import { map_get_or_put } from "./map.ts";
import { promise_once_then, promise_safe_race, PromiseMaybe } from "./promise.ts";

/**
 * 将 N 个 AbortSignal 合并成 0/1 个
 * @param _signals
 * @returns
 */
export const abort_signal_merge = (..._signals: (AbortSignal | undefined | null)[]): AbortSignal | undefined => {
    const signals = _signals.filter((s) => s != null);
    if (signals.length === 0) {
        return;
    }
    if (signals.length === 1) {
        return signals[0];
    }
    const aborted_signals = signals.filter((signal) => signal.aborted);
    if (aborted_signals.length === 1) {
        return aborted_signals[0];
    }
    if (aborted_signals.length > 1) {
        return AbortSignal.abort(
            new AggregateError(
                aborted_signals.map((signal) => signal.reason),
                "multi-signals are aborted",
            ),
        );
    }

    const aborter = new AbortController();
    for (const signal of signals) {
        signal.addEventListener("abort", (reason) => {
            aborter.abort(reason);
        });
    }
    return aborter.signal;
};

const signal_promise_cache = new Map<AbortSignal, Promise<never>>();
export const abort_signal_promisify = (input: AbortSignal | { signal: AbortSignal } /*AbortController*/) => {
    const signal = input instanceof AbortSignal ? input : input.signal;
    return map_get_or_put(signal_promise_cache, signal, () => {
        const job = Promise.withResolvers<never>();
        signal.addEventListener("abort", (reason) => {
            job.reject(reason);
        }, { once: true });
        return job.promise;
    });
};
export const abort_signal_race = <T>(
    signal: AbortSignal,
    fn_or_promise: PromiseLike<T> | (() => PromiseLike<T>),
): PromiseMaybe<T> => {
    signal.throwIfAborted();
    fn_or_promise = typeof fn_or_promise === "function" ? fn_or_promise() : fn_or_promise;
    return promise_safe_race([abort_signal_promisify(signal), fn_or_promise]);
};
