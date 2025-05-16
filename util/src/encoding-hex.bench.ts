/**
 * v1 是 最简单的版本，但已经使用上了缓存技术
 * v2 是 deno 的 @std/encoding 的版本
 * v3 是 针对性优化版本，优化了缓存访问速度；同时增大了缓存的量
 *
 * CPU | 11th Gen Intel(R) Core(TM) i5-1135G7 @ 2.40GHz
 * Runtime | Deno 1.46.3 (x86_64-pc-windows-msvc)
 *
 * file:///D:/dev/GitHub/gaubee-util/src/encoding-hex.bench.ts
 *
 * benchmark                 time/iter (avg)        iter/s      (min … max)           p75      p99     p995
 * ------------------------- ----------------------------- --------------------- --------------------------
 * binary_to_hex_string_v1          728.7 ns     1,372,000 (636.3 ns …   1.0 µs) 749.1 ns   1.0 µs   1.0 µs
 * binary_to_hex_string_v2          705.8 ns     1,417,000 (622.7 ns … 882.4 ns) 724.0 ns 882.4 ns 882.4 ns
 * binary_to_hex_string_v3          352.9 ns     2,834,000 (305.8 ns … 697.5 ns) 355.2 ns 658.5 ns 697.5 ns
 * str_to_hex_binary_v1               3.1 µs       317,600 (  2.9 µs …   3.7 µs)   3.2 µs   3.7 µs   3.7 µs
 * str_to_hex_binary_v2               1.2 µs       825,100 (  1.1 µs …   1.7 µs)   1.2 µs   1.7 µs   1.7 µs
 * str_to_hex_binary_v3             616.1 ns     1,623,000 (488.9 ns …   1.0 µs) 647.2 ns   1.0 µs   1.0 µs
 *
 * 可以看到 v3 性能基本是比 v2 快一倍
 * 项目中还需要考虑到综合启动速度，所以会在 v3 的基础上，做一些惰性缓存，也即是第一次执行才会激活缓存
 */

const test_u8a = crypto.getRandomValues(new Uint8Array(70));
const test_hex = Array.from(test_u8a)
  .map((v) => v.toString(16).padStart(2, "0"))
  .join("");
Deno.bench("binary_to_hex_string_v1", () => {
  binary_to_hex_string_v1(test_u8a);
});
Deno.bench("binary_to_hex_string_v2", () => {
  binary_to_hex_string_v2(test_u8a);
});
Deno.bench("binary_to_hex_string_v3", () => {
  binary_to_hex_string_v3(test_u8a);
});
Deno.bench("str_to_hex_binary_v1", () => {
  str_to_hex_binary_v1(test_hex);
});
Deno.bench("str_to_hex_binary_v2", () => {
  str_to_hex_binary_v2(test_hex);
});
Deno.bench("str_to_hex_binary_v3", () => {
  str_to_hex_binary_v3(test_hex);
});
/**
 * 将二进制转成 hex(小写) 字符串
 */
const binary_to_hex_string_v1 = (u8a: Uint8Array): string => {
  let binaryString = "";
  for (const byte of u8a) {
    binaryString += binary_hex8_table[byte];
  }
  return binaryString;
};
const binary_hex8_table = Object.freeze(
  Array.from({length: 256}, (_, index) => {
    return index.toString(16).padStart(2, "0");
  }),
);

/**
 * 将二进制转成 hex(小写) 字符串
 */
const binary_to_hex_string_v3 = (u8a: Uint8Array): string => {
  let binaryString = "";
  const len = u8a.length;
  const end = len % 2 === 1 ? len - 1 : len;
  for (let i = 0; i < end; i += 2) {
    binaryString += binary_hex16_table[(u8a[i + 0] << 8) + u8a[i + 1]];
  }
  if (len !== end) {
    binaryString += binary_hex8_table[u8a[end]];
  }
  return binaryString;
};
const binary_hex16_table = Object.freeze(
  Array.from({length: 2 ** 16}, (_, index) => {
    return index.toString(16).padStart(4, "0");
  }),
);
/**
 * 将 hex(小写) 字符串转成二进制
 */
const str_to_hex_binary_v1 = (str: string): Uint8Array => {
  const uint8Array = new Uint8Array(str.length / 2);
  for (let i = 0; i < uint8Array.length; i++) {
    const str_index = i * 2;
    //uint8Array[i] =
    hex8_binary_table[str[str_index] + str[str_index + 1]];
  }
  return uint8Array;
};
const hex8_binary_table = Object.freeze(
  Array.from({length: 256}).reduce((table: Record<string, number>, _, index) => {
    table[binary_hex8_table[index]] = index;
    return table;
  }, {}),
);

/**
 * 将 hex(小写) 字符串转成二进制
 */
const str_to_hex_binary_v3 = (str: string): Uint8Array => {
  const uint8Array = new Uint8Array(str.length / 2);
  for (let i = 0; i < uint8Array.length; i++) {
    const str_index = i * 2;
    uint8Array[i] = hex8_binary_ver_table[str.charCodeAt(str_index)][str.charCodeAt(str_index + 1)];
    // hex8_binary_table[str[str_index] + str[str_index + 1]];
  }
  return uint8Array;
};
const hex8_binary_ver_table: number[][] = [];
for (let a = 0; a < 16; a++) {
  const bs: number[] = (hex8_binary_ver_table[a.toString(16).charCodeAt(0)] = []);
  for (let b = 0; b < 16; b++) {
    bs[b.toString(16).charCodeAt(0)] = (a << 4) + b;
  }
}

const hexTable = new TextEncoder().encode("0123456789abcdef");
const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

function binary_to_hex_string_v2(u8: Uint8Array): string {
  const dst = new Uint8Array(u8.length * 2);
  for (let i = 0; i < u8.length; i++) {
    const v = u8[i]!;
    dst[i * 2] = hexTable[v >> 4]!;
    dst[i * 2 + 1] = hexTable[v & 0x0f]!;
  }
  return textDecoder.decode(dst);
}
function str_to_hex_binary_v2(src: string): Uint8Array {
  const u8 = textEncoder.encode(src);
  const dst = new Uint8Array(u8.length / 2);
  for (let i = 0; i < dst.length; i++) {
    const a = fromHexChar(u8[i * 2]!);
    const b = fromHexChar(u8[i * 2 + 1]!);
    dst[i] = (a << 4) | b;
  }

  if (u8.length % 2 === 1) {
    // Check for invalid char before reporting bad length,
    // since the invalid char (if present) is an earlier problem.
    fromHexChar(u8[dst.length * 2]!);
    throw errLength(u8.length);
  }

  return dst;
}
/** Converts a hex character into its value. */
function fromHexChar(byte: number): number {
  // '0' <= byte && byte <= '9'
  if (48 <= byte && byte <= 57) return byte - 48;
  // 'a' <= byte && byte <= 'f'
  if (97 <= byte && byte <= 102) return byte - 97 + 10;
  // 'A' <= byte && byte <= 'F'
  if (65 <= byte && byte <= 70) return byte - 65 + 10;

  throw errInvalidByte(byte);
}
function errInvalidByte(byte: number) {
  return new TypeError(`Invalid byte '${String.fromCharCode(byte)}'`);
}

function errLength(len: number) {
  return new RangeError(`Cannot decode the hex string as the input length should be even: length is ${len}`);
}

if (import.meta.main) {
  console.log(binary_to_hex_string_v1(test_u8a));
  console.log(binary_to_hex_string_v2(test_u8a));
  console.log(binary_to_hex_string_v3(test_u8a));

  console.log(str_to_hex_binary_v1(test_hex));
  console.log(str_to_hex_binary_v2(test_hex));
  console.log(str_to_hex_binary_v3(test_hex));

  // for (const key in hex8_binary_table) {
  //     console.log(
  //         key,
  //         key.charCodeAt(0),
  //         key.charCodeAt(1),
  //         key.charCodeAt(0) + key.charCodeAt(1),
  //         key,
  //         hex8_binary_table[key],
  //     );
  // }
}
// 9 57
// a  96 % => 58
