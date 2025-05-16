import {build, type BuildOptions, emptyDir} from "@deno/dnt";
import {createResolver, normalizeFilePath} from "@gaubee/node";
import {readJson, writeJson, writeYaml} from "@gaubee/nodekit/config_file";
import type {PackageJsonLoose} from "@gaubee/nodekit/pnpm";
import {$} from "@gaubee/nodekit/shell";
import {iter_map_not_null, obj_lazify} from "@gaubee/util";
import {deepMerge} from "@std/collections/deep-merge";
import {globToRegExp, isGlob} from "@std/path";
import fs from "node:fs";
import node_path from "node:path";
import type {DenoJson, ImportMap} from "./types.ts";

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
    /** 清空输出文件夹 */
    clean?: boolean;
    /** 构建使用的包管理器 */
    packageManager?: BuildOptions["packageManager"];
  } = {},
): Promise<void> => {
  const rootDir = normalizeFilePath(options.rootDir ?? Deno.cwd());
  const resolveRootDir = createResolver(rootDir);
  const npmDir = normalizeFilePath(options.npmDir ?? resolveRootDir(".npm"));
  if (options.clean && fs.existsSync(npmDir)) {
    fs.rmSync(npmDir, {recursive: true});
  }
  fs.mkdirSync(npmDir, {recursive: true});
  const resolveNpmDir = createResolver(npmDir);
  const rootDenoJson = readJson<DenoJson>(resolveRootDir("deno.json"), () =>
    readJson(resolveRootDir("deno.jsonc"), () => {
      throw new Error("fail to load deno project config file");
    }),
  );
  const rootPackageJson = readJson<PackageJsonLoose>(resolveRootDir("deno.json"), () => ({}));
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
    const denoJson = readJson<DenoJson>(resolveDenoDir("deno.json"), () => readJson(resolveDenoDir("deno.jsonc")));
    const packageJson = readJson<PackageJsonLoose>(resolveDenoDir("package.json"), () => ({}));

    return obj_lazify({
      alias: normalizeFilePath(node_path.relative(rootDir, denoDir)),
      name: denoJson.name as string,
      /**可以在路径中使用的 name */
      get safeName() {
        return this.alias.replace("@", "").replace("/", "__");
      },
      version: denoJson.version as string,
      denoDir,
      resolveDenoDir,
      nodeDir,
      resolveNodeDir,
      denoJson,
      packageJson,
    } as const);
  };
  type Workspace = ReturnType<typeof createWorkspace>;

  const workspaces = (rootDenoJson.workspace as Array<string>).map(createWorkspace);

  /// 生成 pnpm-workspace.yaml 文件
  writeYaml(resolveNpmDir("pnpm-workspace.yaml"), {
    packages: rootDenoJson.workspace,
  });
  const importMapBeforeJson = importMapFromDenoJsonAndPackageJson(rootDenoJson, rootPackageJson);
  const importMapAfterJson = {
    imports: {
      ...Object.fromEntries(
        workspaces.map((w) => {
          return [w.name, "npm:" + w.name + "@*"];
        }),
      ),
    },
  } satisfies ImportMap;
  /**
   * 如果项目由有自己的 imports 配置，那么混合自有的 imports 配置
   * importMap的混合优先级：
   * rootDenoJson < rootPackageJson < workspaceDenoJson < workspacePackageJson < pnpm/deno-workspaces
   */
  const buildImportMap = (importMap: ImportMap): ImportMap => {
    return deepMerge(deepMerge(importMapBeforeJson as any, importMap as any), importMapAfterJson);
  };

  const buildPackage = async (workspace: Workspace) => {
    const {alias: packageName, resolveDenoDir, nodeDir, resolveNodeDir, denoJson, packageJson} = workspace;

    await emptyDir(nodeDir);
    const entryPoints = [
      ...Object.entries(denoJson.exports as Record<string, string>).map(([name, path]) => {
        return {name, path: resolveDenoDir(path)};
      }),
      ...iter_map_not_null(fs.readdirSync(resolveDenoDir("src")), (name) => {
        if (name.endsWith("global.ts")) {
          return {name: `./${name.slice(0, -3)}`, path: resolveDenoDir("src", name)};
        }
      }),
    ].sort((a, b) => a.name.localeCompare(b.name));

    /// 生成 import_map.json 文件
    const importMapJson = buildImportMap(importMapFromDenoJsonAndPackageJson(denoJson, packageJson));
    const import_map_file = resolveNpmDir(`import_map.npm.${workspace.safeName}.json`);
    writeJson(import_map_file, importMapJson);

    await build({
      entryPoints: entryPoints,
      outDir: nodeDir,
      test: false,
      shims: {
        deno: false,
      },
      importMap: import_map_file,
      typeCheck: false,
      packageManager: options.packageManager,
      skipNpmInstall: true,
      package: {
        name: workspace.name,
        version: workspace.version,
        license: "MIT",
        repository: {
          type: "git",
          url: `https://github.com/gaubee/std`,
        },
        homepage: `https://github.com/gaubee/std/tree/main/${packageName}`,
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
        await Deno.copyFile(resolveDenoDir(`README.md`), resolveNodeDir(`README.md`)).catch(() => console.warn("%cno found README.md", "color:yellow"));

        /// 修复dnt的一些问题
        const dntPolyfillsPaths = [resolveNodeDir("esm/_dnt.polyfills.d.ts"), resolveNodeDir("script/_dnt.polyfills.d.ts")];
        for (const dntPolyfillsPath of dntPolyfillsPaths) {
          console.log("QAQ fix", dntPolyfillsPath);
          if (fs.existsSync(dntPolyfillsPath)) {
            fs.writeFileSync(dntPolyfillsPath, "export {};\n" + fs.readFileSync(dntPolyfillsPath));
          }
        }
      },
      ...denoJson.dnt,
    });

    /// 最后需要对 packageJson 做一些依赖修复工作，修复成 pnpm-workspace 标准
    {
      const npm_package_json_path = resolveNodeDir("package.json");
      const packageJson = readJson(npm_package_json_path);
      const {peerDependencies = {}} = packageJson;
      for (const dep in packageJson.dependencies) {
        if (workspaces.find((w) => w.name === dep) != null) {
          if (peerDependencies[dep]) {
            delete packageJson.dependencies[dep];
          } else {
            packageJson.dependencies[dep] = "workspace:^*";
          }
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
    if (workspace.packageJson.private != true && aliasFilter(workspace.alias)) {
      console.log(`%cstart building %c${workspace.alias}`, "color:gray", "color:green");
      await buildPackage(workspace);
    }
  }

  // pnpm install
  $.cd(npmDir);
  console.log("$.cwd", $.cwd, await $`pwd`.text());
  await $`pnpm install`.printCommand();
};

const gen_filter_func = (filter: string) => {
  if (isGlob(filter)) {
    const filterReg = globToRegExp(filter);
    return (alias: string) => filterReg.test(alias);
  } else {
    return (alias: string) => alias === filter;
  }
};

const importMapFromDenoJsonAndPackageJson = (denoJson: DenoJson, packageJson: PackageJsonLoose): ImportMap => {
  return {
    imports: {
      ...denoJson.imports,
      ...Object.fromEntries(
        Object.entries(deepMerge(packageJson.devDependencies ?? {}, packageJson.dependencies ?? {})).map(([name, version]) => {
          return [name, `npm:${name}@${version}`];
        }),
      ),
    },
    scopes: denoJson.scopes ?? {},
  } satisfies ImportMap;
};
