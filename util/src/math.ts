/**
 * Clamps a value between a lower and an upper bound (inclusive).
 */
export const math_clamp = (value: number, lower: number, upper: number): number => {
    return Math.min(upper, Math.max(lower, value));
};
/**
 * Returns lower when value is less than or equal to 0, upper when value is greater than or
 * equal
 * to 1, and linearly interpolates between them when value is between 0 and 1.
 */
export const math_lerp = (value: number, from: number, to: number): number => {
    return value * (to - from) + from;
};

export const math_lerp_with_clamp = (value: number, from: number, to: number): number => {
    return math_lerp(math_clamp(value, 0, 1), from, to);
};

/** Returns the closer of two values a and b to the given value. */
export const math_nearest_value = (value: number, a: number, b: number): number => {
    return Math.abs(a - value) < Math.abs(b - value) ? a : b;
};
