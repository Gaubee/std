import type {
    ClassAccessorDecorator,
    ClassDecorator,
    ClassFieldDecorator,
    ClassGetterDecorator,
    ClassMethodDecorator,
    ClassSetterDecorator,
} from "./decorators.ts";
import type { Func } from "./func.ts";

type RequiredKeys<T extends object, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
type PropertyKey<T> =
    & (keyof T)
    & (
        | string
        | symbol
    );
/**
 * 参考 {@link MethodDecorator}
 */
export type ClassAccessorLegacyDecorator<T> = (
    target: T,
    property: PropertyKey<T>,
    descriptor: RequiredKeys<PropertyDescriptor, "get" | "set">,
) => void;
/**
 * 用于在标准 accessor-decorators 中使用旧版的 decorators
 */
export const legacyAccessor = <C extends Class, V>(
    Class: C,
    builder: ClassAccessorLegacyDecorator<InstanceType<C>>,
): ClassAccessorDecorator<InstanceType<C>, V> => {
    return (_, context) => {
        builder(Class.prototype, context.name, Object.getOwnPropertyDescriptor(Class.prototype, context.name) as any);
    };
};

/**
 * 参考 {@link MethodDecorator}
 */
export type ClassGetterLegacyDecorator<T extends object> = (
    target: T,
    property: PropertyKey<T>,
    descriptor: RequiredKeys<PropertyDescriptor, "get">,
) => void;
/**
 * 用于在标准 accessor-getter 中使用旧版的 decorators
 */
export const legacyGetter = <C extends Class, V>(
    Class: C,
    builder: ClassGetterLegacyDecorator<InstanceType<C>>,
): ClassGetterDecorator<InstanceType<C>, V> => {
    return (_, context) => {
        builder(Class.prototype, context.name, Object.getOwnPropertyDescriptor(Class.prototype, context.name) as any);
    };
};

/**
 * 参考 {@link MethodDecorator}
 */
export type ClassSetterLegacyDecorator<T extends object> = (
    target: T,
    property: PropertyKey<T>,
    descriptor: RequiredKeys<PropertyDescriptor, "set">,
) => void;
/**
 * 用于在标准 accessor-setter 中使用旧版的 decorators
 */
export const legacySetter = <C extends Class, V>(
    Class: C,
    builder: ClassSetterLegacyDecorator<InstanceType<C>>,
): ClassSetterDecorator<InstanceType<C>, V> => {
    return (_, context) => {
        builder(Class.prototype, context.name, Object.getOwnPropertyDescriptor(Class.prototype, context.name) as any);
    };
};

/**
 * 参考 {@link PropertyDecorator}
 */
export type ClassFieldLegacyDecorator<T extends object> = (
    target: T,
    property: PropertyKey<T>,
) => void;
/**
 * 用于在标准 accessor-field 中使用旧版的 decorators
 */
export const legacyField = <C extends Class, V>(
    Class: C,
    builder: ClassFieldLegacyDecorator<InstanceType<C>>,
): ClassFieldDecorator<InstanceType<C>, V> => {
    return (_, context) => {
        builder(Class.prototype, context.name as PropertyKey<InstanceType<C>>);
    };
};

type Class = abstract new (...args: any) => any;
/**
 * 参考 {@link ClassDecorator}
 */
export type ClassLegacyDecorator<C extends Class> = (
    target: C,
) => void;
/**
 * 用于在标准 accessor-class 中使用旧版的 decorators
 */
export const legacyClass = <C extends Class>(builder: ClassLegacyDecorator<C>): ClassDecorator<C> => {
    return builder;
};

/**
 * 参考 {@link PropertyDecorator}
 */
export type ClassMethodLegacyDecorator<T extends object, M> = (
    target: T,
    property: PropertyKey<T>,
    descriptor: RequiredKeys<TypedPropertyDescriptor<M>, "value">,
) => void;
/**
 * 用于在标准 accessor-method 中使用旧版的 decorators
 */
export const legacyMethod = <C extends Class, M extends Func<InstanceType<C>>>(
    Class: C,
    builder: ClassMethodLegacyDecorator<InstanceType<C>, M>,
): ClassMethodDecorator<InstanceType<C>, M> => {
    return (_, context) => {
        builder(
            Class.prototype,
            context.name as PropertyKey<InstanceType<C>>,
            Object.getOwnPropertyDescriptor(Class.prototype, context.name) as any,
        );
    };
};
