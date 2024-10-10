import { obj_lazify } from "./object.ts";

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
    const len = u8a.length;
    const end = (len % 2 === 1) ? len - 1 : len;
    const binary_hex16_table = binary_hex_table.hex16;
    for (let i = 0; i < end; i += 2) {
        binaryString += binary_hex16_table[(u8a[i + 0] << 8) + u8a[i + 1]];
    }
    if (len !== end) {
        binaryString += binary_hex_table.hex8[u8a[end]];
    }
    return binaryString;
};
const binary_hex_table = obj_lazify({
    get hex16() {
        return Object.freeze(Array.from({ length: 2 ** 16 }, (_, index) => {
            return index.toString(16).padStart(4, "0");
        }));
    },
    get hex8() {
        return Object.freeze(Array.from({ length: 256 }, (_, index) => {
            return index.toString(16).padStart(2, "0");
        }));
    },
});

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
        // 使用 charCodeAt 会比 hash 索引更快
        uint8Array[i] = binaryString.charCodeAt(i);
    }
    return uint8Array;
};

/**
 * 将 hex(小写) 字符串转成二进制
 */
export const str_to_hex_binary = (str: string): Uint8Array => {
    const uint8Array = new Uint8Array(str.length / 2);
    const hex8_binary_table = hex_binary_table.hex8;
    for (let i = 0; i < uint8Array.length; i++) {
        const str_index = i * 2;
        uint8Array[i] = hex8_binary_table[str.charCodeAt(str_index)][str.charCodeAt(str_index + 1)];
    }
    return uint8Array;
};
const hex_binary_table = obj_lazify({
    get hex8() {
        const hex8_binary_ver_table: number[][] = [];
        for (let a = 0; a < 16; a++) {
            const bs: number[] = hex8_binary_ver_table[a.toString(16).charCodeAt(0)] = [];
            for (let b = 0; b < 16; b++) {
                bs[b.toString(16).charCodeAt(0)] = (a << 4) + b;
            }
            Object.freeze(bs);
        }
        return Object.freeze(hex8_binary_ver_table);
    },
});

/**
 * 将 utf8 字符串转成二进制
 */
export const str_to_utf8_binary = (str: string): Uint8Array => {
    return e.encode(str);
};
const e = new TextEncoder();
