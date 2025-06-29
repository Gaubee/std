import {assert, assertEquals} from "@std/assert";
import * as path from "@std/path";
import {Ignore} from "./ignore.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));

Deno.test("Ignore with 'git' style", () => {
  const rules = ["/node_modules", "dist/*", "*.log", "!/dist/important.js"];
  const ignore = new Ignore(rules, __dirname, {style: "git"});

  // Test ignored files
  assert(ignore.isMatch(path.join(__dirname, "node_modules/express/index.js")));
  assert(ignore.isMatch(path.join(__dirname, "dist/bundle.js")));
  assert(ignore.isMatch(path.join(__dirname, "error.log")));
  assert(ignore.isMatch("dist/app.js"));

  // Test not ignored files (negation)
  assertEquals(ignore.isMatch(path.join(__dirname, "dist/important.js")), false);

  // Test other not ignored files
  assertEquals(ignore.isMatch(path.join(__dirname, "src/main.ts")), false);
  assertEquals(ignore.isMatch("src/component.ts"), false);
});

Deno.test("Ignore with 'npm' style", () => {
  const rules = ["node_modules/**", "coverage/**", "**/*.swp"];
  const ignore = new Ignore(rules, __dirname, {style: "npm"});

  assert(ignore.isMatch("node_modules/some_package/index.js"));
  assert(ignore.isMatch("coverage/report.html"));
  assert(ignore.isMatch(".index.js.swp"));
  assert(ignore.isMatch("lib/foo.swp"));

  assertEquals(ignore.isMatch("src/index.js"), false);
});

Deno.test("Ignore with 'glob' style", () => {
  const rules = ["**/temp/*", "output/**/*.json"];
  const ignore = new Ignore(rules, __dirname, {style: "glob"});

  assert(ignore.isMatch("project/temp/file.tmp"));
  assert(ignore.isMatch("output/data/result.json"));

  assertEquals(ignore.isMatch("project/data/file.txt"), false);
  assertEquals(ignore.isMatch("output/image.png"), false);
});

Deno.test("Ignore with 'search' style", () => {
  const rules = ["debug", ".test."];
  const ignore = new Ignore(rules, __dirname, {style: "search"});

  assert(ignore.isMatch("src/debug_utils.ts"));
  assert(ignore.isMatch("src/component.test.ts"));

  assertEquals(ignore.isMatch("src/main.ts"), false);
});

Deno.test("Ignore.fromIgnoreFile", async (t) => {
  const tempDir = await Deno.makeTempDir();

  await t.step("should load .gitignore and use 'git' style", async () => {
    const gitignorePath = path.join(tempDir, ".gitignore");
    const content = `
# Comments should be ignored
/dist
*.tmp
    `;
    await Deno.writeTextFile(gitignorePath, content);
    const ignore = Ignore.fromIgnoreFile(gitignorePath);

    assertEquals(ignore.rules, ["/dist", "*.tmp"]);
    assert(ignore.isMatch("dist/index.js"));
    assert(ignore.isMatch("temp.tmp"));
    assertEquals(ignore.isMatch("src/app.js"), false);
  });

  await t.step("should load .npmignore and use 'npm' style", async () => {
    const npmignorePath = path.join(tempDir, ".npmignore");
    const content = `
*.log
build/**
    `;
    await Deno.writeTextFile(npmignorePath, content);
    const ignore = Ignore.fromIgnoreFile(npmignorePath);

    assert(ignore.isMatch("error.log"));
    assert(ignore.isMatch("build/app.js"));
    assertEquals(ignore.isMatch("source/main.js"), false);
  });

  await t.step("should load custom ignore file and use 'glob' style", async () => {
    const customIgnorePath = path.join(tempDir, "custom.ignore-rules");
    // .ignore-rules does not contain 'npmignore' or 'gitignore', so it defaults to 'glob' style.
    const content = `
**/*.spec.ts
config.json
    `;
    await Deno.writeTextFile(customIgnorePath, content);
    const ignore = Ignore.fromIgnoreFile(customIgnorePath);

    assert(ignore.isMatch("src/components/button.spec.ts"));
    assert(ignore.isMatch("config.json"));
    assertEquals(ignore.isMatch("src/main.ts"), false);
  });

  await Deno.remove(tempDir, {recursive: true});
});

Deno.test("Ignore should handle relative and absolute paths", () => {
  const rules = ["build/"];
  const cwd = path.join(__dirname, "project");
  const ignore = new Ignore(rules, cwd, {style: "git"});

  // relative path
  assert(ignore.isMatch("build/asset.css"));
  // absolute path
  assert(ignore.isMatch(path.join(cwd, "build/asset.css")));
  // outside path
  assertEquals(ignore.isMatch(path.join(__dirname, "other/build/asset.css")), false);
});
