import { curryThisFn, extendsMethod } from "./func.ts";
import { obj_omit, obj_pick } from "./object.ts";

const pick = curryThisFn(obj_pick);
const omit = curryThisFn(obj_omit);

extendsMethod(Object.prototype, "pick", pick);
extendsMethod(Object.prototype, "omit", omit);

declare global {
    interface Object {
        pick: typeof pick;
        omit: typeof omit;
    }
}
