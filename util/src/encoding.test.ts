import {Buffer} from "node:buffer";
import {str_to_base64_binary, str_to_hex_binary, str_to_utf8_binary} from "./encoding.ts";
const base64_str = "68656c6c6f20776f726c64";
Deno.test("str_to_base64_binary", () => {
  assert.deepEqual(str_to_base64_binary(base64_str), new Uint8Array(Buffer.from(base64_str, "base64")));
});

const hex_str = "0123456789";
Deno.test("str_to_base64_binary", () => {
  assert.deepEqual(str_to_hex_binary(hex_str), new Uint8Array(Buffer.from(hex_str, "hex")));
});

const utf8_str = "hello world";
Deno.test("str_to_base64_binary", () => {
  assert.deepEqual(str_to_utf8_binary(utf8_str), new Uint8Array(Buffer.from(utf8_str, "utf8")));
});
