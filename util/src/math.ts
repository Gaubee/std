/**
 * Clamps a value between a lower and an upper bound (inclusive).
 */
export const clamp = (value: number, lower: number, upper: number) => {
    return Math.min(upper, Math.max(lower, value));
};
/**
 * Returns lower when value is less than or equal to 0, upper when value is greater than or
 * equal
 * to 1, and linearly interpolates between them when value is between 0 and 1.
 */
export const lerp = (value: number, lower: number, upper: number) => {
    return clamp(value, 0, 1) * (upper - lower) + lower;
};

/** Returns the closer of two values a and b to the given value. */
export const nearest_value = (value: number, a: number, b: number) => {
    return Math.abs(a - value) < Math.abs(b - value) ? a : b;
};
