import {iter_first_not_null} from "@gaubee/util";

type CommonEnv = Record<string, string | undefined>;

declare const process: any;
export const nodeEnvSource = () => process.env;
declare const Deno: any;
export const denoEnvSource = (): CommonEnv =>
  new Proxy(
    {},
    {
      get(_target, key) {
        return Deno.env.get(key as string);
      },
      set(_target, key, value) {
        Deno.env.set(key as string, value as string);
        return true;
      },
    },
  );
declare const Bun: any;
export const bunEnvSource = (): CommonEnv => Bun.env;
export const storageEnvSource = (storages: Storage[] = [sessionStorage, localStorage]): CommonEnv =>
  new Proxy(
    {},
    {
      get(_target, key) {
        for (const storage of storages) {
          const res = storage.getItem(key as string);
          if (res != null) {
            return res;
          }
        }
      },
      set(_target, key, value) {
        for (const storage of storages) {
          storage.setItem(key as string, value as string);
          return true;
        }
        return false;
      },
    },
  );
export const autoEnvSource = (fallback: () => Record<string, string> = () => ({})): CommonEnv => {
  return (
    iter_first_not_null(
      [
        [typeof Deno != "undefined", denoEnvSource],
        [typeof Bun != "undefined", bunEnvSource],
        [typeof process != "undefined", nodeEnvSource],
        [typeof sessionStorage != "undefined", storageEnvSource],
      ] as const,
      ([match, fn]) => (match ? fn() : null),
    ) ?? fallback()
  );
};

type Parser = {parse: (v: string | undefined) => unknown} | ((v: string | undefined) => unknown);
type ParserReturn<T> = T extends {parse: (v: string | undefined) => infer R} ? R : T extends (v: string | undefined) => infer R ? R : unknown;

type SaveEnvReturn<T extends Record<string, Parser>> = {
  [K in keyof T]: T[K] extends Parser ? ParserReturn<T[K]> : never;
};

/**
 * @example
 * ```ts
 * const safeEnv = defineSafeEnv({
 *   // use zod
 *   STR: z.string().default("123"),
 *   NUM: z.number().default(456),
 *
 *   // use custom parser
 *   BINT: (value) => BigInt(String(value ?? "0")),
 * });
 *
 * const r1 = safeEnv(); // will auto use runtime env: support bun/deno/node/vite/browser(sessionStorage+localStorage)
 * r1.STR; // safe type: string
 * r1.NUM; // safe type: number
 * r1.BINT; // safe type: bigint
 *
 * console.log(r1); // { STR: "114514", NUM: 123, BINT: 0n }
 *
 * const r2 = safeEnv({STR: "qqq"});
 * console.log(r2); // { STR: "114514", NUM: 123, BINT: 0n }
 * ```
 * @param envShape
 * @returns
 */
export const defineSafeEnv = <ENV extends Record<string, Parser>>(envShape: ENV): ((source?: CommonEnv) => SaveEnvReturn<ENV>) => {
  return (source: CommonEnv = autoEnvSource()): SaveEnvReturn<ENV> => {
    const env: any = {};
    for (const prop in envShape) {
      const parser = envShape[prop as keyof ENV];
      let get: undefined | (() => unknown);
      if (typeof parser === "function") {
        env[prop] = parser(source[prop as keyof ENV]);
      }
      if (typeof parser === "object" && parser !== null && typeof parser.parse === "function") {
        env[prop] = parser.parse(source[prop as keyof ENV]);
      }
      if (get) {
        Object.defineProperty(env, prop, {
          get,
          enumerable: true,
          configurable: false,
        });
      }
    }
    return env as SaveEnvReturn<ENV>;
  };
};
