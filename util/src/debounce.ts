import type { Func } from "./func.ts";
import { obj_assign_props } from "./object.ts";
import { type Timmer, timmers } from "./promise.ts";

export namespace func_debounce {
    export type DebouncedFunction<F extends Func> = Func.SetReturn<F, Promise<Func.Return<F>>> & {
        readonly isPending: boolean;
        cancel(): void;
        source: F;
        flush(): void;
    };
}

export const func_debounce = <T extends Func>(
    fn: T,
    wait: number | Timmer = 0,
    options: {
        /**
         * Call the `fn` on the [leading edge of the timeout](https://css-tricks.com/debouncing-throttling-explained-examples/#article-header-id-1). Meaning immediately, instead of waiting for `wait` milliseconds.
         */
        before?: boolean;
    } = {},
): func_debounce.DebouncedFunction<T> => {
    if (!Number.isFinite(wait)) {
        throw new TypeError("Expected `wait` to be a finite number");
    }
    const timmer = timmers.from(wait);

    let leadingValue: R;
    let clear: Timmer.Clear | undefined;
    type R = Func.Return<T>;
    let jobList: PromiseWithResolvers<R>[] = [];

    let trigger: Func | undefined;
    return obj_assign_props(function (this: Func.This<T>, ...args: Func.Args<T>) {
        const job = Promise.withResolvers<R>();
        const shouldCallNow = options.before && null == clear;

        if (shouldCallNow) {
            leadingValue = fn.apply(this, args);
            job.resolve(leadingValue);
        } else {
            jobList.push(job);
        }

        clear?.();
        clear = timmer(
            trigger = () => {
                clear = undefined;
                trigger = undefined;

                const result = options.before ? leadingValue : fn.apply(this, args);

                for (const job of jobList) {
                    job.resolve(result);
                }

                jobList = [];
            },
            (reason) => {
                for (const job of jobList) {
                    job.reject(reason);
                }
            },
        );

        return job.promise;
    }, {
        get isPending() {
            return clear != null;
        },
        cancel() {
            clear?.();
        },
        source: fn,
        flush() {
            if (clear != null) {
                clear();
                trigger?.();
            }
        },
    });
};
