import { curryThisFn, extendsMethod } from "./func.ts";
import { str_reverse } from "./string.ts";

const reverse = curryThisFn(str_reverse);
extendsMethod(String.prototype, "reverse", reverse);

declare global {
    interface String {
        reverse(): string;
    }
}
