// Add `test` to global scope.
export const write = console.log;
let count = 0,
  passed = 0;
import type {Func} from "@gaubee/util";
import {gray, green, red} from "@std/fmt/colors";
import type {DecimalRaw} from "../decimal.ts";

function fail(count: number, expected: unknown, actual: unknown) {
  write(red(`\n  [Test-${count}] failed${gray("\n  Expected: ")}${expected}${gray("\n  Actual:   ")}${actual}`));
  //process.exit();
}
function isBigZero(n: any) {
  return n && n.c && n.c.length === 1 && n.c[0] === 0 && n.e === 0 && (n.s === 1 || n.s === -1);
}

export const areEqual = function (expected: unknown, actual: unknown) {
  ++count;

  // If expected and actual are both NaN, consider them equal.
  if (expected === actual || (expected !== expected && actual !== actual)) {
    ++passed;
    //write('\n Expected and actual: ' + actual);
  } else {
    fail(count, expected, actual);
  }
};
export const isException = function (func: Func, msg: string) {
  let actual;
  ++count;
  try {
    func();
  } catch (e) {
    actual = e;
  }
  if (actual instanceof Error && /\[decimal\]/.test(actual.message)) {
    ++passed;
  } else {
    fail(count, `${msg} to raise an fail.`, actual || "no exception");
  }
};

export const isNegativeZero = function (actual: DecimalRaw) {
  ++count;
  if (isBigZero(actual) && actual.s === -1) {
    ++passed;
  } else {
    fail(count, "negative zero", actual);
  }
};

export const isPositiveZero = function (actual: DecimalRaw) {
  ++count;
  if (isBigZero(actual) && actual.s === 1) {
    ++passed;
  } else {
    fail(count, "positive zero", actual);
  }
};

export const isTrue = function (actual: unknown) {
  ++count;
  if (actual === true) {
    ++passed;
  } else {
    fail(count, "true", actual);
  }
};
export const endCheck = () => {
  if (passed === count) {
    write(green("all test passed"));
  } else {
    throw `${passed} of ${count} tests passed`;
  }
};
