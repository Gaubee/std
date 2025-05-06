import { curryThisFn } from "@gaubee/util";
import {
    decimal,
    decimal_neg,
    DECIMAL_BASE,
    type DecimalAble,
    type DecimalRaw,
    setDefaultNegativeExponent,
    setDefaultPositiveExponent,
} from "../decimal.ts";
import { areEqual, endCheck, isNegativeZero } from "./test-helper.ts";
declare global {
    interface DecimalBase {
        neg(): DecimalRaw;
    }
}
DECIMAL_BASE.neg = curryThisFn(decimal_neg);
Deno.test("neg", function () {
    function t(expected: unknown, value: DecimalAble) {
        areEqual(expected, decimal(value).neg().toString());
    }

    setDefaultNegativeExponent(-7);
    setDefaultPositiveExponent(21);

    isNegativeZero(decimal("0").neg());
    isNegativeZero(decimal("-0").neg().neg());

    t("0", "0");
    t("-1", "1");
    t("-11.121", "11.121");
    t("0.023842", "-0.023842");
    t("1.19", "-1.19");
    t("-3838.2", "3838.2");
    t("-127", "127");
    t("4.23073", "-4.23073");
    t("2.5469", "-2.5469");
    t("-2.0685908346593874980567875e+25", "20685908346593874980567875");

    endCheck();
});
