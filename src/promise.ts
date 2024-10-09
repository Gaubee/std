import { event_target_on } from "./event_target.ts";

export const delay = (
    ms: number,
    options?: { signal?: AbortSignal | null },
) => {
    const job = Promise.withResolvers<void>();
    const ti = setTimeout(job.resolve, ms);
    const result = Object.assign(job.promise, {
        cancel(cause?: unknown) {
            clearTimeout(ti);
            if (cause == null) {
                job.resolve();
            } else {
                job.reject();
            }
        },
    });
    const signal = options?.signal;
    if (signal != null) {
        const off = event_target_on(signal, "abort", () => {
            result.cancel(signal.reason);
        });
        job.promise.finally(off);
    }
    return result;
};