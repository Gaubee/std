import { iter_map_async } from "./collections.ts";
import type { Func } from "./func.ts";
import { iter_map_not_null } from "./index.ts";
import { promise_try } from "./promise.ts";

/** PureEvent 的监听函数定义 */
export type PureEventFun<T> = (data: T) => unknown;
type PureEventOffResult = boolean | Promise<PromiseSettledResult<unknown>>;
/** PureEvent 移除监听函数定义 */
export type PureEventOff = () => PureEventOffResult;
/** PureEvent 监听函数可选参数 */
export type PureEventListenOptions = {
    /** 自定义事件索引 */
    key?: unknown;
    /** 销毁事件时的自定义函数 */
    onDispose?: Func;
};

/**
 * 一个极简的事件监听器
 *
 * 对异步与错误捕捉有着一流的支持
 *
 * 可自定义移除事件时的触发器
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
        const results = await iter_map_async(
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
    once(cb?: null): Promise<T> & { resolve(data: T): void; reject(reason?: unknown): void };
    once(cb: PureEventFun<T>): PureEventOff;
    once(cb?: PureEventFun<T> | null) {
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
}

/**
 * PureEvent 的委托类，基于委托，可以实现更新委托内核
 */
export class PureEventDelegate<T> implements PureEvent<T> {
    constructor(public byPureEvent: PureEvent<T>) {}
    get events(): PureEvent<T>["events"] {
        return this.byPureEvent.events;
    }
    get size(): PureEvent<T>["size"] {
        throw new Error("Method not implemented.");
    }
    get emit(): PureEvent<T>["emit"] {
        return this.byPureEvent.emit;
    }
    get on(): PureEvent<T>["on"] {
        return this.byPureEvent.on;
    }
    get once(): PureEvent<T>["once"] {
        return this.byPureEvent.once;
    }
    get has(): PureEvent<T>["has"] {
        return this.byPureEvent.has;
    }
    get off(): PureEvent<T>["off"] {
        return this.byPureEvent.off;
    }
    get clean(): PureEvent<T>["clean"] {
        return this.byPureEvent.clean;
    }
    get cleanSync(): PureEvent<T>["cleanSync"] {
        return this.byPureEvent.cleanSync;
    }
}
