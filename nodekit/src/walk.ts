/**
 * @module
 * 这是一个为文件遍历提供的工具，内置了 ignore/match 配置
 */
import {normalizeFilePath} from "@gaubee/node";
import node_fs from "node:fs";
import node_path from "node:path";
import {type AnyEntry, DirectoryEntry, FileEntry} from "./fs_entry.ts";
import {Ignore} from "./ignore.ts";

export type WalkOptions = {
  ignore?: string | string[] | ((entry: AnyEntry) => boolean);
  ignoreFile?: string | string[] | ((entry: FileEntry) => boolean);
  ignoreDir?: string | string[] | ((entry: DirectoryEntry) => boolean);
  match?: string | string[] | ((entry: AnyEntry) => boolean);
  matchFile?: string | string[] | ((entry: FileEntry) => boolean);
  matchDir?: string | string[] | ((entry: DirectoryEntry) => boolean);
  workspace?: string;
  deepth?: number;
  self?: boolean;
  log?: boolean;
};

const genEntry = (path: string, cwd: string, state?: node_fs.Stats) => {
  let stats: node_fs.Stats;
  if (state) {
    stats = state;
  } else {
    try {
      stats = node_fs.statSync(path);
    } catch {
      /// 有可能是空的 symbol-link
      return;
    }
  }

  const isDirectory = stats.isDirectory();
  const isFile = stats.isFile();

  if (isFile) {
    return new FileEntry(path, {cwd: cwd, state});
  } else if (isDirectory) {
    return new DirectoryEntry(path, {cwd: cwd, state});
  }
};
const genIsMatch = <T extends AnyEntry>(workspace: string, matcher?: string | string[] | ((entry: T) => boolean)) => {
  if (!matcher) {
    return;
  }
  switch (typeof matcher) {
    case "function":
      return matcher;
    // deno-lint-ignore no-fallthrough
    case "string":
      matcher = [matcher];
    default: {
      const ig = new Ignore(typeof matcher === "string" ? [matcher] : matcher, workspace, {style: "npm"});
      return (entry: AnyEntry) => ig.isMatch(entry.path);
    }
  }
};

export function* walkAny(rootpath: string, options: WalkOptions = {}): Generator<AnyEntry, void, void> {
  rootpath = normalizeFilePath(rootpath);
  const {workspace = rootpath, deepth = Infinity, self = false, log = false} = options;
  const ignoreAny = genIsMatch(workspace, options.ignore);
  const ignoreFile = genIsMatch(workspace, options.ignoreFile);
  const ignoreDir = genIsMatch(workspace, options.ignoreDir);
  const ignore = (entry: AnyEntry) => {
    if (ignoreAny?.(entry)) {
      return true;
    }
    if (entry.isFile) {
      return ignoreFile?.(entry);
    } else {
      return ignoreDir?.(entry);
    }
  };
  const matchAny = genIsMatch(workspace, options.match);
  const matchFile = genIsMatch(workspace, options.matchFile);
  const matchDir = genIsMatch(workspace, options.matchDir);
  const match = (entry: AnyEntry) => {
    if (entry.isFile) {
      if (matchFile) {
        return matchFile(entry);
      }
    } else {
      if (matchDir) {
        return matchDir(entry);
      }
    }
    if (matchAny) {
      return matchAny(entry);
    }
    return true;
  };

  if (log) {
    console.log("start", rootpath);
  }

  const rootEntry = genEntry(rootpath, workspace);
  if (!rootEntry || ignore(rootEntry)) {
    return;
  }
  if (self) {
    if (match(rootEntry)) {
      yield rootEntry;
    }
  }

  if (!rootEntry.isDirectory) {
    return;
  }

  const dirs: DirectoryEntry[] = [rootEntry];
  for (const dirEntry of dirs) {
    if (deepth !== Infinity) {
      const relativedirpath = node_path.relative(rootpath, dirEntry.path);
      const dirDeepth = relativedirpath === "" ? 0 : relativedirpath.split("/").length;
      if (dirDeepth >= deepth) {
        continue;
      }
    }

    for (const entryname of node_fs.readdirSync(dirEntry.path)) {
      const entry = genEntry(node_path.join(dirEntry.path, entryname), workspace);
      if (!entry || ignore(entry)) {
        continue;
      }

      if (entry.isDirectory) {
        dirs.push(entry);
      }

      if (match(entry)) {
        yield entry;
      }
    }
  }
}

export function* walkFiles(rootpath: string, options?: WalkOptions): Generator<FileEntry, void, void> {
  for (const entry of walkAny(rootpath, options)) {
    if (entry.isFile) {
      yield entry;
    }
  }
}

export function* walkDirs(rootpath: string, options?: WalkOptions): Generator<DirectoryEntry, void, void> {
  for (const entry of walkAny(rootpath, options)) {
    if (entry.isDirectory) {
      yield entry;
    }
  }
}
