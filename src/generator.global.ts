import { ag_done, ag_then, AGF } from "./generator.ts";
import { curryThisFn, extendsMethod } from "./func.ts";

const done = curryThisFn(ag_done);
const then = curryThisFn(ag_then);

extendsMethod(AGF.prototype, "done", done);
extendsMethod(AGF.prototype, "then", then);

declare global {
    interface AsyncGenerator<T = unknown, TReturn = any, TNext = unknown> extends AsyncIterator<T, TReturn, TNext> {
        done: typeof done;
        then: typeof then;
    }
}
