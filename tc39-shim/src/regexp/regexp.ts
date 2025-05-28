/**
 * Checks if the `RegExp.escape` method is supported.
 * @see https://caniuse.com/mdn-javascript_builtins_regexp_escape
 * - Chrome: 136+
 * - Safari: 18.2+
 */
export const caniuseRegexpEscape = "escape" in RegExp;
import {regexp_escape as native_regexp_escape} from "./regexp.native.ts";
import {regexp_escape as shim_regexp_escape} from "./regexp.shim.ts";

export const regexp_escape = caniuseRegexpEscape ? native_regexp_escape : shim_regexp_escape;
