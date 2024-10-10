import { iter_map_async } from "./collections.ts";
import type { Func } from "./func.ts";
import { type ReadableDefaultStreamWithController, rs_with_controller } from "./readable_stream.ts";

/** SharedFlow 的监听函数定义 */
export type SharedFlowFun<T> = (data: T) => unknown;
/** SharedFlow 移除监听函数定义 */
export type SharedFlowOff = () => boolean;
export type SharedFlowListenOptions = { key?: unknown; onDispose?: Func };
/**
 * @module
 * 个极简的事件监听, 支持异步错误捕捉
 * 对流有着极好的支持，支持背压，因此你甚至可以把它当作一个流发射器
 * 
 * @example
 * ```ts
 * const flow = new SharedFlow<number>();
 *
 * const off = flow.on((data) => {
 *      console.log('on data', data)
 * })
 *
 * async function once() {
 *      flow.once((data) => {
 *           console.log('once data', data)
 *      })
 *      console.log('await once data', await flow.once())
 * }
 *
 * async function emit() {
 *     for (let i = 0; i < 10; i++) {
 *         await flow.emit(i);
 *     }
 * }
 *
 * async function stream() {
 *     for await (const data of flow) {
 *         await delay(1000);
 *         console.log('for await', data);
 *     }
 * }
 * ```
 */
export class SharedFlow<T> implements AsyncIterable<T> {
    //#region 核心
    #cbs = new Map<unknown, { cb: SharedFlowFun<T>; off: SharedFlowOff }>();
    get size(): number {
        return this.#cbs.size;
    }

    on(cb: SharedFlowFun<T>, options?: SharedFlowListenOptions): SharedFlowOff {
        const key = options?.key ?? cb;
        const onDispose = options?.onDispose;

        const off = () => {
            try {
                return this.#cbs.delete(key);
            } finally {
                onDispose?.();
            }
        };
        this.#cbs.set(key, { cb, off });
        return off;
    }

    off(key: unknown): boolean {
        return this.#cbs.get(key)?.off() ?? false;
    }

    clean() {
        for (const cb of this.#cbs.values()) {
            cb.off();
        }
    }

    async emit(data: T) {
        if (this.size === 0) {
            return;
        }
        const errors: unknown[] = [];
        const results = await iter_map_async(
            this.#cbs.values(),
            (cb) => cb.cb(data),
        );
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
    once(cb?: null): Promise<T> & { resolve(data: T): void; reject(reason?: unknown): void };
    once(cb: SharedFlowFun<T>): SharedFlowOff;
    once(cb?: SharedFlowFun<T> | null) {
        if (cb == null) {
            const job = Promise.withResolvers<T>();
            const off = this.on((data) => {
                off();
                job.resolve(data);
            });
            return Object.assign(job.promise, {
                resolve(data: T) {
                    job.resolve(data);
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
     * 和使用 `for await (const data of flow)` 的方式来隐性触发流监听不同，这里的 stream 函数在调用的时候，就会立刻进行数据监听，因此可以避免一些执行顺序的误会
     */
    stream(options?: SharedFlowListenOptions): AsyncGenerator<Awaited<T>, void, unknown> {
        const readable = rs_with_controller<T>();
        const off = this.on(async (data) => {
            readable.controller.enqueue(data);
            if ((readable.controller.desiredSize ?? 1) <= 0) {
                await readable.onPull.once();
            }
        }, {
            ...options,
            onDispose() {
                stream.return();
                options?.onDispose?.();
            },
        });
        // 在流结束的时候，清理监听
        readable.onCancel.once(() => {
            readable.onPull.clean();
            off();
        });

        const stream = this.#stream(readable);
        return stream;
    }
    async *#stream(readable: ReadableDefaultStreamWithController<T>) {
        try {
            const reader = readable.stream.getReader();
            while (true) {
                const item = await reader.read();
                if (item.done) {
                    break;
                }
                yield item.value;
            }
        } catch (e) {
            console.log("catch", e);
            readable.controller.error(e);
        } finally {
            console.log("finally");
            readable.controller.close();
        }
    }
    [Symbol.asyncIterator](): AsyncGenerator<Awaited<T>, void, unknown> {
        return this.stream();
    }
}
