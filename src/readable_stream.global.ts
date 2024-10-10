import { extendsMethod } from "./func.ts";
import { rs_with_controller } from "./readable_stream.ts";

extendsMethod(ReadableStream, "withController", rs_with_controller);

declare global {
    /**
     * @WARN 目前 ReadableStream 在类型上还不支持被扩展
     * 这里只是根据常规习惯进行扩展，希望ts官方未来能支持
     */
    interface ReadableStreamContructor {
        withController: typeof rs_with_controller;
    }
}
