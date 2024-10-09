import fs from "node:fs";
import { build, emptyDir } from "@deno/dnt";
import denoJson from "./deno.json" with { type: "json" };
await emptyDir("./npm");
import "./src/collections.global.ts";

await build({
  entryPoints: [
    ...Object.entries(denoJson.exports).map(([name, path]) => {
      return { name, path };
    }),
    ...fs.readdirSync("./src").mapNotNull((name) => {
      if (name.endsWith("global.ts")) {
        return { name: `./${name.slice(0, -3)}`, path: `./src/${name}` };
      }
    }),
  ],
  outDir: "./npm",
  test: true,
  shims: {
    deno: { test: true },
  },
  typeCheck: false,
  packageManager: "pnpm",
  package: {
    // package.json properties
    name: denoJson.name,
    version: denoJson.version,
    description: "个人项目经验，主要特点在于对原型链的扩展，以及对异步的简化",
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/gaubee/gaubee-util.git",
    },
    bugs: {
      url: "https://github.com/gaubee/gaubee-util/issues",
    },
  },
  compilerOptions: {
    target: "ES2023",
    lib: ["ESNext"],
  },
  postBuild() {
    // steps to run after building and before running the tests
    Deno.copyFileSync("LICENSE", "npm/LICENSE");
    Deno.copyFileSync("README.md", "npm/README.md");
  },
});
