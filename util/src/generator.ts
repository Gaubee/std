import { arr_set_next } from "./collections.ts";
import type { PromiseMaybe } from "./promise.ts";
import { str_reverse } from "./string.ts";

/**
 * GeneratorFunction
 */
export const GF = (() => {
    try {
        return Function(
            str_reverse("rotcurtsnoc.)}{)(*noitcnuf( nruter"),
        )();
    } catch {
        return (function* () {}).constructor;
    }
})() as GeneratorFunction;

/**
 * AsyncGeneratorFunction
 */
export const AGF = (() => {
    try {
        return Function(
            str_reverse("rotcurtsnoc.)}{)(*noitcnuf cnysa( nruter"),
        )();
    } catch {
        return (async function* () {}).constructor;
    }
})() as AsyncGeneratorFunction;

type AGValue<T> = T extends AsyncIterableIterator<infer V, unknown, unknown> ? V
    : unknown;
type AGReturn<T> = T extends AsyncIterableIterator<unknown, infer R, unknown> ? R
    : unknown;
type AGNext<T> = T extends AsyncIterableIterator<unknown, unknown, infer N> ? N
    : unknown;

/**
 * 持续迭代一个异步迭代器直到结束
 * @example
 * ```ts
 * // const r: number
 * const r = await ag_done((async function* () {
 *     return 1;
 * })());
 * ```
 */
export const ag_done = async <T extends AsyncIterableIterator<any>>(
    ag: T,
    each: AsyncGeneratorDoneOptions<T> = {},
): Promise<AGReturn<T>> => {
    let next: any;
    while (true) {
        const item = await ag.next(next);
        if (item.done) {
            return item.value as AGReturn<T>;
        }
        if (each.next) {
            next = await each.next(item.value as AGValue<T>);
        }
    }
};

export interface AsyncGeneratorDoneOptions<T extends AsyncIterableIterator<any>> {
    next?: (value: AGValue<T>) => PromiseMaybe<AGNext<T>>;
}

export const ag_map = async <T extends AsyncIterableIterator<any>, R>(
    ag: T,
    each: AsyncGeneratorMapOptions<T, R>,
): Promise<R[]> => {
    const result: R[] = [];
    await ag_done(ag, {
        next: async (value) => {
            arr_set_next(result, await each.map(value));
            return each.next?.(value) as any;
        },
    });
    return result;
};
export interface AsyncGeneratorMapOptions<T extends AsyncIterableIterator<any>, R> extends AsyncGeneratorDoneOptions<T> {
    map: (value: AGValue<T>) => PromiseMaybe<R>;
}

export const ag_map_reduce = async <T extends AsyncIterableIterator<any>, M, R>(
    ag: T,
    each: AsyncGeneratorMapReduceOptions<T, M, R>,
): Promise<R> => {
    let result = each.initialValue;
    await ag_done(ag, {
        next: async (value) => {
            const mapped = await each.map(value);
            for (const item of mapped) {
                result = await each.reduce(result, item);
            }
            return each.next?.(value) as any;
        },
    });
    return result;
};
export interface AsyncGeneratorMapReduceOptions<T extends AsyncIterableIterator<any>, M, R> extends AsyncGeneratorDoneOptions<T> {
    map: (value: AGValue<T>) => PromiseMaybe<Iterable<M>>;
    reduce: (previousValue: R, currentValue: M) => PromiseMaybe<R>;
    initialValue: R;
}

/**
 * 持续迭代一个异步迭代器直到结束，接受 promise.then 的参数
 *
 * @example
 * ```ts
 * // const r: 1 | boolean
 * const r = await ag_then(
 *     (async function* () {
 *     })(),
 *     () => 1 as const,
 *     () => false,
 * );
 * ```
 */
export const ag_then = <
    T extends AsyncIterableIterator<any>,
    ARGS extends Parameters<Promise<AGReturn<T>>["then"]> = Parameters<
        Promise<AGReturn<T>>["then"]
    >,
>(
    ag: T,
    ...args: ARGS
): Promise<
    ReturnType<
        FilterNotNull<ARGS>[number]
    >
> => {
    return ag_done(ag).then(...args) as any;
};

type FilterNotNull<A> = A extends (infer T)[] ? NonNullable<T>[] : [];
