export const uncurryThisFn = <T, ARGS extends readonly unknown[], R>(
  func: (this: T, ...args: ARGS) => R
): ((self: T, ...restArgs: ARGS) => R) => {
  // deno-lint-ignore no-explicit-any
  return Function.prototype.call.bind(func) as any;
};
export const curryThisFn = <T, ARGS extends readonly unknown[], R>(
  func: (self: T, ...args: ARGS) => R
): ((this: T, ...args: ARGS) => R) => {
  return function (this: T, ...args: ARGS): R {
    return func(this, ...args);
  };
};
