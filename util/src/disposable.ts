import { obj_assign_props } from "./object.ts";
import { PureEvent, PureEventWithApply } from "./pure_event.ts";

// export class AsyncDisposable {
//     readonly disposer = pureEvent<void>();
//     [Symbol.asyncDispose]() {
//         return this.disposer.emit();
//     }
// }
// export const asyncDisposable = new AsyncDisposable();

export class Disposable extends PureEvent<void> {
    dispose() {
        return this.emit();
    }
    [Symbol.dispose]() {
        void this.emit();
    }
    [Symbol.asyncDispose]() {
        return this.emit();
    }
}

export type DisposableWithApply = PureEventWithApply<void> & Disposable;
export const disposable = (): DisposableWithApply => {
    const pe = new Disposable();
    const on = pe.on.bind(pe);
    Object.setPrototypeOf(on, Object.getPrototypeOf(pe));
    return obj_assign_props(on, pe);
};
