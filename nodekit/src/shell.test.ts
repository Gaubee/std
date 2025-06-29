import {assert, assertEquals, assertNotEquals, assertRejects} from "@std/assert";
import node_fs from "node:fs";
import node_os from "node:os";
import node_path from "node:path";
import process from "node:process";
import {$, $$} from "./shell.ts";

Deno.test("shell ls", () => {
  const entries = $.ls(import.meta.resolve("../"));
  assert(entries.length > 0);
  const entry = entries.find((e) => e.name === "shell.ts");
  assert(entry, "shell.ts should exist");
  assertEquals(entry.name, "shell.ts");
  assert(entry.isFile);
});

Deno.test("shell spawn", async () => {
  const res = await $.spawn("pnpm", "info @gaubee/nodekit");
  console.log("QAQ", res);
});

Deno.test("shell template", async () => {
  await $`npm info @gaubee/util`;
});

Deno.test("shell cd and cwd", () => {
  const currentCwd = $.cwd;
  const parentDir = node_path.dirname(currentCwd);
  $.cd("..");
  assertEquals($.cwd, parentDir);
  $.cd(currentCwd); // change back
  assertEquals($.cwd, currentCwd);
});

Deno.test("shell ls with options", () => {
  // Setup a temporary directory for testing ls
  const testDir = node_path.join(node_os.tmpdir(), "shell-ls-test");
  node_fs.mkdirSync(testDir, {recursive: true});
  node_fs.writeFileSync(node_path.join(testDir, "file1.txt"), "content1");
  node_fs.writeFileSync(node_path.join(testDir, "file2.log"), "content2");
  node_fs.mkdirSync(node_path.join(testDir, "subdir"));
  node_fs.writeFileSync(node_path.join(testDir, "subdir", "file3.txt"), "content3");
  node_fs.writeFileSync(node_path.join(testDir, ".ignored"), "ignored");

  const originalCwd = $.cwd;
  $.cd(testDir);

  try {
    // Test match
    let entries = $.ls("./", {match: "**/file*.txt"});
    assertEquals(entries.length, 2);
    assert(entries.some((e) => e.name === "file1.txt"));
    assert(entries.some((e) => e.name === "file3.txt"));

    // Test ignore
    entries = $.ls("./", {ignore: "*.log"});
    assertEquals(entries.length, 4); // file1.txt, subdir, .ignored, and subdir/file3.txt
    assert(!entries.some((e) => e.name === "file2.log"));

    // Test silence
    const consoleLog = console.log;
    let logCount = 0;
    console.log = () => logCount++;
    $.ls("./", {silence: true});
    assertEquals(logCount, 0);
    console.log = consoleLog; // Restore
  } finally {
    $.cd(originalCwd);
    node_fs.rmSync(testDir, {recursive: true, force: true});
  }
});

Deno.test("shell spawn with stdio", async () => {
  let stdoutData = "";
  let stderrData = "";

  await $.spawn("node", ["-e", `console.log('hello stdout'); console.error('hello stderr')`], {
    stdout: (stream) => {
      stream.on("data", (chunk) => (stdoutData += chunk.toString()));
    },
    stderr: (stream) => {
      stream.on("data", (chunk) => (stderrData += chunk.toString()));
    },
  });

  assertEquals(stdoutData.trim(), "hello stdout");
  assertEquals(stderrData.trim(), "hello stderr");
});

Deno.test("shell spawn with stdin", async () => {
  let output = "";
  await $.spawn("node", ["-e", `process.stdin.pipe(process.stdout)`], {
    stdin: (stream) => {
      stream.write("hello from stdin");
      stream.end();
    },
    stdout: (stream) => {
      stream.on("data", (chunk) => (output += chunk.toString()));
    },
  });
  assertEquals(output, "hello from stdin");
});

Deno.test("shell spawn with failure", async () => {
  await assertRejects(
    async () => {
      await $.spawn("node", ["-e", "process.exit(1)"]);
    },
    Error,
    "code:1",
  );
});

import {normalizeFilePath} from "@gaubee/node";
Deno.test("$$ factory", () => {
  const tempDir = node_os.tmpdir();
  const customEnv = {...process.env, MY_VAR: "test"};
  const custom$ = $$({cwd: tempDir, env: customEnv});

  assertEquals(normalizeFilePath(custom$.cwd), normalizeFilePath(tempDir));
  assertEquals(custom$.env.MY_VAR, "test");
  assertNotEquals($.cwd, custom$.cwd);
});
