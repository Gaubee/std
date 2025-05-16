/**
 * 该模块为旧版 decorators 提供了一个桥接方案，使它可以运作在新版 decorators 中
 * @module
 */
import type {ClassAccessorDecorator, ClassDecorator, ClassFieldDecorator, ClassGetterDecorator, ClassMethodDecorator, ClassSetterDecorator} from "./decorators.ts";
import type {Func} from "./func.ts";

type RequiredKeys<T extends object, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
type PropertyKey<T> = keyof T & (string | symbol);
/**
 * 参考 {@link MethodDecorator}
 */
export type ClassAccessorLegacyDecorator<T, V> = (
  target: T,
  property: PropertyKey<T>,
  descriptor: RequiredKeys<TypedPropertyDescriptor<V>, "get" | "set">,
) => void | TypedPropertyDescriptor<V>;
/**
 * 用于在标准 accessor-decorators 中使用旧版的 decorators
 */
export const legacyAccessor = <C extends Class, V>(Class: C, builder: ClassAccessorLegacyDecorator<InstanceType<C>, V>): ClassAccessorDecorator<InstanceType<C>, V> => {
  return (_, context) => {
    const newDesc = builder(Class.prototype, context.name, Object.getOwnPropertyDescriptor(Class.prototype, context.name) as any);
    if (newDesc != null) {
      Object.defineProperty(Class.prototype, context.name, newDesc);
    }
  };
};

/**
 * 参考 {@link MethodDecorator}
 */
export type ClassGetterLegacyDecorator<T extends object, V> = (
  target: T,
  property: PropertyKey<T>,
  descriptor: RequiredKeys<TypedPropertyDescriptor<V>, "get">,
) => void | TypedPropertyDescriptor<V>;
/**
 * 用于在标准 accessor-getter 中使用旧版的 decorators
 */
export const legacyGetter = <C extends Class, V>(Class: C, builder: ClassGetterLegacyDecorator<InstanceType<C>, V>): ClassGetterDecorator<InstanceType<C>, V> => {
  return (_, context) => {
    const newDesc = builder(Class.prototype, context.name, Object.getOwnPropertyDescriptor(Class.prototype, context.name) as any);
    if (newDesc != null) {
      Object.defineProperty(Class.prototype, context.name, newDesc);
    }
  };
};

/**
 * 参考 {@link MethodDecorator}
 */
export type ClassSetterLegacyDecorator<T extends object, V> = (
  target: T,
  property: PropertyKey<T>,
  descriptor: RequiredKeys<TypedPropertyDescriptor<V>, "set">,
) => void | TypedPropertyDescriptor<V>;
/**
 * 用于在标准 accessor-setter 中使用旧版的 decorators
 */
export const legacySetter = <C extends Class, V>(Class: C, builder: ClassSetterLegacyDecorator<InstanceType<C>, V>): ClassSetterDecorator<InstanceType<C>, V> => {
  return (_, context) => {
    const newDesc = builder(Class.prototype, context.name, Object.getOwnPropertyDescriptor(Class.prototype, context.name) as any);
    if (newDesc != null) {
      Object.defineProperty(Class.prototype, context.name, newDesc);
    }
  };
};
/**
 * 参考 {@link PropertyDecorator}
 */
export type ClassMethodLegacyDecorator<T extends object, M> = (target: T, property: PropertyKey<T>, descriptor: RequiredKeys<TypedPropertyDescriptor<M>, "value">) => void;
/**
 * 用于在标准 accessor-method 中使用旧版的 decorators
 */
export const legacyMethod = <C extends Class, M extends Func<InstanceType<C>>>(
  Class: C,
  builder: ClassMethodLegacyDecorator<InstanceType<C>, M>,
): ClassMethodDecorator<InstanceType<C>, M> => {
  return (_, context) => {
    const newDesc = builder(Class.prototype, context.name as PropertyKey<InstanceType<C>>, Object.getOwnPropertyDescriptor(Class.prototype, context.name) as any);
    if (newDesc != null) {
      Object.defineProperty(Class.prototype, context.name, newDesc);
    }
  };
};

/**
 * 参考 {@link PropertyDecorator}
 */
export type ClassFieldLegacyDecorator<T extends object> = (target: T, property: PropertyKey<T>) => void;
/**
 * 用于在标准 accessor-field 中使用旧版的 decorators
 */
export const legacyField = <C extends Class, V>(Class: C, builder: ClassFieldLegacyDecorator<InstanceType<C>>): ClassFieldDecorator<InstanceType<C>, V> => {
  return (_, context) => {
    builder(Class.prototype, context.name as PropertyKey<InstanceType<C>>);
  };
};

type Class = abstract new (...args: any) => any;
/**
 * 参考 {@link ClassDecorator}
 */
export type ClassLegacyDecorator<C extends Class> = (target: C) => void;
/**
 * 用于在标准 accessor-class 中使用旧版的 decorators
 */
export const legacyClass = <C extends Class>(builder: ClassLegacyDecorator<C>): ClassDecorator<C> => {
  return builder;
};
