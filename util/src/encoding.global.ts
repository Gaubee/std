import {
    binary_to_base64_string,
    binary_to_hex_string,
    binary_to_utf8_string,
    str_to_hex_binary,
    str_to_utf8_binary,
} from "./encoding.ts";
import { curryThisFn, extendsGetter } from "./func.ts";

extendsGetter(String.prototype, "utf8Binary", curryThisFn(str_to_utf8_binary));
extendsGetter(String.prototype, "base64Binary", curryThisFn(str_to_utf8_binary));
extendsGetter(String.prototype, "hexBinary", curryThisFn(str_to_hex_binary));

extendsGetter(Uint8Array.prototype, "utf8String", curryThisFn(binary_to_utf8_string));
extendsGetter(Uint8Array.prototype, "base64String", curryThisFn(binary_to_base64_string));
extendsGetter(Uint8Array.prototype, "hexString", curryThisFn(binary_to_hex_string));

declare global {
    interface String {
        readonly utf8Binary: Uint8Array;
        readonly base64Binary: Uint8Array;
        readonly hexBinary: Uint8Array;
    }
    interface Uint8Array {
        readonly utf8String: string;
        readonly base64String: string;
        readonly hexString: string;
    }
}
