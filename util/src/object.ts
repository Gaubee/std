/**
 * Creates a new object by including the specified keys from the provided object.
 *
 * 通过选中对象中的指定键来创建一个新的对象。
 */
export const obj_pick = <T extends object, KS extends (keyof T)[] = (keyof T)[]>(
    obj: T,
    ...props: KS
): Pick<T, KS[number]> => {
    const result = {} as Pick<T, KS[number]>;
    for (const prop of props) {
        result[prop] = obj[prop];
    }
    return result;
};
/**
 * Creates a new object by selecting the specified keys from the provided object
 * and mapping them to new keys as specified in the alias object.
 *
 * 通过选中对象中的指定键，并根据 alias 对象重命名来创建一个新的对象。
 * @example
 * ```ts
 * const sym_k = Symbol("k");
 * const obj = { a: 5, b: 6, c: 7, d: 8, 0: true, 1: false, [sym_k]: "sym" };
 * const obj2 = obj_pick_as(obj, { aa: "a", cc: "c", zero: 0, k: sym_k });
 *
 * obj2.aa == obj.a
 * ```
 */
export const obj_pick_as = <
    T extends object,
    const A extends Alias<T>,
>(obj: T, alias: A): PickAs<T, A> => {
    const result = {} as PickAs<T, A>;

    for (const newKey in alias) {
        const oldKey = alias[newKey];
        result[newKey] = obj[oldKey];
    }

    return result;
};
type Alias<T extends object> = Record<PropertyKey, keyof T>;
export type PickAs<T extends object, A extends Alias<T>> = { [K in keyof A]: T[A[K]] };

/**
 * Creates a new object by excluding the specified keys from the provided object.
 *
 * 通过排除对象中的指定键来创建一个新的对象。
 *
 * @example
 * ```ts
 * const sym_k = Symbol("k");
 * const obj = { a: 5, b: 6, c: 7, d: 8, 0: true, 1: false, [sym_k]: "sym" };
 * const omitted = obj_omit(obj, "a", "c", 0, sym_k);
 *
 * assertEquals(omitted, { b: 6, d: 8, "0": true, [sym_k]: "sym" });
 * ```
 */
export const obj_omit = <T extends object, KS extends (keyof T)[] = (keyof T)[]>(
    obj: T,
    ...props: KS
): Omit<T, KS[number]> => {
    const result = {} as Omit<T, KS[number]>;
    /// 首先对key做安全处理
    const omitKeys = new Set<string | symbol>();
    for (const prop of props) {
        let key: string | symbol;
        switch (typeof prop) {
            case "string":
            case "symbol":
                key = prop;
                break;
            default:
                key = String(prop);
        }
        omitKeys.add(key);
    }
    for (const key of Reflect.ownKeys(obj)) {
        if (omitKeys.has(key)) {
            continue;
        }
        //@ts-ignore
        result[key] = obj[key];
    }
    return result;
};

/**
 * 让一个对象的所有get属性成为惰性求值的属性
 */
/*@__NO_SIDE_EFFECTS__*/
export const obj_lazify = <T extends object>(obj: T, target = obj): T => {
    for (const [prop, desp] of obj_all_descriptors(obj)) {
        _set_lazify(target, prop, desp);
    }
    return target;
};

/**
 * 让一个对象的指定get属性成为惰性求值的属性
 */
export const obj_prop_lazify = <T extends object>(obj: T, prop: keyof T, target = obj): T => {
    const desp = Object.getOwnPropertyDescriptor(obj, prop);
    if (desp != null) {
        _set_lazify(target, prop, desp);
    }
    return target;
};

const _set_lazify = <T extends object>(target: T, prop: PropertyKey, desp: PropertyDescriptor) => {
    if (desp.get !== undefined && desp.set === undefined && desp.configurable) {
        const source_get = desp.get;
        const cache_get = function (this: T) {
            const cache = source_get.call(this);
            delete desp.get;
            delete desp.set;
            desp.value = cache;
            Object.defineProperty(target, prop, desp);
            return cache;
        };
        desp.get = cache_get;
        Object.defineProperty(target, prop, desp);
    }
};

/**
 * 获取一个对象全部的属性与描述
 * 注意，不会遍历原型链
 */
export const obj_all_descriptors = <T extends object>(
    obj: T,
): Array<[prop: (keyof T & (string | symbol)), desp: PropertyDescriptor]> => {
    const desps = Object.getOwnPropertyDescriptors(obj);
    return Reflect.ownKeys(desps).map((prop) => [prop as keyof T & (string | symbol), desps[prop as keyof T]]);
};
/**
 * 将 proto 的属性和方法委托给 target
 * @param target 目标对象
 * @param proto 参考原型
 * @param getBy 基于目标对象获取实际的委托者，默认使用"参考原型{@link proto}"
 * @param options
 * @returns
 */
export const obj_delegate_by = <D extends object, T extends D>(
    target: T,
    proto: D,
    getBy: (target: T) => D = () => proto,
    options?: {
        /**是否要遍历原型链 */
        recursive?: boolean;
        /**要排除的属性 */
        omit?: Iterable<PropertyKey>;
    },
): Set<PropertyKey> => {
    const recursive = options?.recursive ?? false;
    const omit = new Set(options?.omit);
    _delegate_by(target, proto, getBy, recursive, omit);
    return omit;
};
/**
 * 将 source 的属性和方法委托给 target
 */
const _delegate_by = <D extends object, T extends D>(
    target: T,
    proto: D,
    getBy: (target: T) => D,
    recursive: boolean,
    omit: Set<PropertyKey>,
) => {
    for (const [prop, desp] of obj_all_descriptors(proto)) {
        if (omit.has(prop)) {
            continue;
        }
        omit.add(prop);
        let can_delegate = false;
        if (desp.get != null) {
            can_delegate = true;
            const source_get = desp.get;
            desp.get = function (this: T) {
                return source_get.call(getBy(this));
            };
        }
        if (desp.set != null) {
            can_delegate = true;
            const source_set = desp.set;
            desp.set = function (this: T, value: unknown) {
                return source_set.call(getBy(this), value);
            };
        }
        if (typeof desp.value === "function") {
            can_delegate = true;
            const source_func = desp.value;
            desp.value = function (this: T, ...args: unknown[]) {
                return source_func.apply(getBy(this), args);
            };
        } else {
            delete desp.value;
            desp.set = function (this: T, value: unknown) {
                return Reflect.set(getBy(this), prop, value, this);
            };
            desp.get = function (this: T) {
                return Reflect.get(getBy(this), prop, this);
            };
        }
        if (can_delegate) {
            Object.defineProperty(target, prop, desp);
        }
    }
    if (recursive) {
        const source_proto = Object.getPrototypeOf(proto);
        if (source_proto !== null && source_proto !== Object.prototype) {
            return _delegate_by(target, source_proto, getBy, recursive, omit);
        }
    }
};

/**
 * 将b对象的属性附加到a上，不同于 Object.assign 赋值行为，这里是 设置属性描述，因此诸如 getter、setter 会一并过来，因此请注意 b 对象的属性是可以迁移的
 * @param a
 * @param b
 * @returns
 */
/*@__NO_SIDE_EFFECTS__*/
export const obj_assign_props: <A extends object, B extends object>(
    a: A,
    // Key change: Provide the context of 'A' as the 'this' type for 'b'
    b: B & ThisType<A>,
) => A & B = <
    A extends object,
    B extends object,
>(a: A, b: B & ThisType<A>) => {
    const b_props = Object.getOwnPropertyDescriptors(b);
    Object.defineProperties(a, b_props);
    return a as A & B;
};

/**
 * 类型安全的 obj_assign_props，先传入a，从而获得a的类型，然后b类型就能获得 ThisType<A&B>
 * @param a
 * @returns
 */
/*@__NO_SIDE_EFFECTS__*/
export const obj_assign_safe_props: <A extends object>(a: A) => <B extends object>(b: B & ThisType<A & B>) => A & B = <
    A extends object,
>(
    a: A,
) => {
    return <B extends object>(b: B & ThisType<A & B>) => obj_assign_props(a, b);
};

export type GetPropsOptions = {
    excludeSymbols?: boolean;
    enumerableOnly?: boolean;
};
type SafePropType<T> = T extends number ? `${number}` : T;
export interface ObjectGetProps {
    <T extends object>(a: T, opts: { excludeSymbols: true }): Array<SafePropType<keyof T> & string>;
    <T extends object>(a: T, opts?: GetPropsOptions): Array<SafePropType<keyof T>>;
}

/**
 * 获取对象的属性
 *
 * opts.excludeSymbols default is false
 * opts.enumerableOnly default is true
 */
export const obj_props = (<T extends object>(a: T, opts?: GetPropsOptions) => {
    const excludeSymbols = opts?.excludeSymbols ?? false;
    const enumerableOnly = opts?.enumerableOnly ?? true;
    if (enumerableOnly) {
        if (excludeSymbols) {
            return Object.keys(a);
        }
        const propDesMap = Object.getOwnPropertyDescriptors(a);
        const props: Array<string | symbol> = [];
        for (const prop in propDesMap) {
            if (propDesMap[prop].enumerable) {
                props.push(prop);
            }
        }
        return props;
    } else {
        const props: Array<string | symbol> = Object.getOwnPropertyNames(a);
        if (excludeSymbols) {
            return props;
        }
        props.push(...Object.getOwnPropertySymbols(a));
        return props;
    }
}) as ObjectGetProps;

// export const obj_extends
