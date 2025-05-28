import {func_lazy, withEffect} from "@gaubee/util";

/**
 * 参考 [lionel-rowe/regexp-escape-polyfill](https://github.com/lionel-rowe/regexp-escape-polyfill/blob/main/escape.mjs) 的实现
 */
export const regexp_escape = withEffect(
  func_lazy(() => {
    const SYNTAX_CHARACTERS = /[\^$\\.*+?()[\]{}|]/;

    const CONTROL_ESCAPES = new Map([
      ["\t", "t"],
      ["\n", "n"],
      ["\v", "v"],
      ["\f", "f"],
      ["\r", "r"],
    ]);

    const OTHER_PUNCTUATORS = /^[,\-=<>#&!%:;@~'`"]$/;
    const WHITE_SPACE = /^[\t\v\f\uFEFF\p{Zs}]$/u;
    const LINE_TERMINATOR = /^[\n\r\u2028\u2029]$/;
    const SURROGATE = /^[\uD800-\uDFFF]$/;

    const DECIMAL_DIGIT = /^[0-9]$/;
    const ASCII_LETTER = /^[a-zA-Z]$/;

    /**
     * @param {string} c - A single code-point char.
     * @returns {string} the encoded representation of `c`.
     */
    const encodeForRegExpEscape = (c: string) => {
      if (SYNTAX_CHARACTERS.test(c) || c === "/") {
        return "\\" + c;
      }
      if (CONTROL_ESCAPES.has(c)) {
        return "\\" + CONTROL_ESCAPES.get(c);
      }

      if (OTHER_PUNCTUATORS.test(c) || WHITE_SPACE.test(c) || LINE_TERMINATOR.test(c) || SURROGATE.test(c)) {
        // deno-lint-ignore no-control-regex
        if (/[\x00-\xFF]/.test(c)) {
          return `\\x${c.charCodeAt(0).toString(16).padStart(2, "0")}`;
        }

        return c
          .split("")
          .map((c) => unicodeEscape(c))
          .join("");
      }
      return c;
    };

    /**
     * @param {string} c
     * @returns {string} the unicode escape of `c`.
     */
    const unicodeEscape = (c: string) => {
      return `\\u${c.charCodeAt(0).toString(16).padStart(4, "0")}`;
    };

    return (raw_string: string) => {
      if (typeof raw_string !== "string") {
        throw new TypeError("input argument must be a string");
      }
      let escaped = "";
      for (const c of raw_string) {
        if (escaped === "" && (DECIMAL_DIGIT.test(c) || ASCII_LETTER.test(c))) {
          escaped += `\\x${c.charCodeAt(0).toString(16).padStart(2, "0")}`;
        } else {
          escaped += encodeForRegExpEscape(c);
        }
      }
      return escaped;
    };
  }),
  (fn) => {
    Object.defineProperty(RegExp, "escape", {
      value: fn,
      writable: true,
      enumerable: false,
      configurable: true,
    });
  },
);
