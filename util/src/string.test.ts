import { str_trim_indent } from "./string.ts";
import assert from "node:assert";

Deno.test("str_trim_indent", () => {
  assert.equal(
    str_trim_indent(`
            1111
           111
   
           11
           `),
    ` 1111
111

11`
  );
  assert.equal(str_trim_indent(`  `), ``);
  assert.equal(str_trim_indent(` 
    a
     `), `a`);
});
