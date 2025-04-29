import { accessor, afterGetter, afterSetter, beforeGetter, beforeSetter, Class, field, getter, method, setter } from "./decorators.ts";
import { curryThisFn, func_remember, uncurryThisFn } from "./func.ts";
@Class((A, c) => {
    c.metadata;
    c.addInitializer(function () {
        console.log("initializer", "Class");
    });
    return class B extends A {
        constructor() {
            super();
            console.log("BBBBBBBB");
        }
    };
})
class A {
    constructor() {
        console.log("constructor", this.constructor.name);
    }
    @accessor(() => {
        return {};
    })
    accessor acc = 1;
    @field(() => {
        return function (v) {
            console.log("field~zzz", v);
            return v + 1;
        };
    })
    fie = 2;

    // @getter((_t, c, r) => {
    //     return curryThisFn(func_remember(c.access.get));
    // })
    @getter((get) => curryThisFn(func_remember(uncurryThisFn(get))))
    get qaq() {
        return crypto.randomUUID();
    }
    @getter((get) => func_remember(get))
    get zzz() {
        return crypto.randomUUID();
    }
    @beforeGetter<A, number>(console.log.bind(console, "getter.before"))
    @afterGetter(console.log.bind(console, "getter.after"))
    get uuu() {
        return 1;
    }
    @beforeSetter(console.log.bind(console, "setter.before"))
    @afterSetter(console.log.bind(console, "setter.after"))
    @setter(function (_z, _c) {})
    set uuu(v) {}

    @getter(function (_t, c) {
        c.addInitializer(function () {
            console.log("initializer mmm", this.fie);
        });
        return function (this: A) {
            // t()
            //   console.log("access.get", c.access.get(this));
            return 2;
        };
    })
    get #mmm() {
        console.log("get mmm");
        return 1;
    }
    set #mmm(v) {
        console.log("set mmm", v);
    }
    get mmm() {
        return this.#mmm;
    }
    @method(() => {
    })
    ccccA(_a: number) {
    }
}
if (import.meta.main) {
    console.log(A.name);
    const a = new A();
    // console.log("fie~xxx", Object.getOwnPropertyDescriptor(A.prototype, "fie"));
    // const b = new A();
    // console.log(a.qaq === a.qaq);
    // console.log(a.zzz === a.zzz);
    // a.uuu = 123;
    // a.uuu = 456;
    // a.uuu;
    // console.log("fie", a.fie, Object.getOwnPropertyDescriptor(a, "fie"));
    // a.fie = 100;
    // console.log("fie", a.fie, Object.getOwnPropertyDescriptor(a, "fie"));
    console.log(a.mmm);
}
