import {type Func, func_catch} from "./func.ts";
import {obj_assign_props} from "./object.ts";
import {type Timmer, timmers} from "./promise.ts";
export namespace func_throttle {
  export type ThrottledFunction<F extends Func> = Func.SetReturn<F, Promise<Func.Return<F>>> & {
    readonly isPending: boolean;
    cancel(): void;
    source: F;
    flush(): void;
  };
}

export const func_throttle = <T extends Func>(fn: T, wait: number | Timmer = 0, options: {waitPromise?: boolean; before?: boolean} = {}): func_throttle.ThrottledFunction<T> => {
  const timmer = timmers.from(wait);
  let clear: Timmer.Clear | undefined;

  type R = Func.Return<T>;
  let jobs: PromiseWithResolvers<R>[] = [];

  let target: Func | undefined;

  return obj_assign_props(
    function throttled(this: Func.This<T>, ...args: Func.Args<T>) {
      // eslint-disable-line func-names
      const job = Promise.withResolvers<R>();
      if (clear == null) {
        clear = timmer(
          (target = async () => {
            target = undefined;
            if (!options.waitPromise) {
              clear = undefined;
            }

            const res = await func_catch(() => fn.apply(this, args) as Func.Return<T>)();

            if (options.waitPromise) {
              clear = undefined;
            }
            if (res.success) {
              for (const job of jobs) {
                job.resolve(res.result);
              }
            } else {
              for (const job of jobs) {
                job.reject(res.error);
              }
            }
            jobs = [];
          }),
          (reason) => {
            for (const job of jobs) {
              job.reject(reason);
            }
          },
        );
        if (options.before) {
          (async () => {
            const res = await func_catch(() => fn.apply(this, args) as Func.Return<T>)();
            if (res.success) {
              job.resolve(res.result);
            } else {
              job.reject(res.error);
            }
          })();
        } else {
          jobs.push(job);
        }
      } else {
        jobs.push(job);
      }

      return job.promise;
    },
    {
      get isPending() {
        return clear != null;
      },
      cancel() {
        clear?.();
        clear = undefined;
      },
      source: fn,
      flush() {
        clear?.();
        clear = undefined;
        target?.();
      },
    },
  );
};
