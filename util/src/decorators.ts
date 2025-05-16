import type {Func} from "./func.ts";

export type ClassAccessorDecorator<T, V, R extends ClassAccessorDecoratorReturn<T, V> = ClassAccessorDecoratorReturn<T, V>> = (
  target: ClassAccessorDecoratorTarget<T, V>,
  context: ClassAccessorDecoratorContext<T, V>,
) => R;
type ClassAccessorDecoratorReturn<T, V> = void | ClassAccessorDecoratorResult<T, V>;
/**
 * 用于对 accessor 的修饰
 */
export const accessor = <T extends object, V>(builder: ClassAccessorDecorator<T, V>): ClassAccessorDecorator<T, V> => {
  return builder;
};
/**
 * 用于对 accessor 的修饰，提供强类型安全的返回
 */
export const safeAccessor: <T extends object, V>() => <R extends ClassAccessorDecoratorReturn<T, V>>(builder: ClassAccessorDecorator<T, V, R>) => ClassAccessorDecorator<T, V, R> =
  () => (builder) =>
    builder;

export type ClassGetterDecorator<T extends object, V, R extends ClassGetterDecoratorReturn<T, V> = ClassGetterDecoratorReturn<T, V>> = (
  target: (this: T) => V,
  context: ClassGetterDecoratorContext<T, V>,
) => R;

export type ClassGetterDecoratorReturn<T extends object, V> = void | ((this: T) => V);
/**
 * 用于对 getter 的修饰
 */
export const getter = <T extends object, V>(builder: ClassGetterDecorator<T, V>): ClassGetterDecorator<T, V> => {
  return builder;
};
/**
 * 用于对 getter 的修饰，提供强类型安全的返回
 */
export const safeGetter: <T extends object, V>() => <R extends ClassGetterDecoratorReturn<T, V>>(builder: ClassGetterDecorator<T, V, R>) => ClassGetterDecorator<T, V, R> =
  () => (builder) =>
    builder;
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
export const wrapGetter = <T extends object, V>(wrap: (this: T, get: () => V) => V): ClassGetterDecorator<T, V> => {
  return getter<T, V>((get) => {
    return function (this: T) {
      return wrap.call(this, () => get.call(this));
    };
  });
};

export type ClassSetterDecorator<T, V, R extends ClassSetterDecoratorReturn<T, V> = ClassSetterDecoratorReturn<T, V>> = (
  target: (this: T, value: V) => void,
  context: ClassSetterDecoratorContext<T, V>,
) => R;

export type ClassSetterDecoratorReturn<T, V> = void | ((this: T, value: V) => void);
/**
 * 用于对 setter 的修饰
 */
export const setter = <T = unknown, V = unknown>(builder: ClassSetterDecorator<T, V>): ClassSetterDecorator<T, V> => {
  return builder;
};
/**
 * 用于对 setter 的修饰，提供强类型安全的返回
 */
export const safeSetter: <T extends object, V>() => <R extends ClassSetterDecoratorReturn<T, V>>(builder: ClassSetterDecorator<T, V, R>) => ClassSetterDecorator<T, V, R> =
  () => (builder) =>
    builder;
/**
 * 用于在 setter 之前做一些动作
 */
export const beforeSetter = <T extends object, V>(before: Func<T, [V], void>): ClassSetterDecorator<T, V> => {
  return setter<T, V>(
    (set) =>
      function (v) {
        before.call(this, v);
        set.call(this, v);
      },
  );
};
/**
 * 用于在 setter 之后做一些动作
 */
export const afterSetter = <T extends object, V>(after: Func<T, [V], void>): ClassSetterDecorator<T, V> => {
  return setter<T, V>(
    (set) =>
      function (v) {
        set.call(this, v);
        after.call(this, v);
      },
  );
};
/**
 * 用于对 setter 做一个拦截
 */
export const wrapSetter = <T extends object, V>(wrap: (this: T, value: V, set: Func<T, [V], void>) => void): ClassSetterDecorator<T, V> => {
  return setter<T, V>(
    (set) =>
      function (v) {
        wrap.call(this, v, set);
      },
  );
};

export type ClassFieldDecorator<T extends object, V, R extends ClassFieldDecoratorReturn<T, V> = ClassFieldDecoratorReturn<T, V>> = (
  target: undefined,
  context: ClassFieldDecoratorContext<T, V>,
) => R;

export type ClassFieldDecoratorReturn<T extends object, V> = void | ((this: T, value: V) => V);
/**
 * 用于对普通字段做修饰
 * @param builder
 * @returns
 */
export const field = <T extends object, V>(builder: ClassFieldDecorator<T, V>): ClassFieldDecorator<T, V> => {
  return builder;
};
/**
 * 用于对普通字段做修饰，提供强类型安全的返回
 */
export const safeField: <T extends object, V>() => <R extends ClassFieldDecoratorReturn<T, V>>(builder: ClassFieldDecorator<T, V, R>) => ClassFieldDecorator<T, V, R> =
  () => (builder) =>
    builder;
type Method<T> = (this: T, ...args: any) => any;
export type ClassMethodDecorator<T, M extends Method<T>, R extends ClassMethodDecoratorReturn<T, M> = ClassMethodDecoratorReturn<T, M>> = (
  target: M,
  context: ClassMethodDecoratorContext<T, M>,
) => R;

export type ClassMethodDecoratorReturn<T, M extends Method<T>> = void | M;
/**
 * 用于对类方法做修饰
 * @param builder
 * @returns
 */
export const method = <T extends object, M extends Method<T>>(builder: ClassMethodDecorator<T, M>): ClassMethodDecorator<T, M> => {
  return builder;
};
/**
 * 用于对类方法做修饰，提供强类型安全的返回
 */
export const safeMethod: <T extends object, M extends Method<T>>() => <R extends ClassMethodDecoratorReturn<T, M>>(
  builder: ClassMethodDecorator<T, M, R>,
) => ClassMethodDecorator<T, M, R> = () => (builder) => builder;

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
export type ClassDecorator<C extends Class> = (target: C, context: ClassDecoratorContext<C>) => void;
export const Class = <C extends Class>(builder: ClassDecorator<C>): ClassDecorator<C> => {
  return builder;
};
