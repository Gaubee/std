export type PromiseMaybe<T> = PromiseLike<T> | T;
export const isPromiseLike = <T = unknown>(value: unknown): value is PromiseLike<T> =>
    value !== null && typeof (value as any)?.then === "function";
