import { curryThisFn, extendsMethod } from "./func.ts";
import { obj_all_descriptors, obj_assign_props, obj_delegate_by, obj_omit, obj_pick, obj_pick_as } from "./object.ts";

const pick = curryThisFn(obj_pick);
const pickAs = curryThisFn(obj_pick_as);
const omit = curryThisFn(obj_omit);
const delegateBy = curryThisFn(obj_delegate_by);

extendsMethod(Object.prototype, "pick", pick);
extendsMethod(Object.prototype, "pickAs", pickAs);
extendsMethod(Object.prototype, "omit", omit);
extendsMethod(Object.prototype, "delegateBy", delegateBy);
extendsMethod(Reflect, "getOwnPropertyDescriptors", obj_all_descriptors);
extendsMethod(Object, "assignProperties", obj_assign_props);

declare global {
    interface Object {
        pick: typeof pick;
        pickAs: typeof pickAs;
        omit: typeof omit;
        delegateBy: typeof delegateBy;
    }
    interface ObjectConstructor {
        assignProperties: typeof obj_assign_props;
    }
    namespace Reflect {
        const getOwnPropertyDescriptors: typeof obj_all_descriptors;
    }
}
