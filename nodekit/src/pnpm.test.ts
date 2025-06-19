import {pnpm_publish} from "./pnpm.ts";

Deno.test("pnpm", async () => {
  const result = await pnpm_publish({
    cwd: import.meta.resolve("../../.npm"),
    noGitChecks: true,
    recursive: true,
    // otp:"713846"
  });
  console.log(result);
});
