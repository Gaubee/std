/**
 * 函数转化，实现将 this 可以作为第一个参数来传参
 */
export const uncurryThisFn = <T, ARGS extends readonly unknown[], R>(
    func: (this: T, ...args: ARGS) => R,
): (self: T, ...restArgs: ARGS) => R => {
    // deno-lint-ignore no-explicit-any
    return Function.prototype.call.bind(func) as any;
};
/**
 * 函数转化，实现将第一个参数作为 this 来传参
 */
export const curryThisFn = <T, ARGS extends readonly unknown[], R>(
    func: (self: T, ...args: ARGS) => R,
): (this: T, ...args: ARGS) => R => {
    return function (this: T, ...args: ARGS): R {
        return func(this, ...args);
    };
};

type Fun<T = unknown, ARGS extends unknown[] = any[], R extends unknown = any> =
    (
        this: T,
        ...args: ARGS
    ) => R;
type FunReturn<F> = F extends Fun ? ReturnType<F> : undefined;
/**
 * 让一个函数的返回结果是缓存的
 * @param key 自定义缓存key生成器，如果生成的key不一样，那么缓存失效
 * @returns
 */
export const func_remember = <
    F extends Fun,
    K extends Fun<ThisParameterType<F>, Parameters<F>>,
>(
    func: F,
    key?: K,
) => {
    let result: {
        key: FunReturn<K>;
        res: ReturnType<F>;
    } | undefined;

    const once_fn = function (
        this: ThisParameterType<F>,
        ...args: Parameters<F>
    ) {
        const newKey = key?.apply(this, args);
        if (result === undefined || newKey !== result.key) {
            result = {
                key: newKey,
                res: func.apply(this, args),
            };
        }
        return result.res;
    };
    const once_fn_mix = Object.assign(once_fn as F, {
        get source() {
            return func;
        },
        get key() {
            return result?.key;
        },
        get runned() {
            return result != null;
        },
        get returnValue() {
            return result?.res;
        },
        reset() {
            result = undefined;
        },
        rerun(...args: Parameters<F>) {
            once_fn_mix.reset();
            return once_fn_mix(...args) as ReturnType<F>;
        },
    });
    return once_fn_mix;
};

/**
 * 包裹一个“目标函数”，将它的执行权交给“包裹函数”。
 * 包裹函数可以在目标函数执行之前或者执行之后做一些工作，比如参数检查，比如返回值修改
 * @param func 目标函数
 * @param wrapper 包裹函数，第一个参数是 context，可以获得详细的上下文；第二个参数是 next，可以用于快速执行“目标函数”
 */
export const func_wrap = <F extends Fun, R>(
    func: F,
    wrapper: (
        context: {
            target: F;
            this: ThisParameterType<F>;
            arguments: Parameters<F>;
        },
        next: () => ReturnType<F>,
    ) => R,
) => {
    return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
        const context = {
            target: func,
            this: this,
            arguments: args,
        };
        return wrapper(
            context,
            () => Reflect.apply(func, context.this, context.arguments),
        );
    };
};
