import {type AsyncContextStorage, createAsyncContextStorage} from "./async-context.ts";

export type ReadonlyAcontext<T> = {
  readonly name: string;
  get(): T;
  getOrNull(): T | null;
  getOrElse<TElse>(else_fn: () => TElse): T | TElse;
};

export type Acontext<T> = ReadonlyAcontext<T> & {
  readonly default?: () => T;
  readonly storage: AsyncContextStorage<{value: T}>;
  run<R>(value: T, cb: () => Promise<R>): Promise<R>;
  asReadonly(): ReadonlyAcontext<T>;
};

export const createAcontext = <T extends unknown>(name: string, default_fn?: Acontext<T>["default"]): Acontext<T> => {
  const storage = createAsyncContextStorage<{value: T}>();

  const handle: Acontext<T> = {
    storage: storage,
    default: default_fn,
    name: name,
    getOrElse: (else_fn) => {
      const item = storage.getStore();
      if (item == null) {
        return default_fn ? default_fn() : else_fn();
      }
      return item?.value;
    },

    get: () => {
      return handle.getOrElse(() => {
        throw new Error(`No factory registered for capability handle: ${name}`);
      });
    },
    getOrNull: () => {
      return handle.getOrElse(() => null);
    },
    run: (value, cb) => {
      return storage.run({value}, cb);
    },

    asReadonly: () => {
      return {
        name: handle.name,
        get: handle.get,
        getOrNull: handle.getOrNull,
        getOrElse: handle.getOrElse,
      };
    },
  };

  return handle;
};

type AContextValue<T> = T extends Acontext<infer R> ? R : never;

type AContextsValues<T extends Array<any>> = T extends []
  ? []
  : T extends [infer Head, ...infer Tail]
    ? [AContextValue<Head>, ...AContextsValues<Tail>]
    : T extends Array<infer Head>
      ? AContextValue<Head>[]
      : never;

export const useAcontexts = <const ACS extends Array<Acontext<any>>>(ctxs: ACS) => {
  return <R extends unknown>(values: AContextsValues<ACS>, run: () => Promise<R>) => {
    // 递归的内部辅助函数
    const runner = (index: number): Promise<R> => {
      // 基本情况：如果所有上下文都已应用，则执行最终的 run 函数
      if (index >= ctxs.length) {
        return run();
      }

      // 获取当前的 Acontext 和要设置的值
      const context = ctxs[index];
      const value = values[index];

      // 递归步骤：在当前上下文中运行，并递归调用 runner 处理下一个上下文
      return context.run(value, () => runner(index + 1));
    };

    // 从第一个上下文开始启动递归
    return runner(0);
  };
};

export class AcontextMap {
  #map = new Map<Acontext<any>, any>();
  set<T extends Acontext<unknown>>(context: T, value: AContextValue<T>) {
    this.#map.set(context, value);
    return this;
  }
  get<T>(context: Acontext<T>) {
    return this.#map.get(context);
  }
  has(context: Acontext<any>) {
    return this.#map.has(context);
  }
  run<T>(runner: () => Promise<T>) {
    return useAcontexts([...this.#map.keys()])([...this.#map.values()], runner);
  }
}
