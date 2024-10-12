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
export const str_replace_start = (str: string, searchValue: string, replaceValue: string): string => {
    if (str.startsWith(searchValue)) {
        return replaceValue + str.slice(searchValue.length);
    }
    return str;
};

/**
 * 寻找字符串结尾是否指定字符串，是的话，进行替换
 */
export const str_replace_end = (str: string, searchValue: string, replaceValue: string): string => {
    if (str.endsWith(searchValue)) {
        return str.slice(0, -searchValue.length) + replaceValue;
    }
    return str;
};
