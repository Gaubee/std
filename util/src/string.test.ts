import { str_human_space, str_human_trim, str_trim_indent } from "./string.ts";
import { curryThisFn } from "@gaubee/util";

Deno.test("str_trim_indent", () => {
    assert.equal(
        str_trim_indent(`
            1111
           111
   
           11
           `),
        ` 1111
111

11`,
    );
    assert.equal(str_trim_indent(`  `), ``);
    assert.equal(
        str_trim_indent(` 
    a
     `),
        `a`,
    );
});

Deno.test("str_human_trim", () => {
    // 基本空格测试
    assert.equal(str_human_trim("  hello  "), "hello");
    assert.equal(str_human_trim("\nhello\n"), "hello");
    assert.equal(str_human_trim("\r\nhello\r\n"), "hello");

    // 混合空格测试
    assert.equal(str_human_trim(" \n \r\n hello \n \r\n "), "hello");

    // Unicode空格测试
    assert.equal(str_human_trim("\u200B\u200Chello\u200D\u200E"), "hello");
    assert.equal(str_human_trim("\u2000hello\u2000"), "hello");

    // 空字符串测试
    assert.equal(str_human_trim(""), "");
    assert.equal(str_human_trim("   "), "");
    assert.equal(str_human_trim("\n\r\n\u200B"), "");

    // 测试所有定义的空格字符
    const allSpaces = [...str_human_space].join("");
    assert.equal(str_human_trim(allSpaces + "hello" + allSpaces), "hello");

    // 保留中间的空格
    assert.equal(str_human_trim("  hello  world  "), "hello  world");

    // 不同语言的文本测试
    assert.equal(str_human_trim("  Hello世界こんにちは  "), "Hello世界こんにちは");
});
