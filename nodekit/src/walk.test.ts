import { assertEquals, assert } from "@std/assert";
import node_fs from "node:fs";
import node_os from "node:os";
import node_path from "node:path";
import { walkAny, walkDirs, walkFiles } from "./walk.ts";

function setupTestDir() {
  const testDir = node_path.join(node_os.tmpdir(), `fs-walk-test-${Date.now()}`);
  node_fs.mkdirSync(testDir, { recursive: true });
  
  // Create a structure
  node_fs.writeFileSync(node_path.join(testDir, "file1.txt"), "content1");
  node_fs.writeFileSync(node_path.join(testDir, "file2.log"), "content2");
  node_fs.mkdirSync(node_path.join(testDir, "dir1"));
  node_fs.writeFileSync(node_path.join(testDir, "dir1", "file3.txt"), "content3");
  node_fs.mkdirSync(node_path.join(testDir, "dir1", "dir2"));
  node_fs.writeFileSync(node_path.join(testDir, "dir1", "dir2", "file4.md"), "content4");
  node_fs.writeFileSync(node_path.join(testDir, ".hidden"), "hidden");

  return testDir;
}

function getRelativePaths(entries: ReturnType<typeof walkAny>) {
  return Array.from(entries).map(e => e.relativePath.replace(/\\/g, "/"));
}

Deno.test("walkAny: basic traversal", () => {
  const testDir = setupTestDir();
  try {
    const entries = walkAny(testDir);
    const paths = getRelativePaths(entries);
    
    assertEquals(paths.length, 7);
    assert(paths.includes("file1.txt"));
    assert(paths.includes("file2.log"));
    assert(paths.includes("dir1"));
    assert(paths.includes("dir1/file3.txt"));
    assert(paths.includes("dir1/dir2"));
    assert(paths.includes("dir1/dir2/file4.md"));
    assert(paths.includes(".hidden"));
  } finally {
    node_fs.rmSync(testDir, { recursive: true, force: true });
  }
});

Deno.test("walkAny: with match option", () => {
  const testDir = setupTestDir();
  try {
    const entries = walkAny(testDir, { match: "**/*.txt" });
    const paths = getRelativePaths(entries);
    
    assertEquals(paths.length, 2);
    assert(paths.includes("file1.txt"));
    assert(paths.includes("dir1/file3.txt"));
  } finally {
    node_fs.rmSync(testDir, { recursive: true, force: true });
  }
});

Deno.test("walkAny: with ignore option", () => {
  const testDir = setupTestDir();
  try {
    const entries = walkAny(testDir, { ignore: "dir1" });
    const paths = getRelativePaths(entries);

    assertEquals(paths.length, 3);
    assert(paths.includes("file1.txt"));
    assert(paths.includes("file2.log"));
    assert(paths.includes(".hidden"));
  } finally {
    node_fs.rmSync(testDir, { recursive: true, force: true });
  }
});


Deno.test("walkAny: with deepth option", () => {
  const testDir = setupTestDir();
  try {
    const entries = walkAny(testDir, { deepth: 1 });
    const paths = getRelativePaths(entries);
    
    assertEquals(paths.length, 4);
    assert(paths.includes("file1.txt"));
    assert(paths.includes("file2.log"));
    assert(paths.includes("dir1"));
    assert(paths.includes(".hidden"));
  } finally {
    node_fs.rmSync(testDir, { recursive: true, force: true });
  }
});

Deno.test("walkAny: with self option", () => {
  const testDir = setupTestDir();
  try {
    const entries = walkAny(testDir, { self: true, deepth: 0 });
    const paths = getRelativePaths(entries);
    
    assertEquals(paths.length, 1);
    assertEquals(paths[0], ""); // The root itself has an empty relative path
  } finally {
    node_fs.rmSync(testDir, { recursive: true, force: true });
  }
});

Deno.test("walkAny: with matchDir and matchFile", () => {
    const testDir = setupTestDir();
    try {
      const entries = walkAny(testDir, { matchFile: "*.log", matchDir: "dir1" });
      const paths = getRelativePaths(entries);
      
      assertEquals(paths.length, 2);
      assert(paths.includes("file2.log"));
      assert(paths.includes("dir1"));
    } finally {
      node_fs.rmSync(testDir, { recursive: true, force: true });
    }
  });

Deno.test("walkFiles", () => {
    const testDir = setupTestDir();
    try {
        const entries = walkFiles(testDir);
        const paths = getRelativePaths(entries);

        assertEquals(paths.length, 5);
        assert(paths.includes("file1.txt"));
        assert(paths.includes("file2.log"));
        assert(paths.includes("dir1/file3.txt"));
        assert(paths.includes("dir1/dir2/file4.md"));
    } finally {
        node_fs.rmSync(testDir, { recursive: true, force: true });
    }
});

Deno.test("walkDirs", () => {
    const testDir = setupTestDir();
    try {
        const entries = walkDirs(testDir);
        const paths = getRelativePaths(entries);

        assertEquals(paths.length, 2);
        assert(paths.includes("dir1"));
        assert(paths.includes("dir1/dir2"));
    } finally {
        node_fs.rmSync(testDir, { recursive: true, force: true });
    }
});
