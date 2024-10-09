import { mapAsync } from "./collections.ts";

// import "/ext/array.ext";
export type EvtFun<T> = (data: T) => unknown;
export type EvtOff = () => boolean;
/**
 * 个极简的事件监听,支持异步错误捕捉
 */
export class Evt<T> implements AsyncIterable<T> {
    //#region 核心
    #cbs = new Map<unknown, EvtFun<T>>();
    get size(): number {
        return this.#cbs.size;
    }

    on(cb: EvtFun<T>, key: unknown = cb): EvtOff {
        this.#cbs.set(key, cb);
        return () => this.off(key);
    }

    off(key: unknown): boolean {
        return this.#cbs.delete(key);
    }

    async emit(data: T) {
        if (this.size === 0) {
            return;
        }
        const errors: unknown[] = [];
        const results = await mapAsync(this.#cbs.values(), (cb) => cb(data));
        for (const item of results) {
            if (item.status === "rejected") {
                errors.push(...item.reason);
            }
        }
        if (errors.length > 0) {
            throw new AggregateError(errors, "emit error");
        }
    }
    //#endregion
    once(cb?: null): Promise<T>;
    once(cb: EvtFun<T>): EvtOff;
    once(cb?: EvtFun<T> | null) {
        if (cb == null) {
            const job = Promise.withResolvers<T>();
            const off = this.on((data) => {
                off();
                job.resolve(data);
            });
            return Object.assign(job.promise, {
                resolve(defaultValue: T) {
                    job.resolve(defaultValue);
                },
                reject(reason?: unknown) {
                    job.reject(reason);
                },
            }) as unknown;
        }
        const off = this.on((data) => {
            off();
            cb(data);
        });
        return off as unknown;
    }
    /**
     * 将事件以流的方式发出
     */
    stream(): AsyncGenerator<Awaited<T>, void, unknown> {
        const controller: AsyncIteratorController<T> = {
            caches: [],
            waiter: undefined,
            off: this.on((data) => {
                if (controller.waiter != null) {
                    controller.waiter.resolve(data);
                    controller.waiter = undefined;
                } else {
                    controller.caches.push(data);
                }
            }),
        };
        return this.#stream(controller);
    }
    async *#stream(controller: AsyncIteratorController<T>) {
        try {
            while (true) {
                if (controller.caches.length > 0) {
                    yield controller.caches.shift()!;
                } else {
                    controller.waiter = Promise.withResolvers();
                    yield await controller.waiter.promise;
                }
            }
        } finally {
            controller.off();
        }
    }
    [Symbol.asyncIterator](): AsyncGenerator<Awaited<T>, void, unknown> {
        return this.stream();
    }
}

type AsyncIteratorController<T> = {
    caches: T[];
    waiter: PromiseWithResolvers<T> | undefined;
    off: () => boolean;
};
