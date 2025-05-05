/**
 * 基于 big.js v7.0.1，参考 decimal 提案，提供面向未来的 decimal 类型。
 * A small, fast, easy-to-use library for arbitrary-precision decimal arithmetic.
 */

/************************************** EDITABLE DEFAULTS *****************************************/

// Error messages.
const NAME = "[decimal] ";
const INVALID = `${NAME}Invalid `;
const INVALID_DP = `${INVALID}decimal places`;
const INVALID_RM = `${INVALID}rounding mode`;
const DIV_BY_ZERO = `${NAME}Division by zero`;
const UNDEFINED = void 0;
const NUMERIC = /^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;
/**
 * The maximum number of decimal places (DP) of the results of operations involving division:
 * div and sqrt, and pow with negative exponents.
 */
const DecimalPlaces_MAX_DP = 1E6;
const DecimalPlaces_MIN_DP = -1E6;
export let defaultDecimalPlaces: number = 20;
export const setDefaultDecimalPlaces = (dp: number) => {
    defaultDecimalPlaces = dp;
};

/**
 * The maximum magnitude of the exponent argument to the pow method.
 */
const DecimalExponent_MAX_POWER = 1E6; // 1 to 1000000
const DecimalExponent_MIN_POWER = -1E6;
/**
 * The negative exponent (NE) at and beneath which toString returns exponential notation.
 * (JavaScript numbers: -7)
 * -1000000 is the minimum recommended exponent value of a Big.
 */
export let defaultNegativeExponent: number = -7;
export const setDefaultNegativeExponent = (ne: number) => {
    defaultNegativeExponent = ne;
};
/**
 * The positive exponent (PE) at and above which toString returns exponential notation.
 * (JavaScript numbers: 21)
 * 1000000 is the maximum recommended exponent value of a Big, but this limit is not enforced.
 */
export let defaultPositiveExponent: number = 21;
export const setDefaultPositiveExponent = (pe: number) => {
    defaultPositiveExponent = pe;
};
/**
 * The rounding mode (RM) used when rounding to the above decimal places.
 *
 *  0  Towards zero (i.e. truncate, no rounding).       (ROUND_DOWN)
 *  1  To nearest neighbour. If equidistant, round up.  (ROUND_HALF_UP)
 *  2  To nearest neighbour. If equidistant, to even.   (ROUND_HALF_EVEN)
 *  3  Away from zero.                                  (ROUND_UP)
 */
export enum DecimalRoundingMode {
    ROUND_DOWN = 0,
    ROUND_HALF_UP = 1,
    ROUND_HALF_EVEN = 2,
    ROUND_UP = 3,
}
export let defaultDecimalRoundingMode = DecimalRoundingMode.ROUND_HALF_UP;
export const setDefaultDecimalRoundingMode = (rm: DecimalRoundingMode) => {
    defaultDecimalRoundingMode = rm;
};

/**
 * The positive exponent (PE) at and above which toString returns exponential notation.
 * (JavaScript numbers: 21)
 * 1000000 is the maximum recommended exponent value of a Big, but this limit is not enforced.
 */
export const DecimalPositiveExponent = 21;

export let enableStrictMode = false;
export const setStrictMode = (enable: boolean) => {
    enableStrictMode = enable;
};

/**
 * the decimal raw value
 */
export interface DecimalRaw extends DecimalBase {
    /** 符号 */
    s: number;
    /** 小数点的位置 */
    e: number;
    /** 原始值 */
    c: number[];
}
declare global {
    /**
     * the decimal proto type
     */
    interface DecimalBase {
        [Symbol.toStringTag]: string;
    }
}
export const DECIMAL_BASE = {
    [Symbol.toStringTag]: "Decimal",
} as DecimalBase;

/**
 * Parse the number or string value passed to a Big constructor.
 *
 * x {Big} A Big number instance.
 * n {number|string} A numeric value.
 */
const parse = (x: DecimalRaw, n: string) => {
    let e;
    let i;
    let nl;

    if (!NUMERIC.test(n)) {
        throw Error(`${INVALID}number`);
    }

    // Determine sign.
    x.s = n.charAt(0) === "-" ? (n = n.slice(1), -1) : 1;

    // Decimal point?
    e = n.indexOf(".");
    if (e > -1) n = n.replace(".", "");

    // Exponential form?
    i = n.search(/e/i);
    if (i > 0) {
        // Determine exponent.
        if (e < 0) e = i;
        e += +n.slice(i + 1);
        n = n.substring(0, i);
    } else if (e < 0) {
        // Integer.
        e = n.length;
    }

    nl = n.length;

    // Determine leading zeros.
    for (i = 0; i < nl && n.charAt(i) === "0";) ++i;

    if (i === nl) {
        // Zero.
        x.e = 0;
        x.c = [0];
    } else {
        // Determine trailing zeros.
        while (nl > 0 && n.charAt(--nl) === "0");
        x.e = e - i - 1;
        x.c = [];

        // Convert string to array of digits without leading/trailing zeros.
        for (e = 0; i <= nl;) x.c[e++] = +n.charAt(i++);
    }

    return x;
};
const arr_slice = Array.prototype.slice;
export type DecimalAble = number | string | bigint | DecimalRaw;
export const isDecimalRaw = (n: unknown): n is DecimalRaw => {
    if (
        n && typeof n === "object"
    ) {
        //@ts-ignore
        return (typeof n.s === "number" && typeof n.e === "number" && Array.isArray(n.c));
    }
    return false;
};
export const decimal = (n: DecimalAble) => {
    let x: DecimalRaw;
    if (isDecimalRaw(n)) {
        x = {
            s: +n.s,
            e: +n.e,
            c: Array.isArray(n.c) ? arr_slice.call(n.c) : [],
            ...DECIMAL_BASE,
        };
    } else {
        const tn = typeof n;
        if (tn !== "string") {
            if (tn !== "bigint" && enableStrictMode) {
                throw TypeError(INVALID + "value");
            }
            // Minus zero?
            n = n === 0 && 1 / n < 0 ? "-0" : String(n);
        }

        parse(x = {} as DecimalRaw, n as string);
        Object.assign(x, DECIMAL_BASE);
    }
    return x;
};

const decimal_copy__ = (v: DecimalRaw) => ({ ...v });

const HALF = decimal("0.5");

/**
 * Round Big x to a maximum of sd significant digits using rounding mode rm.
 *
 * x {Big} The Big to round.
 * sd {number} Significant digits: integer, 0 to MAX_DP inclusive.
 * rm {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
 * [more] {boolean} Whether the result of division was truncated.
 */
const decimal_self_round__ = (
    x: DecimalRaw,
    sd: number,
    rm: number = defaultDecimalRoundingMode,
    more = false,
) => {
    const xc = x.c;

    if (
        rm !== DecimalRoundingMode.ROUND_DOWN &&
        rm !== DecimalRoundingMode.ROUND_HALF_UP &&
        rm !== DecimalRoundingMode.ROUND_HALF_EVEN &&
        rm !== DecimalRoundingMode.ROUND_UP
    ) {
        throw Error(INVALID_RM);
    }

    if (sd < 1) {
        more = rm === 3 && (more || !!xc[0]) || sd === 0 && (
                    rm === 1 && xc[0] >= 5 ||
                    rm === 2 &&
                        (xc[0] > 5 || xc[0] === 5 && (more || xc[1] !== UNDEFINED))
                );

        xc.length = 1;

        if (more) {
            // 1, 0.1, 0.01, 0.001, 0.0001 etc.
            x.e = x.e - sd + 1;
            xc[0] = 1;
        } else {
            // Zero.
            xc[0] = x.e = 0;
        }
    } else if (sd < xc.length) {
        // xc[sd] is the digit after the digit that may be rounded up.
        more = !!(rm === 1 && xc[sd] >= 5 ||
            rm === 2 && (xc[sd] > 5 || xc[sd] === 5 &&
                        (more || xc[sd + 1] !== UNDEFINED || xc[sd - 1] & 1)) ||
            rm === 3 && (more || !!xc[0]));

        // Remove any digits after the required precision.
        xc.length = sd;

        // Round up?
        if (more) {
            // Rounding up may mean the previous digit has to be rounded up.
            while (++xc[--sd] > 9) {
                xc[sd] = 0;
                if (sd === 0) {
                    ++x.e;
                    xc.unshift(1);
                    break;
                }
            }
        }

        // Remove trailing zeros.
        for (sd = xc.length; !xc[--sd];) xc.pop();
    }

    return x;
};

/**
 * Return a string representing the value of Big x in normal or exponential notation.
 * Handles P.toExponential, P.toFixed, P.toJSON, P.toPrecision, P.toString and P.valueOf.
 */
const stringify = (
    x: DecimalRaw,
    doExponential: boolean,
    isNonzero: boolean,
) => {
    let e = x.e;
    let s = x.c.join("");
    const n = s.length;

    // Exponential notation?
    if (doExponential) {
        s = s.charAt(0) + (n > 1 ? `.${s.slice(1)}` : "") + (e < 0 ? "e" : "e+") +
            e;

        // Normal notation.
    } else if (e < 0) {
        while (++e) s = `0${s}`;
        s = `0.${s}`;
    } else if (e > 0) {
        if (++e > n) {
            for (e -= n; e--;) s += "0";
        } else if (e < n) {
            s = `${s.slice(0, e)}.${s.slice(e)}`;
        }
    } else if (n > 1) {
        s = `${s.charAt(0)}.${s.slice(1)}`;
    }

    return x.s < 0 && isNonzero ? `-${s}` : s;
};

// Prototype/instance methods

/**
 * Return a decimal whose value is the absolute value of this Big.
 */
export const decimal_abs = (x: DecimalRaw): DecimalRaw => {
    return { ...x, s: 1 };
};

/**
 * Return 1 if the value of this Big is greater than the value of Big y,
 *       -1 if the value of this Big is less than the value of Big y, or
 *        0 if they have the same value.
 */
export const decimal_cmp = (x: DecimalRaw, y: DecimalAble) => {
    const xc = x.c;
    const yc = (y = decimal(y)).c;
    let i = x.s;
    let j = y.s;
    let k = x.e;
    let l = y.e;

    // Either zero?
    if (!xc[0] || !yc[0]) return !xc[0] ? !yc[0] ? 0 : -j : i;

    // Signs differ?
    if (i !== j) return i;

    const isneg = i < 0;

    // Compare exponents.
    //@ts-ignore
    if (k !== l) return k > l ^ isneg ? 1 : -1;
    k = xc.length;
    l = yc.length;
    j = k < l ? k : l;

    // Compare digit by digit.
    for (i = -1; ++i < j;) {
        //@ts-ignore
        if (xc[i] !== yc[i]) return xc[i] > yc[i] ^ isneg ? 1 : -1;
    }

    // Compare lengths.
    //@ts-ignore
    return k === l ? 0 : k > l ^ isneg ? 1 : -1;
};

const decimal_div__ = (x: DecimalRaw, y: DecimalAble, dp: number, rm: number) => {
    const a = x.c; // dividend
    y = decimal(y);
    const b = y.c; // divisor
    let k = x.s === y.s ? 1 : -1;

    if (dp !== ~~dp || dp < 0 || dp > DecimalPlaces_MAX_DP) {
        throw Error(INVALID_DP);
    }

    // Divisor is zero?
    if (!b[0]) {
        throw Error(DIV_BY_ZERO);
    }

    // Dividend is 0? Return +-0.
    if (!a[0]) {
        y.s = k;
        y.e = 0;
        y.c = [0];
        return y;
    }

    const bl = b.length;
    let bt: number[];
    let n: number;
    let cmp: number | undefined;
    let ri: number;
    const bz = b.slice();
    let ai = bl;
    const al = a.length;
    let r = a.slice(0, bl); // remainder
    let rl = r.length;
    const q = y; // quotient
    const qc = q.c = [] as number[];
    let qi = 0;
    let p = dp + (q.e = x.e - y.e) + 1; // precision of the result

    q.s = k;
    k = p < 0 ? 0 : p;

    // Create version of divisor with leading zero.
    bz.unshift(0);

    // Add zeros to make remainder as long as divisor.
    while (rl++ < bl) r.push(0);

    do {
        // n is how many times the divisor goes into current remainder.
        for (n = 0; n < 10; n++) {
            // Compare divisor and remainder.
            if (bl !== (rl = r.length)) {
                cmp = bl > rl ? 1 : -1;
            } else {
                for (ri = -1, cmp = 0; ++ri < bl;) {
                    if (b[ri] !== r[ri]) {
                        cmp = b[ri] > r[ri] ? 1 : -1;
                        break;
                    }
                }
            }

            // If divisor < remainder, subtract divisor from remainder.
            if (cmp < 0) {
                // Remainder can't be more than 1 digit longer than divisor.
                // Equalise lengths using divisor with extra leading zero?
                for (bt = rl === bl ? b : bz; rl;) {
                    if (r[--rl] < bt[rl]) {
                        ri = rl;
                        while (ri && !r[--ri]) r[ri] = 9;
                        --r[ri];
                        r[rl] += 10;
                    }
                    r[rl] -= bt[rl];
                }

                while (!r[0]) r.shift();
            } else {
                break;
            }
        }

        // Add the digit n to the result array.
        qc[qi++] = cmp ? n : ++n;

        // Update the remainder.
        if (r[0] && cmp) r[rl] = a[ai] || 0;
        else r = [a[ai]];
    } while ((ai++ < al || r[0] !== UNDEFINED) && k--);

    // Leading zero? Do not remove if result is simply zero (qi == 1).
    if (!qc[0] && qi !== 1) {
        // There can't be more than one zero.
        qc.shift();
        q.e--;
        p--;
    }

    // Round?
    if (qi > p) decimal_self_round__(q, p, rm, r[0] !== UNDEFINED);

    return q;
};
/**
 * Return a decimal whose value is the value of this Big divided by the value of Big y, rounded,
 * if necessary, to a maximum of DecimalPlaces_DP decimal places using rounding mode DecimalRoundingMode_DEFAULT.
 */
export const decimal_div = (x: DecimalRaw, y: DecimalAble) =>
    decimal_div__(x, y, defaultDecimalPlaces, defaultDecimalRoundingMode);

/**
 * Return true if the value of this Big is equal to the value of Big y, otherwise return false.
 */
export const decimal_eq = (x: DecimalRaw, y: DecimalAble) => decimal_cmp(x, y) === 0;

/**
 * Return true if the value of this Big is greater than the value of Big y, otherwise return
 * false.
 */
export const decimal_gt = (x: DecimalRaw, y: DecimalAble) => decimal_cmp(x, y) > 0;

/**
 * Return true if the value of this Big is greater than or equal to the value of Big y, otherwise
 * return false.
 */
export const decimal_gte = (x: DecimalRaw, y: DecimalAble) => decimal_cmp(x, y) > -1;

/**
 * Return true if the value of this Big is less than the value of Big y, otherwise return false.
 */
export const decimal_lt = (x: DecimalRaw, y: DecimalAble) => decimal_cmp(x, y) < 0;

/**
 * Return true if the value of this Big is less than or equal to the value of Big y, otherwise
 * return false.
 */
export const decimal_lte = (x: DecimalRaw, y: DecimalAble) => decimal_cmp(x, y) < 1;

/**
 * Return a decimal whose value is the value of this Big minus the value of Big y.
 */
export const decimal_sub = (x: DecimalRaw, y: DecimalAble) => {
    let i;
    let j;
    let t;
    let xlty;
    let a = x.s;
    y = decimal(y);
    let b = y.s;

    // Signs differ?
    if (a !== b) {
        y.s = -b;
        return decimal_add(x, y);
    }

    let xc = x.c.slice();
    const xe = x.e;
    let yc = y.c;
    let ye = y.e;

    // Either zero?
    if (!xc[0] || !yc[0]) {
        if (yc[0]) {
            y.s = -b;
        } else if (xc[0]) {
            y = decimal_copy__(x);
        } else {
            y.s = 1;
        }
        return y;
    }

    // Determine which is the bigger number. Prepend zeros to equalise exponents.
    a = xe - ye;
    if (a) {
        xlty = a < 0;
        if (xlty) {
            a = -a;
            t = xc;
        } else {
            ye = xe;
            t = yc;
        }

        t.reverse();
        for (b = a; b--;) t.push(0);
        t.reverse();
    } else {
        // Exponents equal. Check digit by digit.
        xlty = xc.length < yc.length;
        j = (xlty ? xc : yc).length;

        for (a = b = 0; b < j; b++) {
            if (xc[b] !== yc[b]) {
                xlty = xc[b] < yc[b];
                break;
            }
        }
    }

    // x < y? Point xc to the array of the bigger number.
    if (xlty) {
        t = xc;
        xc = yc;
        yc = t;
        y.s = -y.s;
    }

    /**
     * Append zeros to xc if shorter. No need to add zeros to yc if shorter as subtraction only
     * needs to start at yc.length.
     */
    if ((b = (j = yc.length) - (i = xc.length)) > 0) { while (b--) xc[i++] = 0; }

    // Subtract yc from xc.
    for (b = i; j > a;) {
        if (xc[--j] < yc[j]) {
            for (i = j; i && !xc[--i];) xc[i] = 9;
            --xc[i];
            xc[j] += 10;
        }

        xc[j] -= yc[j];
    }

    // Remove trailing zeros.
    while (xc[--b] === 0) xc.pop();

    // Remove leading zeros and adjust exponent accordingly.
    while (xc[0] === 0) {
        xc.shift();
        --ye;
    }

    if (!xc[0]) {
        // n - n = +0
        y.s = 1;

        // Result must be zero.
        xc = [ye = 0];
    }

    y.c = xc;
    y.e = ye;

    return y;
};

/**
 * Return a decimal whose value is the value of this Big modulo the value of Big y.
 */
export const decimal_mod = (x: DecimalRaw, y: DecimalAble) => {
    const a = x.s;
    y = decimal(y);
    const b = y.s;

    if (!y.c[0]) {
        throw Error(DIV_BY_ZERO);
    }

    x.s = y.s = 1;
    const ygtx = decimal_cmp(y, x) === 1;
    x.s = a;
    y.s = b;

    if (ygtx) return decimal_copy__(x);

    return decimal_sub(x, decimal_mul(decimal_div__(x, y, 0, 0), y));
};

/**
 * Return a decimal whose value is the value of this Big negated.
 */
export const decimal_neg = (x: DecimalRaw) => ({ ...x, s: -x.s });

/**
 * Return a decimal whose value is the value of this Big plus the value of Big y.
 */
export const decimal_add = (x: DecimalRaw, y: DecimalAble): DecimalRaw => {
    let e;
    let k;
    let t;

    y = decimal(y);

    // Signs differ?
    if (x.s !== y.s) {
        y.s = -y.s;
        return decimal_sub(x, y);
    }

    const xe = x.e;
    let xc = x.c;
    let ye = y.e;
    let yc = y.c;

    // Either zero?
    if (!xc[0] || !yc[0]) {
        if (!yc[0]) {
            if (xc[0]) {
                y = decimal_copy__(x);
            } else {
                y.s = x.s;
            }
        }
        return y;
    }

    xc = xc.slice();

    // Prepend zeros to equalise exponents.
    // Note: reverse faster than unshifts.
    e = xe - ye;
    if (e) {
        if (e > 0) {
            ye = xe;
            t = yc;
        } else {
            e = -e;
            t = xc;
        }

        t.reverse();
        while (e--) t.push(0);
        t.reverse();
    }

    // Point xc to the longer array.
    if (xc.length - yc.length < 0) {
        t = yc;
        yc = xc;
        xc = t;
    }

    e = yc.length;

    // Only start adding at yc.length - 1 as the further digits of xc can be left as they are.
    for (k = 0; e; xc[e] %= 10) k = (xc[--e] = xc[e] + yc[e] + k) / 10 | 0;

    // No need to check for zero, as +x + +y != 0 && -x + -y != 0

    if (k) {
        xc.unshift(k);
        ++ye;
    }

    // Remove trailing zeros.
    for (e = xc.length; xc[--e] === 0;) xc.pop();

    y.c = xc;
    y.e = ye;

    return y;
};
/**
 * Return a Big whose value is the value of this Big raised to the power n.
 * If n is negative, round to a maximum of DecimalPlaces_DP decimal places using rounding
 * mode DecimalRoundingMode_DEFAULT.
 *
 * n {number} Integer, -MAX_POWER to MAX_POWER inclusive.
 */
export const decimal_pow = (x: DecimalRaw, n: number) => {
    const ONE = decimal("1"); // 因为原型链会被改动，所以这里采用按需生成one
    let y = ONE;
    const isneg = n < 0;

    if (
        n !== ~~n || n < DecimalExponent_MIN_POWER || n > DecimalExponent_MAX_POWER
    ) {
        throw Error(`${INVALID}exponent`);
    }

    if (isneg) n = -n;

    for (;;) {
        if (n & 1) y = decimal_mul(y, x);
        n >>= 1;
        if (!n) break;
        x = decimal_mul(x, x);
    }

    return isneg ? decimal_div(ONE, y) : y;
};

/**
 * Return a decimal whose value is the value of this Big rounded to a maximum precision of sd
 * significant digits using rounding mode rm, or DecimalRoundingMode_DEFAULT if rm is not specified.
 *
 * sd {number} Significant digits: integer, 1 to MAX_DP inclusive.
 * rm? {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
 */
export const decimal_prec = (x: DecimalRaw, sd: number, rm?: DecimalRoundingMode) => {
    if (sd !== ~~sd || sd < 1 || sd > DecimalPlaces_MAX_DP) {
        throw Error(`${INVALID}precision`);
    }
    return decimal_self_round__(decimal_copy__(x), sd, rm);
};

/**
 * Return a decimal whose value is the value of this Big rounded to a maximum of dp decimal places
 * using rounding mode rm, or DecimalRoundingMode_DEFAULT if rm is not specified.
 * If dp is negative, round to an integer which is a multiple of 10**-dp.
 * If dp is not specified, round to 0 decimal places.
 *
 * dp? {number} Integer, -MAX_DP to MAX_DP inclusive.
 * rm? {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
 */
export const decimal_round = (x: DecimalRaw, dp?: number, rm?: DecimalRoundingMode) => {
    if (dp === UNDEFINED) dp = 0;
    else if (
        dp !== ~~dp || dp < DecimalPlaces_MIN_DP || dp > DecimalPlaces_MAX_DP
    ) {
        throw Error(INVALID_DP);
    }
    return decimal_self_round__(decimal_copy__(x), dp + x.e + 1, rm);
};

/**
 * Return a decimal whose value is the square root of the value of this Big, rounded, if
 * necessary, to a maximum of DecimalPlaces_DP decimal places using rounding mode DecimalRoundingMode_DEFAULT.
 */
export const decimal_sqrt = (x: DecimalRaw) => {
    let r;
    let c;
    let t;
    let s: string | number = x.s;
    let e = x.e;

    // Zero?
    if (!x.c[0]) return decimal_copy__(x);

    // Negative?
    if (s < 0) {
        throw Error(`${NAME}No square root`);
    }

    // Estimate.
    s = Math.sqrt(+stringify(x, true, true));

    // Math.sqrt underflow/overflow?
    // Re-estimate: pass x coefficient to Math.sqrt as integer, then adjust the result exponent.
    if (s === 0 || s === 1 / 0) {
        c = x.c.join("");
        if (!(c.length + e & 1)) c += "0";
        //@ts-ignore
        s = Math.sqrt(c);
        //@ts-ignore
        e = ((e + 1) / 2 | 0) - (e < 0 || e & 1);
        r = decimal(
            (s === 1 / 0 ? "5e" : (s = s.toExponential()).slice(0, s.indexOf("e") + 1)) + e,
        );
    } else {
        r = decimal(`${s}`);
    }

    e = r.e + (defaultDecimalPlaces += 4);

    // Newton-Raphson iteration.
    do {
        t = r;
        r = decimal_mul(HALF, decimal_add(t, decimal_div(x, t)));
    } while (t.c.slice(0, e).join("") !== r.c.slice(0, e).join(""));

    return decimal_self_round__(r, (defaultDecimalPlaces -= 4) + r.e + 1, defaultDecimalRoundingMode);
};

/**
 * Return a decimal whose value is the value of this Big times the value of Big y.
 */
export const decimal_mul = (x: DecimalRaw, y: DecimalAble) => {
    let c;
    let xc = x.c;
    let yc = (y = decimal(y)).c;
    let a = xc.length;
    let b = yc.length;
    let i = x.e;
    let j = y.e;

    // Determine sign of result.
    y.s = x.s === y.s ? 1 : -1;

    // Return signed 0 if either 0.
    if (!xc[0] || !yc[0]) {
        y.c = [y.e = 0];
        return y;
    }

    // Initialise exponent of result as x.e + y.e.
    y.e = i + j;

    // If array xc has fewer digits than yc, swap xc and yc, and lengths.
    if (a < b) {
        c = xc;
        xc = yc;
        yc = c;
        j = a;
        a = b;
        b = j;
    }

    // Initialise coefficient array of result with zeros.
    for (c = new Array(j = a + b); j--;) c[j] = 0;

    // Multiply.

    // i is initially xc.length.
    for (i = b; i--;) {
        b = 0;

        // a is yc.length.
        for (j = a + i; j > i;) {
            // Current sum of products at this digit position, plus carry.
            b = c[j] + yc[i] * xc[j - i - 1] + b;
            c[j--] = b % 10;

            // carry
            b = b / 10 | 0;
        }

        c[j] = b;
    }

    // Increment result exponent if there is a final carry, otherwise remove leading zero.
    if (b) ++y.e;
    else c.shift();

    // Remove trailing zeros.
    for (i = c.length; !c[--i];) c.pop();
    y.c = c;

    return y;
};
/**
 * Return a string representing the value of this Big in exponential notation rounded to dp fixed
 * decimal places using rounding mode rm, or DecimalRoundingMode_DEFAULT if rm is not specified.
 *
 * dp? {number} Decimal places: integer, 0 to MAX_DP inclusive.
 * rm? {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
 */
export const decimal_toExponential = (x: DecimalRaw, dp?: number, rm?: DecimalRoundingMode) => {
    const n = x.c[0];

    if (dp !== UNDEFINED) {
        if (dp !== ~~dp || dp < 0 || dp > DecimalPlaces_MAX_DP) {
            throw Error(INVALID_DP);
        }
        x = decimal_self_round__(decimal_copy__(x), ++dp, rm);
        while (x.c.length < dp) x.c.push(0);
    }

    return stringify(x, true, !!n);
};

/**
 * Return a string representing the value of this Big in normal notation rounded to dp fixed
 * decimal places using rounding mode rm, or DecimalRoundingMode_DEFAULT if rm is not specified.
 *
 * dp? {number} Decimal places: integer, 0 to MAX_DP inclusive.
 * rm? {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
 *
 * (-0).toFixed(0) is '0', but (-0.1).toFixed(0) is '-0'.
 * (-0).toFixed(1) is '0.0', but (-0.01).toFixed(1) is '-0.0'.
 */
export const decimal_toFixed = (x: DecimalRaw, dp?: number, rm?: DecimalRoundingMode) => {
    const n = x.c[0];

    if (dp !== UNDEFINED) {
        if (dp !== ~~dp || dp < 0 || dp > DecimalPlaces_MAX_DP) {
            throw Error(INVALID_DP);
        }
        x = decimal_self_round__(decimal_copy__(x), dp + x.e + 1, rm);

        // x.e may have changed if the value is rounded up.
        for (dp = dp + x.e + 1; x.c.length < dp;) x.c.push(0);
    }

    return stringify(x, false, !!n);
};

/**
 * Return a string representing the value of this Big.
 * Return exponential notation if this Big has a positive exponent equal to or greater than
 * defaultPositiveExponent, or a negative exponent equal to or less than defaultNegativeExponent.
 * Omit the sign for negative zero.
 */
export const decimal_toJSON = (x: DecimalRaw) =>
    stringify(x, x.e <= defaultNegativeExponent || x.e >= defaultPositiveExponent, !!x.c[0]);
export const decimal_toString = decimal_toJSON;

/**
 * Return the value of this Big as a primitive number.
 */
export const decimal_toNumber = (x: DecimalRaw) => {
    const n = +stringify(x, true, true);
    if (enableStrictMode && !decimal_eq(x, n.toString())) {
        throw Error(NAME + "Imprecise conversion");
    }
    return n;
};

/**
 * Return a string representing the value of this Big rounded to sd significant digits using
 * rounding mode rm, or DecimalRoundingMode_DEFAULT if rm is not specified.
 * Use exponential notation if sd is less than the number of digits necessary to represent
 * the integer part of the value in normal notation.
 *
 * sd {number} Significant digits: integer, 1 to MAX_DP inclusive.
 * rm? {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
 */
export const decimal_toPrecision = (x: DecimalRaw, sd: number, rm?: DecimalRoundingMode) => {
    const n = x.c[0];

    if (sd !== UNDEFINED) {
        if (sd !== ~~sd || sd < 1 || sd > DecimalPlaces_MAX_DP) {
            throw Error(`${INVALID}precision`);
        }
        x = decimal_self_round__(decimal_copy__(x), sd, rm);
        while (x.c.length < sd) x.c.push(0);
    }

    return stringify(x, sd <= x.e || x.e <= defaultNegativeExponent || x.e >= defaultPositiveExponent, !!n);
};

/**
 * Return a string representing the value of this Big.
 * Return exponential notation if this Big has a positive exponent equal to or greater than
 * defaultPositiveExponent, or a negative exponent equal to or less than defaultNegativeExponent.
 * Include the sign for negative zero.
 */
export const decimal_valueOf = (x: DecimalRaw) =>
    stringify(x, x.e <= defaultNegativeExponent || x.e >= defaultPositiveExponent, true);

import { curryThisFn } from "@gaubee/util";
const decimalStringify = curryThisFn(decimal_toJSON);
Object.assign(DECIMAL_BASE, {
    toJSON: decimalStringify,
    [Symbol.for("nodejs.util.inspect.custom")]: decimalStringify,
    toString: decimalStringify,
    valueOf: curryThisFn(decimal_valueOf),
});
declare global {
    interface DecimalBase {
        toJSON(): string;
        toString(): string;
        valueOf(): string;
    }
}
