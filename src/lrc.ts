export class LrC<K, V> {
  constructor(
    public cacheSize: number = 1000,
    public clearThreshold = cacheSize * 1.2
  ) {}
  #cache = new Map<K, V>();
  getOrPut(key: K, getValue: () => V) {
    let value: V;
    if (this.#cache.has(key)) {
      value = this.#cache.get(key)!;
      this.#cache.delete(key);
    } else {
      value = getValue();
    }
    this.set(key, value);
    return value;
  }
  async getOrPutAsync(key: K, getValue: () => Promise<V>) {
    let value: V;
    if (this.#cache.has(key)) {
      value = this.#cache.get(key)!;
      this.#cache.delete(key);
    } else {
      value = await getValue();
    }
    this.set(key, value);
    return value;
  }

  set(key: K, value: V) {
    this.#cache.set(key, value);
    this.tryClear();
    return this;
  }
  delete(key: K) {
    return this.#cache.delete(key);
  }
  has(key: K) {
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
