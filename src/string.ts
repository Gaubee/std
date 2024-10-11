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
