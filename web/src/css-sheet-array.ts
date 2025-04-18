import { type AdoptedStyleSheets, adoptedStyleSheets } from "./adopted-style-sheets.ts";

/**
 * 一个对 CSSStyleSheet 的再包装，使得注入的样式更容易被管理
 */
export class CssSheetArray {
    #ass: AdoptedStyleSheets | null;
    #effected = false;
    #effect(toggle = !this.#effected) {
        const ass = this.#ass;
        if (null == ass) {
            return;
        }
        if (toggle) {
            if (!this.#effected) {
                ass.push(this.#css);
                this.#effected = true;
            }
        } else {
            if (this.#effected) {
                ass.remove(this.#css);
                this.#effected = false;
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
    get owner(): AdoptedStyleSheets | null {
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
    get unsafeStyleSheet(): CSSStyleSheet {
        return this.#css;
    }
    /// 一个数组对象，用来提供 CSSRule 的索引
    #ruleList: CSSRule[] = [];
    get size(): number {
        return this.#ruleList.length;
    }
    /**
     * 插入一条 cssRule(selector + cssText)
     *
     * 注意，只能一条。如果有同时多条插入的需求，可以使用 addRules
     * 通常建议一条条地插入，可以省去解析成一条条 cssRule 的成本
     *
     * @param cssText
     * @param index 如果为空
     * @returns
     */
    addRule(cssText: string, index?: number): CSSRule | null {
        const css = this.#css;
        const ruleList = this.#ruleList;
        const oldLen = css.cssRules.length;
        css.insertRule(cssText, index ?? oldLen);
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
    /**
     * 插入多条
     * @param cssText
     * @param index
     */
    addRules(cssText: string, index?: number): CSSRule[] {
        ruleParser.replaceSync(cssText);
        const rules: CSSRule[] = [];
        for (let i = ruleParser.cssRules.length - 1; i >= 0; i--) {
            /** 是 push 模式。所以要正着 */
            rules[rules.length] = this.addRule(ruleParser.cssRules[i].cssText, index)!;
        }

        return index == null
            /** 是 push 模式。所以要正着 */
            ? rules
            /** 是 insert 模式。所以要倒着 */
            : rules.reverse();
    }
    removeRule(ruleOrIndex: CSSRule | number): boolean {
        let index: number;
        if (typeof ruleOrIndex === "number") {
            const rule = this.#ruleList[index = ruleOrIndex];
            if (rule == null) {
                return false;
            }
        } else {
            index = this.#ruleList.indexOf(ruleOrIndex);
            if (index === -1) {
                return false;
            }
        }

        this.#css.deleteRule(index);
        this.#ruleList.splice(index, 1);
        return true;
    }
    atRule(index: number): CSSRule | undefined {
        return this.#ruleList.at(index);
    }
    [Symbol.iterator](): ArrayIterator<CSSRule> {
        return this.#ruleList[Symbol.iterator]();
    }
    #idRuleMap = new Map<unknown, CSSRule>();
    keys(): MapIterator<unknown> {
        return this.#idRuleMap.keys();
    }
    hasRule(key: unknown): boolean {
        return this.#idRuleMap.has(key);
    }
    getRule(key: unknown): CSSRule | undefined {
        return this.#idRuleMap.get(key);
    }
    setRule(key: unknown, cssText: string, index?: number): CSSRule | null {
        this.deleteRule(key);
        const rule = this.addRule(cssText, index);
        if (rule) {
            this.#idRuleMap.set(key, rule);
        }
        return rule;
    }
    deleteRule(key: unknown): boolean {
        const oldRule = this.#idRuleMap.get(key);
        if (oldRule != null) {
            this.removeRule(oldRule);
            return true;
        }
        return false;
    }
}
const ruleParser = /*@__PURE__*/ new CSSStyleSheet();
