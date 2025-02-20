import { func_remember } from "./func.ts";

/**
 * 反转字符串
 */
export const str_reverse = (str: string): string => {
    let restr = "";
    /// 不能用 i++ < length 迭代，会有Unicode字符问题
    for (const char of str) {
        restr = char + restr;
    }
    return restr;
};

/**
 * 寻找字符串开头是否指定字符串，是的话，进行替换
 */
export const str_replace_start = (
    str: string,
    searchValue: string,
    replaceValue: string,
): string => {
    if (str.startsWith(searchValue)) {
        return replaceValue + str.slice(searchValue.length);
    }
    return str;
};

/**
 * 寻找字符串结尾是否指定字符串，是的话，进行替换
 */
export const str_replace_end = (
    str: string,
    searchValue: string,
    replaceValue: string,
): string => {
    if (str.endsWith(searchValue)) {
        return str.slice(0, -searchValue.length) + replaceValue;
    }
    return str;
};

export const str_trim_indent: (str: string) => string = (str: string) => {
    const lines = str.split("\n");
    let min = -1;
    const lines2 = lines.map((line) => {
        const line2 = line.trimStart();
        /// 寻找非空的
        if (line2.length !== 0) {
            const start_len = line.length - line2.length;
            if (min === -1) {
                min = start_len;
            } else {
                min = Math.min(min, start_len);
            }
            return line;
        }
        return line2;
    });
    if (min === -1) {
        return "";
    }
    if (min === 0) {
        return lines2.join("\n");
    }
    let result = "";
    for (const line of lines2) {
        // 如果已经有内容，那么要新增一行就要先加一个换行符
        if (result.length > 0) {
            result += "\n";
        }
        if (line.length > 0) {
            result += line.slice(min);
        }
    }
    return result.trimEnd();
};

/** 对于人类来说是空格的字符 */
export const str_human_space = new Set([
    "\u0020",
    "\u00A0",
    "\u1680",
    "\u2000",
    "\u200B",
    "\u200C",
    "\u200D",
    "\u200E",
    "\u200F",
    "\u202A",
    "\u000A",
    "\u000D",
    "\u2028",
    "\u2029",
]);

// 创建一个正则表达式字符串，使用 Set 中的字符
export const human_space_regex = func_remember(() => {
    const pattern = [...str_human_space].map((ch) => ch.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
    return {
        start: new RegExp(`^(?:${pattern})+`),
        end: new RegExp(`(?:${pattern})+$`),
        all: new RegExp(`(?:${pattern})+`, "g"),
    };
});

export const str_human_trim = (str: string): string => {
    const regex = human_space_regex();
    return str.replace(regex.start, "").replace(regex.end, "");
};
