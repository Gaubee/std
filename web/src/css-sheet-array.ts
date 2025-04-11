import { type AdoptedStyleSheets, adoptedStyleSheets } from "./adopted-style-sheets.ts";

/**
 * 一个对 CSSStyleSheet 的再包装，使得注入的样式更容易被管理
 */
export class CssSheetArray {
    #ass: AdoptedStyleSheets | null;
    #effected = false;
    #effect(toggle = this.#effected) {
        const ass = this.#ass;
        if (null == ass) {
            return;
        }
        if (toggle) {
            if (this.#effected && this.#css.cssRules.length === 0) {
                ass.remove(this.#css);
                this.#effected = false;
            }
        } else {
            if (!this.#effected && this.#css.cssRules.length > 0) {
                ass.push(this.#css);
                this.#effected = true;
            }
        }
    }
    constructor(ass: AdoptedStyleSheets | null = adoptedStyleSheets) {
        this.#ass = ass;
        this.#effect();
    }
    /**
     * CSSStyleSheet 所附加的 AdoptedStyleSheets 目标
     * 设为 null 可以移除附加，使得 CSSStyleSheet 失效
     */
    get owner() {
        return this.#ass;
    }
    set owner(ass) {
        if (ass === this.#ass) {
            return;
        }
        this.#effect(false);
        this.#ass = ass ?? null;
    }

    #css = new CSSStyleSheet();
    /// 一个数组对象，用来提供 CSSRule 的索引
    #ruleList: CSSRule[] = [];
    get size() {
        return this.#ruleList.length;
    }
    addRule(cssText: string, index?: number) {
        const css = this.#css;
        const ruleList = this.#ruleList;
        const oldLen = css.cssRules.length;
        css.insertRule(cssText, index);
        if (oldLen !== css.cssRules.length) {
            const rule = css.cssRules.item(index ?? oldLen)!;
            if (index == null) {
                ruleList.push(rule);
            } else if (index === 0) {
                ruleList.unshift(rule);
            } else {
                ruleList.splice(index, 0, rule);
            }

            return rule;
        }
        return null;
    }
    removeRule(ruleOrIndex: CSSRule | number) {
        let index: number;
        if (typeof ruleOrIndex === "number") {
            const rule = this.#ruleList[index = ruleOrIndex];
            if (rule == null) {
                return;
            }
        } else {
            index = this.#ruleList.indexOf(ruleOrIndex);
            if (index === -1) {
                return;
            }
        }

        this.#css.deleteRule(index);
        this.#ruleList.splice(index, 1);
    }
    getRule(index: number) {
        return this.#ruleList[index];
    }
    [Symbol.iterator]() {
        return this.#ruleList[Symbol.iterator]();
    }
    #idRuleMap = new Map<unknown, CSSRule>();
    keys() {
        return this.#idRuleMap.keys();
    }
    hasRule(key: unknown) {
        return this.#idRuleMap.has(key);
    }
    setRule(key: unknown, cssText: string, index?: number) {
        this.deleteRule(key);
        const rule = this.addRule(cssText, index);
        if (rule) {
            this.#idRuleMap.set(key, rule);
        }
        return rule;
    }
    deleteRule(key: unknown) {
        const oldRule = this.#idRuleMap.get(key);
        if (oldRule != null) {
            this.removeRule(oldRule);
            return true;
        }
        return false;
    }
}
