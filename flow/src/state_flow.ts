import type { PureEvent } from "@gaubee/util/pure_event";
import { SharedFlow } from "./shared_flow.ts";

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
    override emit(value: T): Promise<void> {
        if (this.#value !== value) {
            this.#value = value;
            super.emit(value);
        }
        return Promise.resolve();
    }
}
