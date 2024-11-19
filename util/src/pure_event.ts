import { iter_map_async_try } from "./collections.ts";
import type { Func } from "./func.ts";
import { iter_map_not_null } from "./index.ts";
import { obj_delegate_by } from "./object.ts";
import { promise_try } from "./promise.ts";

/** PureEvent 的监听函数定义 */
export type PureEventFun<T> = (data: T) => unknown;
type PureEventOffResult = boolean | Promise<PromiseSettledResult<unknown>>;
/** PureEvent 移除监听函数定义 */
export type PureEventOff = () => PureEventOffResult;
/** PureEvent 监听函数可选参数 */
export interface PureEventListenOptions {
    /** 自定义事件索引 */
    key?: unknown;
    /** 销毁事件时的自定义函数 */
    onDispose?: Func;
}
/** PureEvent 监听函数可选参数 */
export interface PureEventOnceOptions<T> extends PureEventListenOptions {
    filter?: (data: T) => boolean;
}

export type PureEventOncePromiseWithResolvers<T> = Promise<T> & {
    resolve(data: T): void;
    reject(reason?: unknown): void;
};

/**
 * 一个现代化的单事件监听器
 *
 * 对异步与错误捕捉有着一流的支持
 *
 * 可自定义移除事件时的触发器
 *
 * @example
 * ```ts
 * import { PureEvent } from "@gaubee/util/pure_event";
 * const pevent = new PureEvent<string>();
 *
 * /// basic
 * // add listen
 * const off = pevent.on((data) => console.log("on", data));
 * // dispatch listen
 * pevent.emit("hi");
 * // remove listen
 * off();
 *
 * // add listen with custom key
 * pevent.on((data) => console.log("on", data), { key: "key1" });
 * // remove listen with custom key
 * pevent.off("key1");
 *
 * // add listen width dispose function
 * const off = pevent.on((data) => console.log("on", data), {
 *   onDispose: async () => {
 *     console.log("off");
 *     return 123;
 *   },
 * });
 * // remove listen and run dispatch function
 * console.log(await off()); // { status: "fulfilled", value: 123 }
 *
 * /// once
 * // add one time listen with callback function
 * pevent.once((data) => console.log("once", data));
 * // add one time listen without callback function and return promise
 * pevent.once().then((data) => console.log("once.then", data));
 * // add one time listen with filter function
 * pevent.once({ filter(data){ return data == "match" } }).then((data) => console.log("once filter", data));
 *
 * // best practices for multiple events:
 * // use explicit properties instead of event name mappings
 * class YourClass {
 *      onStart = new PureEvent<void>()
 *      onData = new PureEvent<void>()
 *      onEnd = new PureEvent<void>()
 * }
 * ```
 */
export class PureEvent<T> {
    //#region 核心
    /** 监听表 */
    readonly events: Map<unknown, { cb: PureEventFun<T>; onDispose: Func | undefined; off: PureEventOff }> = new Map();
    /** 有多少监听 */
    get size(): number {
        return this.events.size;
    }
    /** 判断是否已经存在指定监听 */
    has(key: unknown): boolean {
        return this.events.has(key);
    }
    /**
     * 附加监听
     * 可以自定义唯一索引 key，如果重复，会移除之前的监听
     */
    on(cb: PureEventFun<T>, options?: PureEventListenOptions): PureEventOff {
        const key = options?.key ?? cb;
        this.off(key);

        let onDispose = options?.onDispose;
        if (typeof onDispose !== "function") {
            onDispose = undefined;
        }
        const off = () => this.off(key);

        this.events.set(key, { cb, onDispose, off });
        return off;
    }

    /**
     * 移除指定监听
     * 如果没有指定事件，那么返回false
     * 否则，如果没有自定义 移除监听器（onDispose），那么直接返回true
     * 否则返回 PromiseSettledResult
     */
    off(key: unknown): PureEventOffResult {
        const event = this.events.get(key);
        if (event == null) {
            return false;
        }
        this.events.delete(key);
        if (event.onDispose == null) {
            return true;
        }
        return promise_try(event.onDispose);
    }
    /**
     * 清理所有的监听
     * 会返回所有被清理的事件的 key
     * 如果自定义了 移除监听器（onDispose）, 那么会在 disposeReturn 中携带结果
     */
    cleanSync(): {
        key: unknown;
        disposeReturn: undefined | Promise<PromiseSettledResult<unknown>>;
    }[] {
        const dels = iter_map_not_null(this.events, ([key, event]) => {
            this.events.delete(key);
            return ({ key, disposeReturn: event.onDispose ? promise_try(event.onDispose) : undefined });
        });
        return dels;
    }
    /**
     * 清理所有的监听，
     * 并等待所有的 disposeReturn 返回结果
     */
    async clean(): Promise<{
        key: unknown;
        disposeReturn: undefined | PromiseSettledResult<unknown>;
    }[]> {
        const dels = this.cleanSync();
        const results: {
            key: unknown;
            disposeReturn: undefined | PromiseSettledResult<unknown>;
        }[] = [];
        for (const del of dels) {
            const disposeReturn = await del.disposeReturn;
            results.push({ key: del.key, disposeReturn });
        }

        return results;
    }

    async emit(data: T) {
        if (this.size === 0) {
            return;
        }
        const errors: unknown[] = [];
        const results = await iter_map_async_try(
            this.events.values(),
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
    once(options?: PureEventOnceOptions<T>): PureEventOncePromiseWithResolvers<T>;
    once(cb?: null, options?: PureEventOnceOptions<T>): PureEventOncePromiseWithResolvers<T>;
    once(cb: PureEventFun<T>, options?: PureEventOnceOptions<T>): PureEventOff;
    once(cb_or_options?: PureEventFun<T> | PureEventOnceOptions<T> | null, options?: PureEventOnceOptions<T>) {
        let cb: PureEventFun<T> | undefined;
        if (typeof cb_or_options === "function") {
            cb = cb_or_options;
        } else if (cb_or_options != null) {
            options = cb_or_options;
        }

        const filter = options?.filter ?? (() => true);

        /// callback mode
        if (cb == null) {
            const onDispose = options?.onDispose;
            const off = this.on((data) => {
                if (filter(data)) {
                    promiseWithResolvers.resolve(data);
                    off();
                }
            }, {
                ...options,
                onDispose() {
                    if (false === resolved) {
                        promiseWithResolvers.reject(new Error("listener dispose"));
                    }
                    onDispose?.();
                },
            });

            const job = Promise.withResolvers<T>();
            let resolved = false;
            const promiseWithResolvers = Object.assign(job.promise, {
                resolve(data: T) {
                    resolved = true;
                    job.resolve(data);
                },
                reject(reason?: unknown) {
                    job.reject(reason);
                },
            });

            return promiseWithResolvers;
        }

        /// promise mode
        const off = this.on(async (data) => {
            if (filter(data)) {
                const disposeReturn = off();
                if (disposeReturn !== false) {
                    try {
                        return cb(data);
                    } finally {
                        if (disposeReturn instanceof Promise) {
                            await disposeReturn;
                        }
                    }
                }
            }
        }, options);
        return off as unknown;
    }
}

/**
 * PureEvent 的委托类，基于委托，可以实现更新委托内核
 *
 * @example
 * ```ts
 * const pevent_source = new PureEvent<string>()
 * const pevent_delegate = new PureEventDelegate<string>()
 * pevent_delegate.byPureEvent = pevent_source
 *
 * pevent_source.on((data) => console.log('by source', data))
 * pevent_delegate.on((data) => console.log('by delegate', data))
 *
 * pevent_source.emit('from source')
 * pevent_delegate.emit('from delegate')
 * ```
 */
export class PureEventDelegate<T> extends PureEvent<T> {
    constructor(public byPureEvent: PureEvent<T> = new PureEvent()) {
        super();
    }
}

obj_delegate_by<PureEvent<any>, PureEventDelegate<any>>(
    PureEventDelegate.prototype,
    PureEvent.prototype,
    (target) => target.byPureEvent,
);
