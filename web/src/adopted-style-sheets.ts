import { map_get_or_put } from "@gaubee/util";
import { func_remember } from "@gaubee/util";

export const assMapWM = /*@__PURE__*/ new WeakMap<CSSStyleSheet[], Map<string, CSSStyleSheet>>();

export type AdoptedStyleSheets = (CSSStyleSheet[]) & {
    // 扩展数组
    remove: (item: CSSStyleSheet) => void;
    toggle: (item: CSSStyleSheet, enable?: boolean) => void;
    replace: (oldItem: CSSStyleSheet | null | undefined, newItem: CSSStyleSheet) => void;

    // 扩展Map-like的操作
    has: (name: string) => boolean;
    set: (name: string, item: CSSStyleSheet) => void;
    delete: (name: string) => void;
    get: (name: string) => CSSStyleSheet | undefined;
};
/**
 * 一个 adoptedStyleSheets 的垫片实现
 */
/*@__NO_SIDE_EFFECTS__*/
export const createAdoptedStyleSheets = (
    root: { adoptedStyleSheets: CSSStyleSheet[] } = document,
): AdoptedStyleSheets => {
    let dirty = false;
    const emitChange = () => {
        if (dirty) {
            return;
        }
        dirty = true;
        queueMicrotask(() => {
            dirty = false;
            // deno-lint-ignore no-self-assign
            root.adoptedStyleSheets = root.adoptedStyleSheets;
        });
    };
    const buildEmitBind = (method: string) => (...args: any[]) => {
        const res = (root.adoptedStyleSheets as any)[method].apply(root.adoptedStyleSheets, args);
        emitChange();
        return res;
    };
    const push = buildEmitBind("push");
    const pop = buildEmitBind("pop");
    const shift = buildEmitBind("shift");
    const unshift = buildEmitBind("unshift");
    const splice = buildEmitBind("splice");
    const remove = (item: CSSStyleSheet) => {
        const index = root.adoptedStyleSheets.indexOf(item);
        if (index !== -1) {
            root.adoptedStyleSheets.splice(index, 1);
            emitChange();
        }
    };

    const getMap = func_remember(() => map_get_or_put(assMapWM, root.adoptedStyleSheets, () => new Map()));
    const map_has = (name: string) => getMap().has(name);
    const map_set = (name: string, item: CSSStyleSheet) => {
        const map = getMap();
        const oldItem = map.get(name);
        if (oldItem !== item) {
            replace(oldItem, item);
            map.set(name, item);
        }
    };
    const map_delete = (name: string) => {
        const map = getMap();
        const oldItem = map.get(name);
        if (oldItem != null) {
            remove(oldItem);
            return true;
        }
        return false;
    };
    const map_get = (name: string) => getMap().get(name);
    const toggle = (item: CSSStyleSheet, enable?: boolean) => {
        const hasItem = root.adoptedStyleSheets.includes(item);
        if (enable === false) {
            if (hasItem) {
                remove(item);
            }
        } else if (enable) {
            if (!hasItem) {
                root.adoptedStyleSheets.push(item);
                emitChange();
            }
        } else {
            if (hasItem) {
                remove(item);
            } else {
                root.adoptedStyleSheets.push(item);
                emitChange();
            }
        }
    };

    const replace = (oldItem: CSSStyleSheet | null | undefined, newItem: CSSStyleSheet) => {
        if (oldItem == null) {
            root.adoptedStyleSheets.push(newItem);
            emitChange();
        } else {
            const index = root.adoptedStyleSheets.indexOf(oldItem);
            if (index !== -1) {
                root.adoptedStyleSheets.splice(index, 1, newItem);
                emitChange();
            }
        }
    };

    const methods = new Map<string | symbol, Function>(
        [
            ["push", push],
            ["pop", pop],
            ["shift", shift],
            ["unshift", unshift],
            ["splice", splice],
            // 扩展数组
            ["remove", remove],
            ["toggle", toggle],
            ["replace", replace],
            // 扩展Map-like的操作
            ["has", map_has],
            ["set", map_set],
            ["delete", map_delete],
            ["get", map_get],
        ] as const,
    );

    return new Proxy(root.adoptedStyleSheets, {
        get(target, prop, rec) {
            return methods.get(prop) || Reflect.get(target, prop, rec);
        },
    }) as any;
};
export const adoptedStyleSheets: AdoptedStyleSheets = /*@__PURE__*/ createAdoptedStyleSheets();
