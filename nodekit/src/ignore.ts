import fs from "node:fs";
import node_path from "node:path";
import ignore from "ignore";
import { minimatch } from "minimatch";
import { globToRegExp } from "@std/path";
import { normalizeFilePath } from "./path.ts";

export type IgnoreStyle = "git" | "npm" | "glob" | "search";
/**
 * 一个文件匹配规范的工具，通常用于 排除文件，所以命名 Ignore
 * 否则建议您试用 @std/path 的 glob 相关的工具
 *
 * 支持以下几种排查风格：
 * - `glob`: [@std/path/globToRegExp](https://jsr.io/@std/path/doc/~/globToRegExp)
 * - `.gitignore`: [spec 2.22.1](http://git-scm.com/docs/gitignore)
 * - `.npmignore`: [minimatch](https://github.com/isaacs/minimatch#readme)
 * - `search`: [String.prototype.includes](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/includes)
 */
export class Ignore {
    #rules;
    get rules() {
        return Object.freeze(this.#rules.slice());
    }
    #isMatch;
    constructor(rules: string[], readonly cwd: string, option?: { style?: IgnoreStyle }) {
        this.cwd = normalizeFilePath(cwd);
        this.#rules = rules;
        const style = option?.style ?? "git";

        if (style === "git") {
            const gitignore = ignore.default().add(rules);
            this.#isMatch = (relativepath: string) => {
                return gitignore.ignores(relativepath);
            };
        } else if (style === "npm") {
            this.#isMatch = (relativepath: string) => {
                return rules.some((rule) => minimatch(relativepath, rule));
            };
        } else if (style === "search") {
            this.#isMatch = (relativepath: string) => {
                return rules.some((rule) => relativepath.includes(rule));
            };
        } else {
            const rule_reg_list = rules.map((rule) => globToRegExp(rule));
            this.#isMatch = (relativepath: string) => {
                return rule_reg_list.some((reg) => reg.test(relativepath));
            };
        }
    }
    static fromIgnoreFile(filepath: string) {
        filepath = normalizeFilePath(filepath);
        const rules = fs
            .readFileSync(filepath, "utf-8")
            .split("\n")
            .map((it) => it.trim())
            .filter((it) => !it.startsWith("#") && it.length > 0);
        const cwd = node_path.dirname(filepath);

        let style: IgnoreStyle = "glob";
        const filename = node_path.basename(filepath);
        if (filename.includes("npmignore")) style = "npm";
        else if (filename.includes("ignore")) style = "git";
        return new Ignore(rules, cwd, { style });
    }
    isMatch(filepath: string): boolean {
        filepath = normalizeFilePath(filepath);

        const relativepath = node_path.isAbsolute(filepath) ? node_path.relative(this.cwd, filepath) : filepath;
        return this.#isMatch(relativepath);
    }
}

// const reg = new IgnoreGlob(
//   [
//     //
//     "assets/*",
//     "!assets/zzz/",
//   ],
//   import.meta.resolve("./")
// );
// console.log(reg.isIgnore(path.resolve(reg.cwd, "assets/xzzz/a.js")));
