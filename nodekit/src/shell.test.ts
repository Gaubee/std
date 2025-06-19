import {$} from "./shell.ts";

Deno.test("shell", async () => {
  $.ls(import.meta.resolve("../"));
  await $.spawn("npm", "info @gaubee/util");
  await $`npm info @gaubee/util`;
});
