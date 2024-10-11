import { curryThisFn, extendsMethod } from "./func.ts";
import { obj_omit, obj_pick, obj_pick_as } from "./object.ts";

const pick = curryThisFn(obj_pick);
const pickAs = curryThisFn(obj_pick_as);
const omit = curryThisFn(obj_omit);

extendsMethod(Object.prototype, "pick", pick);
extendsMethod(Object.prototype, "pickAs", pickAs);
extendsMethod(Object.prototype, "omit", omit);

declare global {
    interface Object {
        pick: typeof pick;
        pickAs: typeof pickAs;
        omit: typeof omit;
    }
}
