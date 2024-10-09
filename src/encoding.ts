/**
 * 将二进制转成 base64 字符串
 */
export const binary_to_base64_string = (u8a: Uint8Array): string => {
    // nodejs buffer
    if ("base64Slice" in u8a) {
        return (u8a as any).toString("base64");
    }

    // common u8a
    let binaryString = "";
    for (let i = 0; i < u8a.length; i++) {
        binaryString += binary_base64_table[u8a[i]];
    }
    return btoa(binaryString);
};
const binary_base64_table = Object.freeze(Array.from({ length: 256 }, (_, index) => {
    return String.fromCharCode(index);
}));

/**
 * 将二进制转成 hex(小写) 字符串
 */
export const binary_to_hex_string = (u8a: Uint8Array): string => {
    let binaryString = "";
    for (const byte of u8a) {
        binaryString += binary_hex_table[byte];
    }
    return binaryString;
};
const binary_hex_table = Object.freeze(Array.from({ length: 256 }, (_, index) => {
    return index.toString(16).padStart(2, "0");
}));

/**
 * 将二进制转成 utf8 字符串
 */
export const binary_to_utf8_string = (u8a: Uint8Array): string => {
    return d.decode(u8a);
};
const d = new TextDecoder();
/**
 * 将 base64 字符串转成二进制
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
 * 将 hex(小写) 字符串转成二进制
 */
export const str_to_hex_binary = (str: string): Uint8Array => {
    const uint8Array = new Uint8Array(str.length / 2);
    for (let i = 0; i < uint8Array.length; i++) {
        const str_index = i * 2;
        uint8Array[i] = hex_binary_table[str[str_index] + str[str_index + 1]];
    }
    return uint8Array;
};
const hex_binary_table = Object.freeze(
    Array.from({ length: 256 }).reduce((table: Record<string, number>, _, index) => {
        table[binary_hex_table[index]] = index;
        return table;
    }, {}),
);

/**
 * 将 utf8 字符串转成二进制
 */
export const str_to_utf8_binary = (str: string): Uint8Array => {
    return e.encode(str);
};
const e = new TextEncoder();
