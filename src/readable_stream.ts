import { SharedFlow } from "./shared_flow.ts";
import { obj_lazify } from "./object.ts";

export interface ReadableDefaultStreamWithController<R> {
    stream: ReadableStream<R>;
    controller: ReadableStreamDefaultController<R>;
    onPull: SharedFlow<void>;
    onCancel: SharedFlow<any>;
}
export interface ReadableByteStreamWithController {
    stream: ReadableStream<Uint8Array>;
    controller: ReadableByteStreamController;
    onPull: SharedFlow<void>;
    onCancel: SharedFlow<any>;
}
interface ReadableByteWithController {
    <R>(strategy?: QueuingStrategy<R> & { type?: undefined }): ReadableDefaultStreamWithController<R>;
    (strategy?: QueuingStrategy<Uint8Array> & { type: "bytes" }): ReadableByteStreamWithController;
}
/**
 * 一个易用的 ReadableStream 构造函数
 * - 直接暴露了 controller 对象
 * - pull/cancel 使用 SharedFlow 来暴露
 * @param strategy
 * @returns
 */
const withController: ReadableByteWithController = <R>(strategy?: QueuingStrategy<R> & { type?: "bytes" }) => {
    const result = obj_lazify<any>({
        get onPull() {
            return new SharedFlow();
        },
        get onCancel() {
            return new SharedFlow();
        },
    });
    result.stream = new ReadableStream({
        start(controller) {
            result.controller = controller;
        },
        pull() {
            result.onPull.emit();
        },
        cancel(reason) {
            result.onCancel.emit(reason);
        },
        type: strategy?.type,
    }, strategy);
    return result;
};
export { withController as rs_with_controller };
