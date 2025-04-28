import type { PureEvent, PureEventFun, PureEventListenOptions, PureEventOff } from "@gaubee/util";
import { SharedFlow } from "./shared_flow.ts";

export type StateFlowListenOptions = PureEventListenOptions & {
    /** 监听的时候，是否立即执行 */
    immediate?: boolean;
};
/**
 * 带状态机的 SharedFlow
 */
export class StateFlow<T> extends SharedFlow<T> {
    constructor(initialValue: T, by?: PureEvent<T>) {
        super(by);
        this.#value = initialValue;
    }
    #value;
    get value(): T {
        return this.#value;
    }
    set value(value: T) {
        this.emit(value);
    }
    /**
     * 附加监听
     * 同 watch
     * @deprecated 使用 watch
     */
    override on(cb: PureEventFun<T>, options?: StateFlowListenOptions): PureEventOff {
        return this.watch(cb, options);
    }
    /**
     * 附加监听
     * 可以自定义唯一索引 key，如果重复，会移除之前的监听
     */
    override watch(cb: PureEventFun<T>, options?: StateFlowListenOptions): PureEventOff {
        // 订阅时立即发送当前值
        if (options?.immediate) {
            cb(this.#value);
        }
        return super.watch(cb, options);
    }
    watchImmediate(cb: PureEventFun<T>, options?: PureEventListenOptions): PureEventOff {
        return this.watch(cb, { ...options, immediate: true });
    }
    override emit(value: T): Promise<void> {
        if (this.#value !== value) {
            this.#value = value;
            super.emit(value);
        }
        return Promise.resolve();
    }
}

export const stateFlow = <T>(initialValue: T, by?: PureEvent<T>): StateFlow<T> => new StateFlow(initialValue, by);
