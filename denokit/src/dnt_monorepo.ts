import fs from "node:fs";
import node_path from "node:path";
import { build, emptyDir } from "@deno/dnt";
import { iter_map_not_null } from "@gaubee/util/collections";
import { globToRegExp } from "jsr:@std/path@1/glob-to-regexp";
import { $, normalize } from "./shell.ts";
import { readJson, writeJson, writeYaml } from "./config_file.ts";
import { isGlob } from "@std/path";
import { deepMerge } from "@std/collections";
// import type { str_replace_start } from "@gaubee/util/string";
const createResolver = (baseDir: string) => (...paths: string[]) => normalize(node_path.resolve(baseDir, ...paths));

/**
 * 将一个 deno-monorepo 编译成 pnpm monorepo
 * @param options
 */
export const dntMonorepo = async (
    options: {
        /** deno项目目录，默认是 cwd */
        rootDir?: string;
        /** 输出目录，默认是 `.npm` */
        npmDir?: string;
        /** 需要构建哪些项目 */
        filter?: string | string[];
        /** 是否要保留临时项目 importMap.json 文件 */
        keepTempImportMapJson?: boolean;
    } = {},
): Promise<void> => {
    const rootDir = normalize(options.rootDir ?? Deno.cwd());
    const resolveRootDir = createResolver(rootDir);
    const npmDir = normalize(options.npmDir ?? resolveRootDir(".npm"));
    const resolveNpmDir = createResolver(npmDir);
    const rootDenoJson = readJson<any>(resolveRootDir("deno.json"), () =>
        readJson(resolveRootDir("deno.jsonc"), () => {
            throw new Error("fail to load deno project config file");
        }));
    if (false === Array.isArray(rootDenoJson.workspace)) {
        throw new Error("dntMonorepo required deno project has workspace");
    }
    /**
     * 创建工作空间
     */
    const createWorkspace = (packageName: string) => {
        const denoDir = resolveRootDir(packageName);
        const resolveDenoDir = createResolver(denoDir);
        const nodeDir = resolveNpmDir(packageName);
        const resolveNodeDir = createResolver(nodeDir);
        const denoJson = readJson(resolveDenoDir("deno.json"), () => readJson(resolveDenoDir("deno.jsonc")));
        const packageJson = readJson(resolveDenoDir("package.json"), () => ({}));
        return {
            alias: normalize(node_path.relative(rootDir, denoDir)),
            name: denoJson.name as string,
            version: denoJson.version as string,
            denoDir,
            resolveDenoDir,
            nodeDir,
            resolveNodeDir,
            denoJson,
            packageJson,
        };
    };
    type Workspace = ReturnType<typeof createWorkspace>;

    const workspaces = (rootDenoJson.workspace as Array<string>).map(createWorkspace);

    /// 生成 pnpm-workspace.yaml 文件
    writeYaml(
        resolveNpmDir("pnpm-workspace.yaml"),
        {
            packages: rootDenoJson.workspace,
        },
    );
    /// 生成共享的 import_map.json 文件
    const npmImportMapJson = {
        imports: Object.fromEntries(workspaces.map((w) => {
            return [w.name, "npm:" + w.name + "@*"];
        })),
    };
    const improt_map_json_path = resolveNpmDir("import_map.npm.json");
    writeJson(improt_map_json_path, npmImportMapJson);

    const buildPackage = async (workspace: Workspace, importMap: string) => {
        const {
            alias: packageName,
            resolveDenoDir,
            nodeDir,
            resolveNodeDir,
            denoJson,
            packageJson,
        } = workspace;

        await emptyDir(nodeDir);
        const entryPoints = [
            ...Object.entries(denoJson.exports as Record<string, string>).map(([name, path]) => {
                return { name, path: resolveDenoDir(path) };
            }),
            ...iter_map_not_null(fs.readdirSync(resolveDenoDir("src")), (name) => {
                if (name.endsWith("global.ts")) {
                    return { name: `./${name.slice(0, -3)}`, path: resolveDenoDir("src", name) };
                }
            }),
        ];

        /// 如果项目由有自己的 imports 配置，那么混合自有的 imports 配置
        let tmpImportMap: string | undefined;
        if (denoJson.imports || denoJson.importMap) {
            const tmp_import_map_file_name = `.import_map.npm.${crypto.randomUUID()}.json`;
            if (denoJson.imports) {
                /// 在项目目录下，和 deno.json 同级的目录，创建 临时文件
                tmpImportMap = resolveDenoDir(tmp_import_map_file_name);

                writeJson(
                    tmpImportMap,
                    deepMerge({
                        imports: denoJson.imports,
                    }, readJson(importMap)),
                );
            } else if (denoJson.importMap) {
                /// 到 denoJson.importMap 文件同级目录的地方创建 临时文件
                tmpImportMap = resolveDenoDir(denoJson.importMap, "..", tmp_import_map_file_name);
                writeJson(
                    tmpImportMap,
                    deepMerge(
                        readJson(resolveDenoDir(denoJson.importMap)),
                        readJson(importMap),
                    ),
                );
            }
        }

        // /// 修复 import 配置
        // {
        //     const importMapJson = readJson(tmpImportMap ?? importMap);
        //     for (const [key, version] of Object.entries(importMapJson.imports as Record<string, string>)) {
        //         if (version.startsWith("jsr:")) {
        //             /// @TODO dnt should support jsr
        //             importMapJson.imports[key] = "npm:@jsr/" +
        //                 str_replace_start(version, "jsr:", "").replace("@", "").replace(
        //                     "/",
        //                     "__",
        //                 );
        //         }
        //     }
        //     writeJson(tmpImportMap ?? importMap, importMapJson);
        // }

        await build({
            entryPoints: entryPoints,
            outDir: nodeDir,
            test: false,
            shims: {
                deno: false,
            },
            importMap: tmpImportMap ?? importMap,
            typeCheck: false,
            packageManager: "pnpm",
            skipNpmInstall: true,
            package: {
                name: denoJson.name,
                version: denoJson.version,
                license: "MIT",
                repository: {
                    type: "git",
                    url: `https://github.com/gaubee/std/tree/main/${packageName}`,
                },
                bugs: {
                    url: `https://github.com/gaubee/std/issues?q=label%3A${packageName}`,
                },
                ...packageJson,
            },
            compilerOptions: {
                importHelpers: true,
                target: "ES2023",
                lib: ["ESNext"],
            },
            async postBuild() {
                // steps to run after building and before running the tests
                Deno.copyFileSync(resolveRootDir("LICENSE"), resolveNodeDir("LICENSE"));
                await Deno.copyFile(resolveDenoDir(`README.md`), resolveNodeDir(`README.md`)).catch(() =>
                    console.warn("%cno found README.md", "color:yellow")
                );
            },
        });

        /// 编译完后，移除临时文件
        if (tmpImportMap && !options.keepTempImportMapJson) {
            Deno.removeSync(tmpImportMap);
        }

        /// 最后需要对 packageJson 做一些依赖修复工作，修复成 pnpm-workspace 标准
        {
            const npm_package_json_path = resolveNodeDir("package.json");
            const packageJson = readJson(npm_package_json_path);
            for (const dep in packageJson.dependencies) {
                if (workspaces.find((w) => w.name === dep) != null) {
                    packageJson.dependencies[dep] = "workspace:*";
                }
            }
            writeJson(npm_package_json_path, packageJson);
        }
    };

    /// build pnpm package
    let aliasFilter = (_alias: string) => true;
    const filter = options.filter;
    if (typeof filter === "string") {
        aliasFilter = gen_filter_func(filter);
    } else if (Array.isArray(filter)) {
        const filterFuns = filter.map(gen_filter_func);
        aliasFilter = (alias) => filterFuns.some((fun) => fun(alias));
    }

    for (const workspace of workspaces) {
        if (aliasFilter(workspace.alias)) {
            console.log(`%cstart building %c${workspace.alias}`, "color:gray", "color:green");
            await buildPackage(workspace, improt_map_json_path);
        }
    }

    // pnpm install
    $.cd(npmDir);
    await $("pnpm", "install");
};

const gen_filter_func = (filter: string) => {
    if (isGlob(filter)) {
        const filterReg = globToRegExp(filter);
        return (alias: string) => filterReg.test(alias);
    } else {
        return (alias: string) => alias === filter;
    }
};
