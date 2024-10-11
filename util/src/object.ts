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
export const obj_lazify = <T extends object>(obj: T, target = obj): T => {
    const desps = Object.getOwnPropertyDescriptors(obj);
    for (const [prop, desp] of Object.entries(desps)) {
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
