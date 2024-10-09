const str = "0123456789";
const times = 10000;
Deno.bench("string slice", () => {
    let res = "";
    for (let i = 0; i < times; i++) {
        res += str.slice(0, 2);
        res += str.slice(8, 10);
    }
});
Deno.bench("string [i]+[i+1]", () => {
    const str = "0123456789";
    let res = "";
    for (let i = 0; i < times; i++) {
        res += str[0] + str[0 + 1];
        res += str[8] + str[8 + 1];
    }
});
import { Buffer } from "node:buffer";
import { str_to_hex_binary } from "./encoding.ts";
const hex_string = "0123456789";
Deno.bench("Buffer.from hex", () => {
    // new Uint8Array(Buffer.from(hex_string, "hex").subarray());
    new Uint8Array(5);
});
Deno.bench("str_to_hex_binary", () => {
    str_to_hex_binary(hex_string);
});
