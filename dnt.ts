import fs from "node:fs";
import { fileURLToPath } from "node:url";
import node_path from "node:path";
import { build, emptyDir } from "@deno/dnt";
import denoJson from "./deno.json" with { type: "json" };
import { iter_map_not_null } from "@gaubee/util/collections";
import { globToRegExp } from "jsr:@std/path@1/glob-to-regexp";
const root = fileURLToPath(import.meta.resolve("./"));
const rootResolve = (...paths: string[]) => node_path.resolve(root, ...paths);
const outputDir = rootResolve(".npm");

const buildPackage = async (packageName: string) => {
  const denoJson = await import(`./${packageName}/deno.json`, { with: { type: "json" } }).then((j) => j.default);
  const packageJson = await import(`./${packageName}/package.json`, { with: { type: "json" } }).then(
    (j) => j.default,
    () => ({}),
  );
  await emptyDir(`${outputDir}/${packageName}`);
  await build({
    entryPoints: [
      ...Object.entries(denoJson.exports as Record<string, string>).map(([name, path]) => {
        return { name, path: rootResolve(packageName, path) };
      }),
      ...iter_map_not_null(fs.readdirSync(`./${packageName}/src`), (name) => {
        if (name.endsWith("global.ts")) {
          return { name: `./${name.slice(0, -3)}`, path: rootResolve(packageName, "src", name) };
        }
      }),
    ],
    outDir: `${outputDir}/${packageName}`,
    test: false,
    shims: {
      deno: false,
    },
    typeCheck: false,
    packageManager: "pnpm",
    package: {
      // package.json properties
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
      Deno.copyFileSync("LICENSE", `${outputDir}/${packageName}/LICENSE`);
      await Deno.copyFile(`${packageName}/README.md`, `${outputDir}/${packageName}/README.md`).catch(() =>
        console.warn("%cno found README.md", "color:yellow")
      );
    },
  });
};

if (import.meta.main) {
  const isMatchName = globToRegExp(Deno.args[0] ?? "*");
  for (const packageName of denoJson.workspace) {
    if (isMatchName.test(packageName)) {
      console.log(`%cstart building %c./${packageName}/deno.json`, "color:gray", "color:green");
      buildPackage(packageName);
    }
  }
}
