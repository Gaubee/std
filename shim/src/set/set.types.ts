import type { Func } from "@gaubee/util";

export type AnySet = Set<any>;

export type NativeFn<P extends keyof AnySet> = <T>(
    self: Set<T>,
    ...args: Func.Args<Set<T>[P]>
) => Func.Return<Set<T>[P]>;
