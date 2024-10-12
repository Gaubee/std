import * as YAML from "@std/yaml";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import node_path from "node:path";
import { build, emptyDir } from "@deno/dnt";
import denoJson from "./deno.json" with { type: "json" };
import { iter_map_not_null } from "@gaubee/util/collections";
import { globToRegExp } from "jsr:@std/path@1/glob-to-regexp";
import { $ } from "@gaubee/denokit/shell";
const normalize = (path: string) => path.split(node_path.sep).join(node_path.posix.sep);
const createResolver = (baseDir: string) => (...paths: string[]) => normalize(node_path.resolve(baseDir, ...paths));
const rootDir = fileURLToPath(import.meta.resolve("./"));
const resolveRootDir = createResolver(rootDir);
const npmDir = resolveRootDir(".npm");
const resolveNpmDir = createResolver(npmDir);
const readJson = <T extends object = object>(path: string) => JSON.parse(fs.readFileSync(path, "utf8"));
const writeJson = <T extends object = object>(
  path: string,
  data: T,
) => (fs.writeFileSync(path, JSON.stringify(data, null, 2)));

const buildPackage = async (workspace: Workspace, importMap: string, workspaces: Workspace[]) => {
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
  await build({
    entryPoints: entryPoints,
    outDir: nodeDir,
    test: false,
    shims: {
      deno: false,
    },
    importMap: importMap,
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

const createWorkspace = (packageName: string) => {
  const denoDir = resolveRootDir(packageName);
  const resolveDenoDir = createResolver(denoDir);
  const nodeDir = resolveNpmDir(packageName);
  const resolveNodeDir = createResolver(nodeDir);
  const denoJson = readJson(resolveDenoDir("deno.json"));
  const packageJson = readJson(resolveDenoDir("package.json"));
  return {
    alias: packageName,
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

if (import.meta.main) {
  const workspaces = denoJson.workspace.map(createWorkspace);

  /// 生成 pnpm-workspace.yaml 文件
  fs.writeFileSync(
    resolveNpmDir("pnpm-workspace.yaml"),
    YAML.stringify({
      packages: denoJson.workspace,
    }),
  );
  /// 生成共享的 import_map.json 文件
  const npmImportMapJson = {
    imports: Object.fromEntries(workspaces.map((w) => {
      return [w.name, "npm:" + w.name + "@*"];
    })),
  };
  const improt_map_json_path = resolveNpmDir("import_map.npm.json");
  writeJson(improt_map_json_path, npmImportMapJson);

  /// build pnpm package
  const isMatchName = globToRegExp(Deno.args[0] ?? "*");
  for (const workspace of workspaces) {
    if (isMatchName.test(workspace.alias)) {
      console.log(`%cstart building %c./${workspace.alias}/deno.json`, "color:gray", "color:green");
      await buildPackage(workspace, improt_map_json_path, workspaces);
    }
  }

  // pnpm install
  $.cd(npmDir);
  await $("pnpm", "install");
}
