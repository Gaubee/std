import { map_get_or_put, map_get_or_put_async } from "./map.ts";

export class Lrc<K, V> {
    constructor(
        public cacheSize: number = 1000,
        public clearThreshold = cacheSize * 1.2,
    ) {}
    #cache = new Map<K, V>();
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

    set(key: K, value: V): this {
        this.#cache.set(key, value);
        this.tryClear();
        return this;
    }
    delete(key: K): boolean {
        return this.#cache.delete(key);
    }
    has(key: K): boolean {
        return this.#cache.has(key);
    }
    tryClear() {
        if (this.#cache.size > this.clearThreshold) {
            this.clear();
        }
    }

    clear(keepSize = this.cacheSize) {
        if (keepSize < 0) {
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
