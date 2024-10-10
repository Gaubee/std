import { map_get_or_put, map_get_or_put_async } from "./map.ts";

/**
 * 一个极简的 Least Recently Used 缓存
 * @example
 * ```ts
 * const lrc = new Lrc()
 * function getTime() {
 *      lrc.getOrPut('time', ()=>{
 *           return Date.now()
 *      })
 * }
 * const time1 = getTime()
 * // hit cache
 * const time2 = getTime()
 * time1 === time2
 *
 * // remove all cache
 * lrc.clear(0)
 *
 * const time3 = getTime()
 * time1 !== time3
 * ```
 */
export class Lrc<K, V> {
    constructor(
        public cacheSize: number = 1000,
        public clearThreshold = cacheSize * 1.2,
    ) {}
    #cache = new Map<K, V>();
    /**
     * 读取缓存，否则创建
     */
    getOrPut(key: K, getValue: () => V): V {
        let put = false;
        const value = map_get_or_put(this.#cache, key, () => {
            put = true;
            return getValue();
        });
        if (put === false) {
            this.#cache.delete(key);
            this.set(key, value);
        }
        return value;
    }
    /**
     * 读取缓存，否则异步创建。
     * 异步创建过程中会加锁，不会同时执行
     */
    async getOrPutAsync(
        key: K,
        getValue: () => Promise<V>,
    ): Promise<V> {
        let put = false;
        const value = await map_get_or_put_async(this.#cache, key, () => {
            put = true;
            return getValue();
        });
        if (put === false) {
            this.#cache.delete(key);
            this.set(key, value);
        }
        return value;
    }
    /**
     * 写入缓存
     */
    set(key: K, value: V): this {
        this.#cache.set(key, value);
        this.tryClear();
        return this;
    }
    /**
     * 删除缓存
     */
    delete(key: K): boolean {
        return this.#cache.delete(key);
    }
    /**
     * 判断是否存在缓存
     */
    has(key: K): boolean {
        return this.#cache.has(key);
    }
    /**
     * 尝试清理缓存，如果到达清理阈值的话
     */
    tryClear() {
        if (this.#cache.size > this.clearThreshold) {
            this.clear();
        }
    }
    /**
     * 清理缓存
     * @param keepSize 要保留的缓存数量
     */
    clear(keepSize = this.cacheSize) {
        if (Number.isFinite(keepSize) === false) {
            keepSize = this.cacheSize;
        }
        if (keepSize <= 0) {
            this.#cache.clear();
        } else {
            let rmSize = this.#cache.size - keepSize;
            if (rmSize > 0) {
                for (const key of this.#cache.keys()) {
                    this.#cache.delete(key);
                    if (--rmSize <= 0) {
                        break;
                    }
                }
            }
        }
    }
}
