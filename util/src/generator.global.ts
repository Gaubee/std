import {curryThisFn, extendsMethod} from "./func.ts";
import {ag_done, ag_then, AGF} from "./generator.ts";

const done = curryThisFn(ag_done);
const then = curryThisFn(ag_then);

extendsMethod(AGF.prototype, "done", done);
extendsMethod(AGF.prototype, "then", then);

declare global {
  interface AsyncGenerator<T = unknown, TReturn = any, TNext = any> extends AsyncIteratorObject<T, TReturn, TNext> {
    done: typeof done;
    then: typeof then;
  }
}
