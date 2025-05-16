import assert from "node:assert";
import {decimal, decimal_round, decimal_toString} from "../../decimal/decimal.ts";
import {pipeline} from "../pipeline.ts";

Deno.test("pipeline", () => {
  const r = pipeline([
    // 这里三个子数组，每一个开头都是一个函数，后面是参数，参数由这个函数的第二个参数开始，而第一个参数，由上一个函数的返回值来提供
    [decimal],
    [decimal_round, 2],
    [decimal_toString],
  ]);
  assert.equal(r(12.345), 12.35);
});
