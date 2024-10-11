/**
 * 计算两个数的最大公约数 greatest Common Divisor
 */
export const bigint_gcd = (left: bigint, right: bigint): bigint => {
    const mod = left % right;
    if (mod === 0n) {
        return right;
    }
    return bigint_gcd(right, mod);
};
