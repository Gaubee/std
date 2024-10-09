export const AGF = (() => {
    try {
        Function(
            "return (async function*(){}).constructor",
        )();
    } catch {
        return (async function* () {}).constructor;
    }
})() as AsyncGeneratorFunction;

type AGValue<T> = T extends AsyncGenerator<infer V, unknown, unknown> ? V
    : unknown;
type AGReturn<T> = T extends AsyncGenerator<unknown, infer R, unknown> ? R
    : unknown;
type AGNext<T> = T extends AsyncGenerator<unknown, unknown, infer N> ? N
    : unknown;

/**
 * 持续迭代一个异步迭代器直到结束
 */
export const ag_done = async <T extends AsyncGenerator>(
    ag: T,
    each?: (value: AGValue<T>) => AGNext<T>,
) => {
    let next: any;
    while (true) {
        const item = await ag.next(next);
        if (item.done) {
            return item.value as AGReturn<T>;
        }
        if (each) {
            next = each(item.value as AGValue<T>);
        }
    }
};

/**
 * 持续迭代一个异步迭代器直到结束，接受 promise.then 的参数
 */
export const ag_then = <T extends AsyncGenerator>(
    ag: T,
    ...args: Parameters<Promise<AGReturn<T>>["then"]>
) => {
    return ag_done(ag).then(...args);
};
