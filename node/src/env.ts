import { func_remember, obj_assign_props, obj_props } from "@gaubee/util";

type CustomEnvConfig<T = unknown> = {
    default: T;
    stringify: (v: T) => string;
    parse: (v: string) => T;
};
type CustomEnvGetter<Env> = (env: Env) => string;
type EnvConfig<Env = unknown> = string | number | boolean | CustomEnvConfig<unknown> | CustomEnvGetter<Env>;
export type DefineEnv<P extends string, KV extends Record<string, EnvConfig<any>>> = {
    [K in keyof KV as `${Uppercase<P>}_${Uppercase<K & string>}`]: KV[K] extends CustomEnvConfig<infer V> ? V
        : KV[K] extends CustomEnvGetter<any> ? string
        : KV[K];
    // defineEnv<P2 extends string, KV2 extends Record<string, EnvConfig<>>>()
};
export type DefineEnvChain<P extends string, Env> = Env & {
    and<KV2 extends Record<string, EnvConfig<Env>>>(
        kv: KV2,
        env?: Record<string, string>,
    ): DefineEnvChain<P, Env & DefineEnv<P, KV2>>;
    end(): Env;
};
export const viteEnvSource = () =>
    new Proxy((import.meta as any).env, {
        get(target, key, receiver) {
            return Reflect.get(target, `VITE_${key as string}`, receiver);
        },
        set(target, key, value, receiver) {
            return Reflect.set(target, `VITE_${key as string}`, value, receiver);
        },
    });
declare const process: any;
export const nodeEnvSource = () => process.env;
declare const Deno: any;
export const denoEnvSource = () =>
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
export const bunEnvSource = () => Bun.env;
export const storageEnvSource = (storage: Storage = sessionStorage) =>
    new Proxy(
        {},
        {
            get(_target, key) {
                return storage.getItem(key as string);
            },
            set(_target, key, value) {
                storage.setItem(key as string, value as string);
                return true;
            },
        },
    );
export const autoEnvSource = (
    fallback: () => Record<string, string> = () => ({}),
): Record<string, string | undefined> => {
    return typeof Deno != "undefined"
        ? denoEnvSource()
        : typeof Bun != "undefined"
        ? bunEnvSource()
        : typeof (import.meta as any).env != "undefined"
        ? viteEnvSource()
        : typeof process != "undefined"
        ? nodeEnvSource()
        : typeof sessionStorage != "undefined"
        ? storageEnvSource(sessionStorage)
        : fallback();
};

export const defineEnv = <P extends string, KV extends Record<string, EnvConfig>>(
    prefix: P,
    kv: KV,
    source = autoEnvSource(),
    ext: {} = {},
): DefineEnvChain<P, DefineEnv<P, KV>> => {
    const prefix_up = prefix.toUpperCase();
    const res = obj_assign_props(ext, {
        and(kv, env) {
            return defineEnv(prefix, kv as any, env, res);
        },
        end() {
            const closed_res = obj_assign_props(res, { and: undefined, end: undefined }) as any;
            delete closed_res.and;
            delete closed_res.end;
            return closed_res;
        },
    } as DefineEnvChain<P, DefineEnv<P, KV>>);
    for (const key of obj_props(kv, { excludeSymbols: true })) {
        const ENV_KEY = `${prefix_up}_${key.toUpperCase()}` as keyof DefineEnv<P, KV>;
        const env_value = kv[key];
        let envConfig: CustomEnvConfig<any>;
        switch (typeof env_value) {
            case "string":
                envConfig = {
                    default: env_value,
                    stringify: (v) => v,
                    parse: (v) => v,
                } satisfies CustomEnvConfig<string>;
                break;
            case "number":
                envConfig = {
                    default: env_value,
                    stringify: (v) => `${v}`,
                    parse: (v) => +v,
                } satisfies CustomEnvConfig<number>;
                break;
            case "bigint":
                envConfig = {
                    default: env_value,
                    stringify: (v) => `${v}`,
                    parse: (v) => BigInt(v),
                } satisfies CustomEnvConfig<bigint>;
                break;
            case "boolean":
                envConfig = {
                    default: env_value,
                    stringify: (v) => `${v}`,
                    parse: (v) => !(v === "false" || v === ""),
                } satisfies CustomEnvConfig<boolean>;
                break;
            case "object":
                envConfig = env_value;
                break;
            case "function":
                envConfig = {
                    get default() {
                        return env_value(res);
                    },
                    stringify: (v) => v,
                    parse: (v) => v,
                } satisfies CustomEnvConfig<string>;
                break;
            default:
                throw new Error(`unkonwn type for key:${key}`);
        }

        const getter = func_remember(
            (v) => {
                return envConfig.parse(v);
            },
            (v) => v,
        );
        const setter = func_remember(
            (v) => {
                source[ENV_KEY] = envConfig.stringify(v);
            },
            (v) => v,
        );

        obj_assign_props(res, {
            get [ENV_KEY]() {
                const val = source[ENV_KEY];
                if (typeof val === "string") {
                    return getter(val);
                }
                return envConfig.default;
            },
            set [ENV_KEY](v: string) {
                setter(v);
            },
        });
    }
    return res;
};
