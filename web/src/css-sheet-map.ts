import { func_lazy, map_get_or_put } from "@gaubee/util";
import { type AdoptedStyleSheets, adoptedStyleSheets } from "./adopted-style-sheets.ts";

/**
 * 一个对 CSSStyleSheet 的再包装，使得注入的样式更容易被管理
 */
export class CssSheetMap {
    #ass;
    constructor(ass: AdoptedStyleSheets = adoptedStyleSheets) {
        this.#ass = ass;
    }
    get owner() {
        return this.#ass;
    }
    set owner(ass) {
        if (ass === this.#ass) {
            return;
        }
        this.#effect(false);
        this.#ass = ass;
    }

    #css = new CSSStyleSheet();
    #ruleMap = new Map<string, CSSRule>();
    #ruleList: CSSRule[] = [];
    setRule(selector: string, cssText: string) {
        cssText = cssText.trim();
        const ruleCssText = cssText.startsWith(selector) ? cssText : `${selector} {${cssText}}`;

        const oldRule = this.#ruleMap.get(selector);
        if (oldRule) {
            if (oldRule.cssText === ruleCssText || oldRule.cssText === formatCssText(ruleCssText)) {
                return;
            }
            const index = this.#ruleList.indexOf(oldRule);
            this.#css.deleteRule(index);
            this.#ruleList.splice(index, 1);
        }
        const index = this.#css.insertRule(ruleCssText, 0);
        const rule = this.#css.cssRules.item(index)!;
        this.#ruleMap.set(selector, rule);
        this.#ruleList.unshift(rule);
        this.#effect();
    }
    #effected = false;
    #effect(toggle = this.#effected) {
        if (toggle) {
            if (this.#effected && this.#css.cssRules.length === 0) {
                this.#ass.remove(this.#css);
                this.#effected = false;
            }
        } else {
            if (!this.#effected && this.#css.cssRules.length > 0) {
                this.#ass.push(this.#css);
                this.#effected = true;
            }
        }
    }
    deleteRule(selector: string) {
        const rule = this.#ruleMap.get(selector);
        if (!rule) {
            return;
        }
        const index = this.#ruleList.indexOf(rule);
        this.#css.deleteRule(index);
        this.#ruleList.splice(index, 1);
        this.#ruleMap.delete(selector);
        this.#effect();
    }

    setRules(rules: Record<string, string | CSSProperties>) {
        const selectors = Object.keys(rules);
        for (const selector of selectors) {
            let cssText = rules[selector];
            if (typeof cssText === "object") {
                cssText = formatStyle(cssText);
            }
            this.setRule(selector, cssText);
        }
        return (): void => {
            for (const selector of selectors) {
                this.deleteRule(selector);
            }
        };
    }

    #ref = new Map<string, Set<string | number>>();
    refRule(rid: string | number, selector: string, cssText: string | (() => string)) {
        const reasons = map_get_or_put(this.#ref, selector, () => {
            this.setRule(selector, typeof cssText === "function" ? cssText() : cssText);
            return new Set();
        });
        reasons.add(rid);
    }
    unrefRule(rid: string | number, selector: string) {
        const reasons = this.#ref.get(selector);
        if (reasons == null) {
            return;
        }
        if (reasons.delete(rid) && reasons.size === 0) {
            this.#ref.delete(selector);
            this.deleteRule(selector);
        }
    }
}
const ruleFormater = /*@__PURE__*/ new CSSStyleSheet();
const formatCssText = (cssText: string) => {
    ruleFormater.insertRule(cssText, 0);
    cssText = ruleFormater.cssRules.item(0)?.cssText ?? "";
    ruleFormater.deleteRule(0);
    return cssText;
};

type CSSProperties = Record<string, string>;
const formatStyle = func_lazy(() => {
    const styleMap = document.createElement("div").style;
    return (style: CSSProperties) => {
        styleMap.cssText = "";
        Object.assign(styleMap, style);
        return styleMap.cssText;
    };
});
