// deno-lint-ignore-file ban-types
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

/**
 * 类型安全的函数定义
 */
export type Func<This = any, Arguments extends unknown[] = any[], Return extends unknown = any> = (
    this: This,
    ...args: Arguments
) => Return;
type FunReturn<F> = F extends Func ? ReturnType<F> : undefined;
/**
 * 让一个函数的返回结果是缓存的
 * @param key 自定义缓存key生成器，如果生成的key不一样，那么缓存失效
 * @returns
 */
export const func_remember = <
    F extends Func,
    K extends Func<ThisParameterType<F>, Parameters<F>>,
>(
    func: F,
    key?: K,
): F & {
    readonly source: F;
    readonly key: FunReturn<K> | undefined;
    readonly runned: boolean;
    readonly returnValue: ReturnType<F> | undefined;
    reset(): void;
    rerun(...args: Parameters<F>): ReturnType<F>;
} => {
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
export const func_wrap = <F extends Func, R>(
    func: F,
    wrapper: (
        context: {
            target: F;
            this: ThisParameterType<F>;
            arguments: Parameters<F>;
        },
        next: () => ReturnType<F>,
    ) => R,
): (this: ThisParameterType<F>, ...args: Parameters<F>) => R => {
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

type PrototypeToThis<T> = T extends String ? string
    : T extends Number ? number
    : T extends Boolean ? boolean
    : T extends BigInt ? bigint
    : T extends Symbol ? symbol
    : T;
/**
 * 向某一个对象配置函数属性
 */
export const extendsMethod = <T extends object>(
    target: T,
    prop: PropertyKey,
    method: Func<PrototypeToThis<T>>,
): void => {
    Object.defineProperty(target, prop, {
        configurable: true,
        writable: true,
        value: method,
    });
};

/**
 * 向某一个对象配置getter属性
 */
export const extendsGetter = <T extends object>(target: T, prop: PropertyKey, getter: Func<PrototypeToThis<T>, []>) => {
    Object.defineProperty(target, prop, {
        configurable: true,
        get: getter,
    });
};
