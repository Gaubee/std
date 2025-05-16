import {dntMonorepo} from "@gaubee/denokit/dnt_monorepo";
if (import.meta.main) {
  await dntMonorepo({
    rootDir: import.meta.resolve("./"),
    filter: Deno.args[0],
    clean: Deno.args[0] === undefined,
    packageManager: "pnpm",
  });
}
