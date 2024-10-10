const base64_string = "68656c6c6f20776f726c64";
Deno.bench("str_to_base64_binary_v1", () => {
    str_to_base64_binary_v1(base64_string);
});
Deno.bench("str_to_base64_binary_v2", () => {
    str_to_base64_binary_v2(base64_string);
});
Deno.bench("str_to_base64_binary_v3", () => {
    str_to_base64_binary_v3(base64_string);
});
Deno.bench("str_to_base64_binary_v4", () => {
    str_to_base64_binary_v4(base64_string);
});

const str_to_base64_binary_v1 = (str: string): Uint8Array => {
    const binaryString = atob(str);
    const uint8Array = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        uint8Array[i] = binaryString.charCodeAt(i);
    }
    return uint8Array;
};
const encoder = new TextEncoder();
const str_to_base64_binary_v2 = (str: string): Uint8Array => {
    const binaryString = atob(str);
    const uint8Array = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        uint8Array[i] = base64_binary_table[binaryString[i]];
    }
    return uint8Array;
};
const base64_binary_table = Object.freeze(
    Array.from({ length: 256 }).reduce((table: Record<string, number>, _, index) => {
        table[String.fromCharCode(index)] = index;
        return table;
    }, {}),
);

const str_to_base64_binary_v3 = (str: string): Uint8Array => {
    const utf8_arr = encoder.encode(atob(str));
    const base64_arr: number[] = [];
    for (let i = 0, pos = 0; i < utf8_arr.length; i++) {
        const c = utf8_arr[i];
        if (c <= 127) {
            base64_arr[pos++] = c;
        } else if (c === 194) {
            base64_arr[pos++] = utf8_arr[++i];
        } else if (c === 195) {
            base64_arr[pos++] = utf8_arr[++i] + 64;
        }
    }
    return new Uint8Array(base64_arr);
};

const utf8_arr_v4_cache = new Uint8Array(1000);
const str_to_base64_binary_v4 = (str: string): Uint8Array => {
    const encodingResult = encoder.encodeInto(atob(str), utf8_arr_v4_cache);
    const base64_arr = new Uint8Array(encodingResult.read);
    for (let i = 0, pos = 0; i < encodingResult.written; i++) {
        const c = utf8_arr_v4_cache[i];
        if (c <= 127) {
            base64_arr[pos++] = c;
        } else if (c === 194) {
            base64_arr[pos++] = utf8_arr_v4_cache[++i];
        } else if (c === 195) {
            base64_arr[pos++] = utf8_arr_v4_cache[++i] + 64;
        }
    }
    return base64_arr;
};

// console.log(Object.keys(base64_binary_table));
// for (const key in base64_binary_table) {
//     console.log(key, base64_binary_table[key], Array.from(encoder.encode(key)));
// }
// console.log(encoder.encode(Object.keys(base64_binary_table).join("")));

// console.log(str_to_base64_binary_v1(base64_string));
// console.log(str_to_base64_binary_v2(base64_string));
// console.log(str_to_base64_binary_v3(base64_string));
// console.log(str_to_base64_binary_v4(base64_string));
