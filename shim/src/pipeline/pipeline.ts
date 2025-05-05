import type { Func } from "@gaubee/util";

// Helper type to infer the first argument type of a function
type FirstArgType<T extends Func> = T extends (arg1: infer A, ...args: any[]) => any ? A : any;

// Recursive type to calculate the final output type of the pipeline
type PipelineOutputType<OPS extends [Func, ...any[]][], InitialValue> = OPS extends [] ? InitialValue
    : OPS extends [[infer F, ...infer Args], ...infer RestOPS]
        ? RestOPS extends [Func, ...any[]][] ? PipelineOutputType<RestOPS, Func.Return<F>>
        : Func.Return<F>
    : never;

// Recursive type to calculate the initial input type required by the pipeline
type PipelineInputType<OPS extends [Func, ...any[]][]> = OPS extends [] ? any // Or unknown, depending on desired strictness
    : OPS extends [[infer F extends Func, ...infer _Args], ...infer _RestOPS] ? FirstArgType<F>
    : never;

// The main Pipeline type
export type Pipeline<OPS extends [Func, ...any[]][]> = (
    initialValue: PipelineInputType<OPS>,
) => PipelineOutputType<OPS, PipelineInputType<OPS>>;

/**
 * pipeline([
 *     // 这里三个子数组，每一个开头都是一个函数，后面是参数，参数由这个函数的第二个参数开始，而第一个参数，由上一个函数的返回值来提供
 *     [decimal],
 *     [decimal_round, 2],
 *     [decimal_toString],
 * ])(12.345);
 *
 * 等价于：
 *
 * decimal_toString(decimal_round(decimal(12.345),2))
 * @param ops
 * @returns
 */
export const pipeline = <const OPS extends [Func, ...any[]][]>(ops: OPS): Pipeline<OPS> => {
    return (initialValue: any) => {
        // Cast ops to any to bypass strict type checking within reduce,
        // as the complex type inference is handled by the Pipeline type itself.
        return (ops as any[]).reduce((acc, op) => {
            const [fn, ...args] = op;
            return fn(acc, ...args);
        }, initialValue);
    };
};
