import os from "node:os";
import node_path from "node:path";
import * as colors from "@std/fmt/colors";

interface CreateShellOptions {
    cwd?: string;
}
interface Shell {
    (command: string, options: Deno.CommandOptions | string[] | string): Promise<void>;
    cwd: string;
    cd: (path: string) => this;
    colors: typeof colors;
}

export const $$: (options: CreateShellOptions) => Shell = (options: CreateShellOptions): Shell => {
    const cwd = options.cwd ?? Deno.cwd();
    return Object.assign(
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
                return $;
            },
            colors: colors,
        },
    );
};
export const $: Shell = $$({});
