import os from "node:os";
import node_path from "node:path";
import { fileURLToPath } from "node:url";
import * as colors from "@std/fmt/colors";
import { type WalkEntry, walkSync } from "@std/fs";
import { globToRegExp, isGlob } from "@std/path";
/**
 * 将一个路径格式化成标准的 posix 格式
 */
export const normalize = (path: string | URL): string => {
    if (typeof path !== "string") {
        path = path.toString();
    }
    if (path.startsWith("file:///")) {
        path = fileURLToPath(path);
    }
    if (path.includes(node_path.sep)) {
        path = path.split(node_path.sep).join(node_path.posix.sep);
    }
    return path;
};

export interface CreateShellOptions {
    cwd?: string;
}
export interface Shell {
    (command: string, options: Deno.CommandOptions | string[] | string): Promise<void>;
    /**
     * 当前所处目录
     */
    cwd: string;
    /**
     * 进入指定目录
     */
    cd: (path: string) => void;
    /**
     * 遍历文件和文件夹
     */
    ls: (glob?: string) => void;
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
    const cwd = options.cwd ?? Deno.cwd();
    const $ = Object.assign(
        async (
            command: string,
            options: Deno.CommandOptions | string[] | string,
        ) => {
            let safe_cmd = command;
            const safe_options: Deno.CommandOptions = {};
            if (Array.isArray(options)) {
                safe_options.args = options;
            } else if (typeof options === "string") {
                safe_options.args = options.trim().split(/\s+/);
            } else {
                Object.assign(safe_options, options);
            }
            console.info(
                "%c⫸ %c" + [command, ...(safe_options.args ?? [])].join(" "),
                "color:blue",
                "color:magenta",
            );
            if (os.platform() === "win32") {
                safe_cmd = "cmd";
                safe_options.args = ["/c", command, ...(safe_options.args ?? [])];
                if (safe_options.cwd == null) {
                    safe_options.cwd = $.cwd;
                }
            }
            const task = new Deno.Command(safe_cmd, safe_options);
            const status = await task.spawn().status;
            if (!status.success) {
                console.error(`exec ${command} fail with signal: ${status.signal}`);
                Deno.exit(status.code);
            }
        },
        {
            cwd: cwd,
            cd: (path: string) => {
                $.cwd = node_path.resolve($.cwd, path);
            },
            normalize,
            ls: (glob?: string) => {
                let cwd = $.cwd;
                let filter = (_entry: WalkEntry & { relativePath: string }) => true;
                if (glob) {
                    if (isGlob(glob)) {
                        const globReg = globToRegExp(glob);
                        filter = (entry) => globReg.test(node_path.relative(cwd, entry.path));
                    } else {
                        if (glob.startsWith("file:///")) {
                            cwd = fileURLToPath(glob);
                        } else {
                            cwd = node_path.resolve(cwd, glob);
                        }
                    }
                }
                for (const _entry of walkSync(cwd)) {
                    const entry = Object.assign(_entry, {
                        relativePath: normalize(node_path.relative(cwd, _entry.path)),
                    });
                    if (filter(entry)) {
                        const log_args = [entry.relativePath];
                        if (entry.isDirectory) {
                            log_args[0] = "%c" + log_args[0];
                            log_args.splice(1, 0, "color:green");
                        }
                        if (entry.isSymlink) {
                            log_args[0] = "%c⇱ " + log_args[0];
                            log_args.splice(1, 0, "color:blue");
                        }
                        console.log(...log_args);
                    }
                }
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
