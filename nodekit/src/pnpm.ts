import { obj_omit } from "@gaubee/util";
import { normalizeFilePath, cwdResolver } from "@gaubee/node";
import { $ } from "./shell.ts";
export interface PnpmPublishOptions {
    cwd?: string;
    /**
     * Tells the registry whether this package should
     * be published as public or restricted
     */
    access?: "public" | "restricted";
    /**
     * Does everything a publish would do except
     * actually publishing to the registry
     */
    dryRun?: boolean;
    /**
     * Packages are proceeded to be published even
     * if their current version is already in the
     * registry. This is useful when a
     * "prepublishOnly" script bumps the version of
     * the package before it is published
     */
    force?: boolean;
    /**
     * Ignores any publish related lifecycle
     * scripts (prepublishOnly, postpublish, and
     * the like)
     */
    ignoreScripts?: boolean;
    /**
     * Don't check if current branch is your
     * publish branch, clean, and up to date
     */
    noGitChecks?: boolean;
    /**
     * When publishing packages that require
     * two-factor authentication, this option can
     * specify a one-time password
     */
    otp?: string;
    /**
     * Sets branch name to publish. Default is "master"
     */
    publishBranch?: string;
    /**
     * Publish all packages from the workspace
     */
    recursive?: boolean;
    /**
     * Save the list of the newly published
     * packages to "pnpm-publish-summary.json".
     * Useful when some other tooling is used to
     * report the list of published packages.
     */
    reportSummary?: boolean;
    /**
     * Registers the published package with the
     * given tag. By default, the "latest" tag is
     * used.
     */
    tag?: string;
    /// Filtering options (run the command only on packages that satisfy at least one of the selectors):

    /**
     * Defines files to ignore when
     * filtering for changed projects
     * since the specified
     * commit/branch. Usage example:
     * filter: "...[origin/master]"
     * changedFilesIgnorePattern: "**\/README.md" build
     */
    changedFilesIgnorePattern?: string;
    /**
     * If no projects are matched by
     * the command, exit with throw `Error("code:1")` (fail)
     */
    failIfNoMatch?: boolean;
    /**
     * - `!<selector>` If a selector starts with ! (or \! in zsh), it means the packages matching the selector must be excluded. E.g. `filter: "!foo"` selects all packages except "foo"
     * - `.` Includes all packages that are under the current working directory
     * - `...^<pattern>` Includes only the direct and indirect dependents of the matched packages without including the matched packages themselves. E.g.: `filter: "...^foo"`
     * - `...<pattern>` Includes all direct and indirect dependents of the matched packages. E.g.: `filter: ["...foo", "...@bar/*"]`
     * - `./<dir>` Includes all packages that are inside a given subdirectory. E.g.: `filter: "./components"`
     * - `[<since>]` Includes all packages changed since the specified commit/branch. E.g.: `"[master]"`, `"[HEAD\~2]"`. It may be used together with `"..."`. So, for instance, `"...[HEAD\~1]"` selects all packages changed in the last commit and their dependents
     * - `{<dir>}` Includes all projects that are under the specified directory. It may be used with "..." to select dependents/dependencies as well. It also may be combined with `"[<since>]"`. For instance, all changed projects inside a directory: `"{packages}[origin/master]"`
     * - `<pattern>` Restricts the scope to package names matching the given pattern. E.g.: `"foo"`, `"@bar/*"`
     * - `<pattern>...` Includes all direct and indirect dependencies of the matched packages. E.g.: `"foo..."`
     * - `<pattern>^...` Includes only the direct and indirect dependencies of the matched packages without including the matched packages themselves. E.g.: `"foo^..."`
     */
    filter?: string | string[];
    /**
     * Restricts the scope to package names matching the given pattern similar to {@link filter}, but it ignores devDependencies when searching for dependencies and dependents.
     */
    filterProd?: string | string[];
    /**
     * Defines files related to tests. Useful with the changed since filter. When selecting only changed packages and their dependent packages, the dependent packages will be ignored in case a package has changes only in tests. Usage example: `{ filter:"...[origin/master]", testPattern=["test/*", "test"] }`
     */
    testPattern?: string | string[];
}
/**
 * Publishes a package to the npm registry.
 * run command `pnpm publish`,
 * Visit https://pnpm.io/9.x/cli/publish for documentation about this command.
 */
export const pnpm_publish = async (options: PnpmPublishOptions): Promise<void> => {
    const args = ["publish", "--json"];
    const cli_options = obj_omit(options, "cwd");
    for (const [key, value] of Object.entries(cli_options)) {
        if (value == null) {
            continue;
        }
        const cli_key = "--" + key.replace(/[A-Z]/g, (C) => `-${C.toLowerCase()}`);
        if (value === true) {
            args.push(cli_key);
        } else if (typeof value === "string") {
            args.push(cli_key, value);
        } else if (Array.isArray(value)) {
            args.push(cli_key, ...value);
        }
    }

    const job = Promise.withResolvers<void>();
    try {
        const cwd = options.cwd ? cwdResolver(normalizeFilePath(options.cwd)) : undefined;
        await $.spawn("pnpm", args, {
            shell: true,
            cwd: cwd,
        });
        job.resolve();
    } catch (e) {
        job.reject(e);
    }
    return job.promise;
};

export type PackageJsonLoose = {
    name?: string;
    version?: string;
    description?: string;
    main?: string;
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
    optionDependencies?: Record<string, string>;
    peerDependencies?: Record<string, string>;
    scripts?: { [key: string]: string };
    repository?: {
        type: string;
        url: string;
    };
    keywords?: string[];
    author?: string;
    license?: string;
    bugs?: {
        url?: string;
        email?: string;
    };
    homepage?: string;
    engines?: {
        node?: string;
        npm?: string;
        yarn?: string;
    };
    private?: boolean;
    files?: string[];
    bin?: { [key: string]: string } | string;
    man?: string | string[];
    directories?: {
        lib?: string;
        bin?: string;
        man?: string;
        doc?: string;
        example?: string;
    };
    publishConfig?: {
        registry?: string;
        tag?: string;
    };
    [key: string]: unknown;
};
