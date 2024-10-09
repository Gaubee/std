/**
 * 计算两个数的最大公约数 greatest Common Divisor
 */
export const number_gcd = (left: number, right: number): number => {
    if (!Number.isFinite(left) || !Number.isFinite(right)) {
        return NaN;
    }
    return _gcd(left, right);
};
const _gcd = (left: number, right: number): number => {
    const mod = left % right;
    if (mod === 0) {
        return right;
    }
    return _gcd(right, mod);
};
