import { curryThisFn, extendsMethod } from "./func.ts";
import { str_replace_end, str_replace_start, str_reverse } from "./string.ts";

const reverse = curryThisFn(str_reverse);
extendsMethod(String.prototype, "reverse", reverse);

const replaceStart = curryThisFn(str_replace_start);
extendsMethod(String.prototype, "replaceStart", replaceStart);
const replaceEnd = curryThisFn(str_replace_end);
extendsMethod(String.prototype, "replaceEnd", replaceEnd);

declare global {
    interface String {
        reverse: typeof reverse;
        replaceStart: typeof replaceStart;
        replaceEnd: typeof replaceEnd;
    }
}
