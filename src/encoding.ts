/**
 * 将二进制转成 base64 字符串
 */
export const binary_to_base64_string = (u8a: Uint8Array): string => {
    if ("base64Slice" in u8a) {
        return (u8a as any).toString("base64");
    }
    let binaryString = "";
    for (let i = 0; i < u8a.length; i++) {
        binaryString += String.fromCharCode(u8a[i]);
    }
    return btoa(binaryString);
};

/**
 * 将二进制转成 utf8 字符串
 */
export const binary_to_utf8_string = (u8a: Uint8Array): string => {
    return d.decode(u8a);
};
const d = new TextDecoder();
/**
 * 将base64 字符串转成二进制
 */
export const str_to_base64_binary = (str: string): Uint8Array => {
    const binaryString = atob(str);
    const uint8Array = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        uint8Array[i] = binaryString.charCodeAt(i);
    }
    return uint8Array;
};

/**
 * 将utf8 字符串转成二进制
 */
export const str_to_utf8_binary = (str: string): Uint8Array => {
    return e.encode(str);
};
const e = new TextEncoder();
