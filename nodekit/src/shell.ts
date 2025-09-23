export * from "execa";
import {normalizeFilePath} from "@gaubee/node/path";
import {obj_omit} from "@gaubee/util/object";
import {$ as execa, type ExecaScriptMethod} from "execa";
import node_path from "node:path";
import * as colors from "./colors.ts";
import {AnyEntry} from "./fs_entry.ts";
import {walkAny} from "./walk.ts";
export type CreateShellOptions<OptionsType extends CommonOptions = CommonOptions> = OptionsType & {
  cwd?: string;
  env?: Record<string, string>;
};

type RequiredNonNullable<T> = {
  readonly [P in keyof T]-?: NonNullable<T[P]>;
};
type CommonOptions = {};
export interface Shell<OptionsType extends CommonOptions = CommonOptions> extends ExecaScriptMethod<OptionsType> {
  /**
   * 当前所处目录
   */
  cwd: string;
  /**
   * 切换工作目录
   */
  cd: (path: string) => void;
  /**
   * 环境变量
   */
  env: Record<string, string>;
  /**
   * 遍历文件和文件夹
   */
  ls: (subpath?: string, options?: {ignore?: string; match?: string; silence?: boolean}) => AnyEntry[];
}
export const $$: <OptionsType extends CommonOptions = CommonOptions>(options: CreateShellOptions<OptionsType>) => Shell<OptionsType> = (options) => {
  /**
   * 用于创建命令执行器
   * @param options
   * @returns
   */
  let cwd = normalizeFilePath(options.cwd ?? process.cwd());

  const env = options.env ?? (obj_omit(process.env, "TZ") as Record<string, string>);

  let sh: ExecaScriptMethod<any> = execa(options);

  const ext = {
    env: env,
    set cwd(v) {
      cwd = normalizeFilePath(node_path.resolve(cwd, v));
      sh = execa({...options, cwd, env: ext.env});
    },
    get cwd() {
      return cwd;
    },
    cd: (path: string) => {
      ext.cwd = path;
    },
    ls: (subpath?: string, options?: {ignore?: string; match?: string; silence?: boolean}) => {
      const entries = [];
      const silence = options?.silence ?? false;
      const log = !silence;
      for (const entry of walkAny(node_path.resolve($.cwd, normalizeFilePath(subpath ?? ".")), {
        ignore: options?.ignore,
        match: options?.match,
      })) {
        entries.push(entry);
        if (log) {
          const log_args = [entry.relativePath];
          if (entry.isDirectory) {
            log_args[0] = colors.green(log_args[0]);
          }
          if (entry.isSymbol) {
            log_args.unshift(colors.blue("⇱"));
          }
          console.log(colors.gray("-"), ...log_args);
        }
      }
      return entries;
    },
    colors: colors,
  };
  const $ = new Proxy(function $() {}, {
    get(_, p, r) {
      if (p in ext) {
        return Reflect.get(ext, p, r);
      }
      return Reflect.get(sh, p, r);
    },
    apply(_, thisArg, args) {
      return Reflect.apply(sh, thisArg, args);
    },
  }) as any as Shell<any>;

  return $;
};
/**
 * 用于执行终端命令
 */
export const $: Shell<{}> = /*@__PURE__*/ $$({});
