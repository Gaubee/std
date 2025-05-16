import {$} from "./shell.ts";

if (import.meta.main) {
  $.ls(import.meta.resolve("../"));
  await $.spawn("npm", "info @gaubee/util");
  await $`npm info @gaubee/util`;
}
