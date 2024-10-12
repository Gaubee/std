import { $ } from "./shell.ts";

if (import.meta.main) {
    $.ls(import.meta.resolve("../"));
    await $("npm", "info @gaubee/util");
}
