import { curryThisFn } from "@gaubee/util";
import {
  decimal,
  DECIMAL_BASE,
  decimal_toNumber,
  type DecimalAble,
  setDefaultNegativeExponent,
  setDefaultPositiveExponent,
  setStrictMode
} from "../decimal.ts";
import {
  areEqual,
  endCheck,
  isException,
  isTrue
} from "./test-helper.ts";
declare global {
  interface DecimalBase {
    toNumber(): number
  }
}
DECIMAL_BASE.toNumber = curryThisFn(decimal_toNumber);
Deno.test('toNumber', function () {

  setDefaultNegativeExponent(-7)
  setDefaultPositiveExponent(21)
  //Big.strict = false;

  // Positive zero
  {
    const t = (value: DecimalAble) => {
      isTrue(1 / decimal(value).toNumber() === Infinity);
    };

    t(0);
    t('0');
    t('0.0');
    t('0.000000000000');
    t('0e+0');
    t('0e-0');
  }
  // Negative zero
  {
    const t = (value: DecimalAble) => {
      isTrue(1 / decimal(value).toNumber() === -Infinity);
    };

    t(-0);
    t('-0');
    t('-0.0');
    t('-0.000000000000');
    t('-0e+0');
    t('-0e-0');
  }
  {
    const t = (value: DecimalAble, expected: unknown) => {
      areEqual(decimal(value).toNumber(), expected);
    };

    t(0, 0);
    t(-0, -0);
    t('0', 0);
    t('-0', -0);

    t(1, 1);
    t('1', 1);
    t('1.0', 1);
    t('1e+0', 1);
    t('1e-0', 1);

    t(-1, -1);
    t('-1', -1);
    t('-1.0', -1);
    t('-1e+0', -1);
    t('-1e-0', -1);


    t('123.456789876543', 123.456789876543);
    t('-123.456789876543', -123.456789876543);

    t('1.1102230246251565e-16', 1.1102230246251565e-16);
    t('-1.1102230246251565e-16', -1.1102230246251565e-16);

    t('9007199254740991', 9007199254740991);
    t('-9007199254740991', -9007199254740991);

    t('5e-324', 5e-324);
    t('1.7976931348623157e+308', 1.7976931348623157e+308);

    t('0.00999', 0.00999);
    t('123.456789', 123.456789);
    t('1.23456789876543', 1.23456789876543);

    t(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);

    const n = '1.000000000000000000001';

    t(n, 1);

    setStrictMode(true)
    isException(function () { decimal(n).toNumber() }, "decimal(n).toNumber()");

    isException(function () { decimal(0).toNumber() }, "decimal(0).toNumber()");
    isException(function () { decimal(-0).toNumber() }, "decimal(-0).toNumber()");
    isException(function () { decimal(1).toNumber() }, "decimal(1).toNumber()");
    isException(function () { decimal(-1).toNumber() }, "decimal(-1).toNumber()");

    t('0', 0);
    t('-0', -0);
    t('1', 1);
    t('1.0', 1);
    t('1e+0', 1);
    t('1e-0', 1);
    t('-1', -1);
    t('-1.0', -1);
    t('-1e+0', -1);
    t('-1e-0', -1);

    t('123.456789876543', 123.456789876543);
    t('-123.456789876543', -123.456789876543);

    t('1.1102230246251565e-16', 1.1102230246251565e-16);
    t('-1.1102230246251565e-16', -1.1102230246251565e-16);

    t('9007199254740991', 9007199254740991);
    t('-9007199254740991', -9007199254740991);

    t('5e-324', 5e-324);
    t('1.7976931348623157e+308', 1.7976931348623157e+308);

    t('0.00999', 0.00999);
    t('123.456789', 123.456789);
    t('1.23456789876543', 1.23456789876543);
    setStrictMode(false)
  }

  endCheck()
});


