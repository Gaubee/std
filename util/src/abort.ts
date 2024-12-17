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
