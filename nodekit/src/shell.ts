import os from "node:os";
import node_path from "node:path";
import * as colors from "@std/fmt/colors";
import { walkAny, type WalkEntry } from "./fs.ts";
import child_process from "node:child_process";
import process from "node:process";
import { obj_omit } from "@gaubee/util/object";
import { normalizeFilePath } from "./path.ts";

export interface CreateShellOptions {
    cwd?: string;
    env?: Record<string, string>;
}
export interface Shell {
    (command: string, options: Deno.CommandOptions | string[] | string): Promise<void>;
    /**
     * 当前所处目录
     */
    cwd: string;
    /**
     * 环境变量
     */
    env: Record<string, string>;
    /**
     * 进入指定目录
     */
    cd: (path: string) => void;
    /**
     * 遍历文件和文件夹
     */
    ls: (glob?: string) => WalkEntry[];
    /**
     * 终端颜色
     * {@link https://jsr.io/@std/fmt/doc/colors}
     */
    colors: typeof colors;
}

/**
 * 用于创建命令执行器
 * @param options
 * @returns
 */
export const $$: (options: CreateShellOptions) => Shell = (options: CreateShellOptions): Shell => {
    const cwd = options.cwd ?? process.cwd();
    const env = options.env ?? obj_omit(process.env, "TZ") as Record<string, string>;
    const $ = Object.assign(
        async (
            command: string,
            options: child_process.CommonSpawnOptions | string[] | string,
        ) => {
            let safe_cmd = command;
            let safe_args: string[] = [];
            const safe_options: child_process.CommonSpawnOptions = {};
            if (Array.isArray(options)) {
                safe_args = options;
            } else if (typeof options === "string") {
                safe_args = options.trim().split(/\s+/);
            } else {
                Object.assign(safe_options, options);
            }
            console.info(
                colors.blue("⫸"),
                colors.magenta([command, ...safe_args].join(" ")),
            );
            if (os.platform() === "win32") {
                safe_cmd = "cmd";
                safe_args = ["/c", command, ...safe_args];
                if (safe_options.cwd == null) {
                    safe_options.cwd = $.cwd;
                }
                if (safe_options.env == null) {
                    safe_options.env = $.env;
                }
            }
            const cp = child_process.spawn(safe_cmd, safe_args, {
                ...safe_options,
                stdio: "inherit",
            });
            const job = Promise.withResolvers<void>();
            cp.addListener("exit", (code, signal) => {
                if (code != null && code != 0) {
                    console.error(colors.bgRed(`exec ${command} fail with signal: ${signal}`));
                    job.reject(new Error(`code:${code}, signal:${signal}`));
                } else {
                    job.resolve();
                }
            });
            await job.promise;
        },
        {
            env: env,
            cwd: cwd,
            cd: (path: string) => {
                $.cwd = node_path.resolve($.cwd, path);
            },
            ls: (subpath?: string, options?: { ignore?: string; match?: string; silence?: boolean }) => {
                const entries = [];
                const silence = options?.silence ?? false;
                const log = !silence;
                for (
                    const entry of walkAny(node_path.resolve($.cwd, normalizeFilePath(subpath ?? ".")), {
                        ignore: options?.ignore,
                        match: options?.match,
                    })
                ) {
                    entries.push(entry);
                    if (log) {
                        const log_args = [entry.relativepath];
                        if (entry.isDirectory) {
                            log_args[0] = colors.green(log_args[0]);
                        }
                        if (entry.stats.isSymbolicLink()) {
                            log_args.unshift(colors.blue("⇱"));
                        }
                        console.log(colors.gray("-"), ...log_args);
                    }
                }
                return entries;
            },
            colors: colors,
        },
    );
    return $;
};
/**
 * 用于执行终端命令
 */
export const $: Shell = $$({});
