import { build, emptyDir } from "@deno/dnt";
import denoJson from "./deno.json" with { type: "json" };

await emptyDir("./npm");

await build({
  entryPoints: Object.entries(denoJson.exports).map(([name, path]) => {
    return { name, path };
  }),
  outDir: "./npm",
  test: true,
  shims: {
    deno: false,
  },
  typeCheck: false,
  packageManager: "pnpm",
  package: {
    // package.json properties
    name: "@gaubee/util",
    version: Deno.args[0],
    description: "an util-lib for your application",
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
