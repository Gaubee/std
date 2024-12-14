/**
 * 在数组末尾追加元素
 *
 * @example
 * ```ts
 * const arr = [] as number[]
 *
 * arr_set_next(arr, 1)
 *
 * // arr == [1]
 * ```
 */
export const arr_set_next = <T>(arr: Array<T>, item: T): void => {
    arr[arr.length] = item;
};
/**
 * 取数字第一个元素
 * 如果是稀疏数组，会跳过稀疏部分，取第一个
 *
 * 注意，如果不存在，会抛出异常
 */
export const sparse_arr_get_first = <T>(arr: ArrayLike<T>): T =>
    sparse_arr_get_first_or_default(arr, () => {
        throw new RangeError("could not get first element");
    });
/**
 * 取数字第一个元素
 * 如果是稀疏数组，会跳过稀疏部分，取第一个
 */
export const sparse_arr_get_first_or_null = <T>(
    arr: ArrayLike<T>,
): T | undefined => sparse_arr_get_first_or_default(arr, () => void 0);
/**
 * 取数字第一个元素
 * 如果是稀疏数组，会跳过稀疏部分，取第一个
 * 否则取默认返回值
 */
export const sparse_arr_get_first_or_default = <T, R>(
    arr: ArrayLike<T>,
    defaultValue: () => R,
): T | R => {
    if (arr.length <= 0) {
        return defaultValue();
    }
    if (0 in arr) {
        return arr[0];
    }
    for (const key in arr) {
        return arr[key];
    }
    return defaultValue();
};
/**
 * 取数字第一个元素（下标 0）
 *
 * 注意，如果不存在，会抛出异常
 */
export const arr_get_first = <T>(
    arr: ArrayLike<T>,
): T =>
    arr_get_first_or_default(arr, () => {
        throw new RangeError("could not get first element");
    });
/**
 * 取数字第一个元素（下标 0）
 */
export const arr_get_first_or_null = <T>(
    arr: ArrayLike<T>,
): T | undefined => arr_get_first_or_default(arr, () => void 0);
/**
 * 取数字第一个元素（下标 0）
 *
 * 否则取默认返回值
 */
export const arr_get_first_or_default = <T, R>(
    arr: ArrayLike<T>,
    defaultValue: () => R,
): T | R => {
    if (arr.length <= 0) {
        return defaultValue();
    }
    return arr[0];
};

/**
 * 取数字最后一个元素
 * 如果是稀疏数组，会跳过稀疏部分
 *
 * 注意，如果不存在，会抛出异常
 */
export const sparse_arr_get_last = <T>(arr: ArrayLike<T>): T =>
    sparse_arr_get_last_or_default(arr, () => {
        throw new RangeError("could not get last element");
    });

/**
 * 取数字最后一个元素
 * 如果是稀疏数组，会跳过稀疏部分
 */
export const sparse_arr_get_last_or_null = <T>(
    arr: ArrayLike<T>,
): T | undefined => sparse_arr_get_last_or_default(arr, () => void 0);

/**
 * 取数字最后一个元素
 * 如果是稀疏数组，会跳过稀疏部分
 *
 * 否则取默认返回值
 */
export const sparse_arr_get_last_or_default = <T, R>(
    arr: ArrayLike<T>,
    defaultValue: () => R,
): T | R => {
    const at = arr.length - 1;
    if (at < 0) {
        return defaultValue();
    }
    if (at in arr) {
        return arr[at];
    }
    if (Array.isArray(arr)) {
        let value: T;
        let hasValue = false;
        try {
            arr.reduceRight((_, last) => {
                hasValue = true;
                value = last;
                throw null;
            });
            // deno-lint-ignore no-empty
        } catch {}
        if (hasValue) {
            return value!;
        }
    } else {
        let lastKey: string | undefined;
        for (const key in arr) {
            if (Number.isFinite(key)) {
                lastKey = key;
            }
        }
        if (lastKey != null) {
            return arr[lastKey as any];
        }
    }
    return defaultValue();
};
/**
 * 取数字最后一个元素（下标 length-1）
 *
 * 注意，如果不存在，会抛出异常
 */
export const arr_get_last = <T>(
    arr: ArrayLike<T>,
): T =>
    arr_get_last_or_default(arr, () => {
        throw new RangeError("could not get last element");
    });
/**
 * 取数字最后一个元素（下标 length-1）
 */
export const arr_get_last_or_null = <T>(
    arr: ArrayLike<T>,
): T | undefined => arr_get_last_or_default(arr, () => void 0);

/**
 * 取数字最后一个元素（下标 length-1）
 *
 * 否则取默认返回值
 */
export const arr_get_last_or_default = <T, R>(
    arr: ArrayLike<T>,
    defaultValue: () => R,
): T | R => {
    const at = arr.length - 1;
    if (at < 0) {
        return defaultValue();
    }
    return arr[at];
};

/**
 * 移除数据中的指定的第一个匹配项
 * @param arr
 * @param value
 * @returns index
 */
export const arr_remove_first = <T>(arr: T[], value: T): number => {
    const index = arr.indexOf(value);
    if (index !== -1) {
        arr.splice(index, 1);
    }
    return index;
};
/**
 * 移除数据中的指定的N个匹配项
 * @param arr
 * @param value
 * @returns count
 */
export const arr_remove_start = <T>(arr: T[], value: T, limit: number): number => {
    let rm_count = 0;
    while (limit > rm_count) {
        if (-1 === arr_remove_first(arr, value)) {
            break;
        }
        rm_count++;
    }
    return rm_count;
};

/**
 * 移除数据中的指定的最后一个匹配项
 * @param arr
 * @param value
 * @returns index
 */
export const arr_remove_last = <T>(arr: T[], value: T): number => {
    const index = arr.lastIndexOf(value);
    if (index !== -1) {
        arr.splice(index, 1);
    }
    return index;
};

/**
 * 移除数据中的指定的后N个匹配项
 * @param arr
 * @param value
 * @returns count
 */
export const arr_remote_end = <T>(arr: T[], value: T, limit: number): number => {
    let rm_count = 0;
    while (limit > rm_count) {
        if (-1 === arr_remove_last(arr, value)) {
            break;
        }
        rm_count++;
    }
    return rm_count;
};
