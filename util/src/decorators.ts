import type { Func } from "./func.ts";

export type ClassAccessorDecorator<T, V> = (
    target: ClassAccessorDecoratorTarget<T, V>,
    context: ClassAccessorDecoratorContext<T, V>,
) => void | ClassAccessorDecoratorResult<T, V>;
/**
 * 用于对 accessor 的修饰
 */
export const accessor = <T extends object, V>(
    builder: ClassAccessorDecorator<T, V>,
): ClassAccessorDecorator<T, V> => {
    return builder;
};

export type ClassGetterDecorator<T extends object, V> = (
    target: (this: T) => V,
    context: ClassGetterDecoratorContext<T, V>,
) => void | ((this: T) => V);
/**
 * 用于对 getter 的修饰
 */
export const getter = <T extends object, V>(
    builder: ClassGetterDecorator<T, V>,
): ClassGetterDecorator<T, V> => {
    return builder;
};
/**
 * 用于在 getter 之前做一些动作
 */
export const beforeGetter = <T extends object, V>(before: Func<T, [], void>): ClassGetterDecorator<T, V> => {
    return getter<T, V>((get) => {
        return function () {
            before.call(this);
            return get.call(this);
        };
    });
};
/**
 * 用于在 getter 之后做一些动作
 */
export const afterGetter = <T extends object, V>(after: Func<T, [V], void>): ClassGetterDecorator<T, V> => {
    return getter<T, V>((get) => {
        return function (this: T) {
            const result = get.call(this);
            after.call(this, result);
            return result;
        };
    });
};
/**
 * 用于对 getter 做一个拦截
 */
export const wrapGetter = <T extends object, V>(
    wrap: (this: T, get: () => V) => V,
): ClassGetterDecorator<T, V> => {
    return getter<T, V>((get) => {
        return function (this: T) {
            return wrap.call(this, () => get.call(this));
        };
    });
};

export type ClassSetterDecorator<T, V> = (
    target: (this: T, value: V) => void,
    context: ClassSetterDecoratorContext<T, V>,
) => void | ((this: T, value: V) => void);
/**
 * 用于对 setter 的修饰
 */
export const setter = <T = unknown, V = unknown>(
    builder: ClassSetterDecorator<T, V>,
): ClassSetterDecorator<T, V> => {
    return builder;
};
/**
 * 用于在 setter 之前做一些动作
 */
export const beforeSetter = <T extends object, V>(before: Func<T, [V], void>): ClassSetterDecorator<T, V> => {
    return setter<T, V>((set) =>
        function (v) {
            before.call(this, v);
            set.call(this, v);
        }
    );
};
/**
 * 用于在 setter 之后做一些动作
 */
export const afterSetter = <T extends object, V>(after: Func<T, [V], void>): ClassSetterDecorator<T, V> => {
    return setter<T, V>((set) =>
        function (v) {
            set.call(this, v);
            after.call(this, v);
        }
    );
};
/**
 * 用于对 setter 做一个拦截
 */
export const wrapSetter = <T extends object, V>(
    wrap: (this: T, value: V, set: Func<T, [V], void>) => void,
): ClassSetterDecorator<T, V> => {
    return setter<T, V>((set) =>
        function (v) {
            wrap.call(this, v, set);
        }
    );
};

export type ClassFieldDecorator<T extends object, V> = (
    target: undefined,
    context: ClassFieldDecoratorContext<T, V>,
) => void | ((this: T, value: V) => V);
/**
 * 用于对普通字段做修饰
 * @param builder
 * @returns
 */
export const field = <T extends object, V>(builder: ClassFieldDecorator<T, V>): ClassFieldDecorator<T, V> => {
    return builder;
};
type Method<T> = (this: T, ...args: any) => any;
export type ClassMethodDecorator<T, M extends Method<T>> = (
    target: M,
    context: ClassMethodDecoratorContext<T, M>,
) => void | M;
/**
 * 用于对类方法做修饰
 * @param builder
 * @returns
 */
export const method = <T extends object, M extends Method<T>>(
    builder: ClassMethodDecorator<T, M>,
): ClassMethodDecorator<T, M> => {
    return builder;
};

export const bindThis = <T extends object, M extends Method<T>>(): ClassMethodDecorator<T, M> =>
    method<T, M>((target, context) => {
        if (context.private) {
            throw new Error("private method no suport to bind this.");
        }
        context.addInitializer(function () {
            Reflect.set(this, context.name, target.bind(this));
        });
    });

type Class = abstract new (...args: any) => any;
export type ClassDecorator<C extends Class> = (
    target: C,
    context: ClassDecoratorContext<C>,
) => void;
export const Class = <C extends Class>(builder: ClassDecorator<C>): ClassDecorator<C> => {
    return builder;
};
