import os from "node:os";
import node_path from "node:path";
import node_fs from "node:fs";
import * as colors from "@std/fmt/colors";
import { walkAny, type WalkEntry } from "./fs.ts";
import child_process from "node:child_process";
import process from "node:process";
import { obj_omit } from "@gaubee/util/object";
import { normalizeFilePath } from "./path.ts";
import { type $Type, build$ as buildSh } from "dax-sh";

export interface CreateShellOptions {
    cwd?: string;
    env?: Record<string, string>;
}
export interface CommandOptions extends Omit<child_process.CommonSpawnOptions, "stdio"> {
    // stdio?: (cp: CommandStdIO) => unknown;
    stdin?: (io: import("node:stream").Writable) => unknown;
    stderr?: (io: import("node:stream").Readable) => unknown;
    stdout?: (io: import("node:stream").Readable) => unknown;
}

type RequiredNonNullable<T> = {
    readonly [P in keyof T]-?: NonNullable<T[P]>;
};
export type CommandStdIO = RequiredNonNullable<Pick<child_process.ChildProcess, "stdin" | "stderr" | "stdout">>;
export interface Shell extends $Type {
    spawn(command: string, args: string[] | string, options?: CommandOptions): Promise<unknown>;
    /**
     * 当前所处目录
     */
    cwd: string;
    /**
     * 环境变量
     */
    env: Record<string, string>;
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
    let cwd = normalizeFilePath(options.cwd ?? process.cwd());
    const env = options.env ?? obj_omit(process.env, "TZ") as Record<string, string>;

    const sh = buildSh({});
    const ext = {
        async spawn(
            command: string,
            args: string[] | string,
            options?: CommandOptions,
        ): Promise<void> {
            let safe_cmd = command;
            let safe_args: string[] = [];
            const safe_options: child_process.CommonSpawnOptions = obj_omit(
                options ?? {},
                "stdin",
                "stdout",
                "stderr",
            );
            if (Array.isArray(args)) {
                safe_args = args;
            } else if (typeof args === "string") {
                safe_args = args.trim().split(/\s+/);
            }
            if (safe_options.cwd != null) {
                console.info(colors.blue(">"), colors.gray(String(safe_options.cwd)));
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
            const stdio: child_process.StdioOptions = ["inherit", "inherit", "inherit"];
            if (options?.stdin) stdio[0] = "pipe";
            if (options?.stdout) stdio[1] = node_fs.openSync("qaq.stdout", "w"); //"pipe";
            if (options?.stderr) stdio[2] = "pipe";
            const cp = child_process.spawn(safe_cmd, safe_args, {
                stdio: stdio,
                ...safe_options,
            });
            options?.stdin?.(cp.stdin!);
            options?.stdout?.(cp.stdout!);
            options?.stderr?.(cp.stderr!);
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
        env: env,
        set cwd(v) {
            cwd = normalizeFilePath(node_path.resolve(cwd, v));
            sh.cd(cwd);
        },
        get cwd() {
            return cwd;
        },
        cd: (path: string) => {
            ext.cwd = path;
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
    const $ = new Proxy(
        sh,
        {
            get(t, p, r) {
                if (p in ext) {
                    return Reflect.get(ext, p, r);
                }
                return Reflect.get(t, p, r);
            },
        },
    ) as Shell;
    $.cd(cwd);
    return $;
};
/**
 * 用于执行终端命令
 */
export const $: Shell = /*@__PURE__*/ $$({});
