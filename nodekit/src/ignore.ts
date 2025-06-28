import {normalizeFilePath} from "@gaubee/node";
import {globToRegExp} from "@std/path/glob-to-regexp";
import ignore from "ignore";
import {minimatch} from "minimatch";
import fs from "node:fs";
import node_path from "node:path";

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
  get rules(): readonly string[] {
    return Object.freeze(this.#rules.slice());
  }
  #isMatch;
  constructor(
    rules: string[],
    readonly cwd: string,
    option?: {style?: IgnoreStyle},
  ) {
    this.cwd = normalizeFilePath(cwd);
    this.#rules = rules;
    const style = option?.style ?? "git";

    if (style === "git") {
      const gitignore = ignore().add(rules);
      this.#isMatch = (relativepath: string) => {
        // The `ignore` library requires forward slashes
        const posixPath = relativepath.replace(/\\/g, "/");
        return gitignore.ignores(posixPath);
      };
    } else if (style === "npm") {
      this.#isMatch = (relativepath: string) => {
        return rules.some((rule) => minimatch(relativepath, rule, {dot: true, matchBase: true}));
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
  static fromIgnoreFile(filepath: string): Ignore {
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
    return new Ignore(rules, cwd, {style});
  }
  isMatch(filepath: string): boolean {
    filepath = normalizeFilePath(filepath);

    const relativepath = node_path.isAbsolute(filepath) ? node_path.relative(this.cwd, filepath) : filepath;

    // a path outside of cwd should not be ignored
    if (relativepath.startsWith("..")) {
      return false;
    }
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
