/**
 * @module
 * 这是一个为文件遍历提供的工具，内置了 ignore/match 配置
 */
import {normalizeFilePath} from "@gaubee/node";
import {obj_lazify} from "@gaubee/util";
import type matter from "gray-matter";
import type {Buffer} from "node:buffer";
import node_fs from "node:fs";
import node_path from "node:path";
import process from "node:process";
import {type JsonStringifyOptions, readJson, readToml, readYaml, writeJson, writeToml, writeYaml, type YamlStringifyOptions} from "./config_file.ts";
import {Ignore} from "./ignore.ts";
import {type MarkdownOptions, readMarkdown, writeMarkdown} from "./markdown_file.ts";

export type WalkOptions = {
  ignore?: string | string[] | ((entry: WalkEntry) => boolean);
  ignoreFile?: string | string[] | ((entry: FileEntry) => boolean);
  ignoreDir?: string | string[] | ((entry: DirectoryEntry) => boolean);
  match?: string | string[] | ((entry: WalkEntry) => boolean);
  matchFile?: string | string[] | ((entry: FileEntry) => boolean);
  matchDir?: string | string[] | ((entry: DirectoryEntry) => boolean);
  workspace?: string;
  deepth?: number;
  self?: boolean;
  log?: boolean;
};

export type WalkEntry = FileEntry | DirectoryEntry;

abstract class Entry {
  constructor(
    readonly path: string,
    private options?: {
      cwd?: string;
      state?: node_fs.Stats;
    },
  ) {
    obj_lazify(Entry.prototype, this);
  }
  get stats(): node_fs.Stats {
    return this.options?.state ?? node_fs.statSync(this.path);
  }
  get isSymbol(): boolean {
    return this.stats.isSymbolicLink();
  }
  get cwd(): string {
    return normalizeFilePath(this.options?.cwd ?? process.cwd());
  }
  get dir(): string {
    return normalizeFilePath(node_path.dirname(this.path));
  }
  get name(): string {
    return node_path.basename(this.path);
  }

  get relativePath(): string {
    return normalizeFilePath(node_path.relative(this.cwd, this.path));
  }
  get relativeDir(): string {
    return normalizeFilePath(node_path.relative(this.cwd, this.dir));
  }
  remove(options?: node_fs.RmOptions): void {
    node_fs.rmSync(this.path, options);
  }
  copy(args: {path?: string; cwd?: string}): WalkEntry | undefined {
    const {path = this.path, cwd = this.cwd} = args;
    return genEntry(path, cwd);
  }
}
export type TextEncoding = "ascii" | "utf8" | "utf-8" | "utf16le" | "utf-16le" | "ucs2" | "ucs-2" | "base64" | "base64url" | "latin1" | "binary" | "hex";
export class FileEntry extends Entry {
  readonly isFile = true as const;
  readonly isDirectory = false as const;
  /** 读取二进制源文件 */
  read(): Buffer {
    return node_fs.readFileSync(this.path);
  }
  /** 读取文本 */
  readText(encoding: TextEncoding = "utf8"): string {
    return node_fs.readFileSync(this.path, encoding);
  }
  /** 以json/jsonc的格式读取文件 */
  readJson<T>(defaultValue?: () => T): T {
    return readJson<T>(this.path, defaultValue);
  }
  /** 以 yaml 的格式读取文件 */
  readYaml<T>(defaultValue?: () => T): T {
    return readYaml<T>(this.path, defaultValue);
  }
  /** 写入文件 */
  write(content: string | Uint8Array, encoding?: TextEncoding): void {
    return node_fs.writeFileSync(this.path, content, encoding);
  }
  /** 写入文件以 json 格式 */
  writeJson(data: unknown, options?: JsonStringifyOptions): void {
    writeJson(this.path, data, options);
  }
  /** 写入文件以 yaml 格式 */
  writeYaml(data: unknown, options?: YamlStringifyOptions) {
    writeYaml(this.path, data, options);
  }
  /** 更新文件内容 */
  updateText(updater: (content: string) => string): void {
    const oldContent = this.readText();
    const newContent = updater(oldContent);
    if (newContent !== oldContent) {
      this.write(newContent);
    }
  }
  readMarkdown(options?: MarkdownOptions): matter.GrayMatterFile<string> {
    return readMarkdown(this.path, options);
  }
  writeMarkdown(content: string, data?: object, options?: MarkdownOptions): void {
    return writeMarkdown(this.path, content, data, options);
  }
  readToml<T>(defaultValue?: () => T): T {
    return readToml<T>(this.path, defaultValue);
  }
  writeToml<T extends Record<PropertyKey, never>>(data: T, beforeWrite?: (tomlContent: string) => string): void {
    return writeToml<T>(this.path, data, beforeWrite);
  }
  /** 获取文件后缀，不带 `.` */
  get ext(): string {
    return node_path.extname(this.name);
  }
}
export class DirectoryEntry extends Entry {
  readonly isFile = false as const;
  readonly isDirectory = true as const;
}
const genEntry = (path: string, cwd: string, ignore?: (entry: WalkEntry) => boolean | undefined, match?: (entry: WalkEntry) => boolean | undefined) => {
  let stats: node_fs.Stats;
  try {
    stats = node_fs.statSync(path);
  } catch {
    /// 有可能是空的 symbol-link
    return;
  }

  const isDirectory = stats.isDirectory();
  const isFile = stats.isFile();

  let entry: WalkEntry | undefined;
  if (isFile) {
    entry = new FileEntry(path, {cwd: cwd});
  } else if (isDirectory) {
    entry = new DirectoryEntry(path, {cwd: cwd});
  }
  if (!entry) {
    return;
  }
  if (ignore?.(entry)) {
    return;
  }
  if (match) {
    return match(entry) ? entry : void 0;
  }
  return entry;
};
const genIsMatch = <T extends Entry>(workspace: string, matcher?: string | string[] | ((entry: T) => boolean)) => {
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
      const ig = new Ignore(typeof matcher === "string" ? [matcher] : matcher, workspace);
      return (entry: Entry) => ig.isMatch(entry.path);
    }
  }
};

export function* walkAny(rootpath: string, options: WalkOptions = {}): Generator<WalkEntry, void, void> {
  rootpath = normalizeFilePath(rootpath);
  const {workspace = rootpath, deepth = Infinity, self = false, log = false} = options;
  const ignoreAny = genIsMatch(workspace, options.ignore);
  const ignoreFile = genIsMatch(workspace, options.ignoreFile);
  const ignoreDir = genIsMatch(workspace, options.ignoreDir);
  const ignore = (entry: WalkEntry) => {
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
  const match = (entry: WalkEntry) => {
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
  if (self) {
    const rootEntry = genEntry(rootpath, workspace, ignore, match);
    if (rootEntry) {
      yield rootEntry;
    } else {
      return;
    }
  }
  const dirs = [rootpath];
  for (const dirpath of dirs) {
    /// 在被yiled后，可能会被删除
    try {
      if (node_fs.statSync(dirpath).isDirectory() !== true) {
        continue;
      }
    } catch {
      continue;
    }
    if (deepth !== Infinity) {
      const relativedirpath = node_path.relative(dirpath, rootpath);
      const dirDeepth = relativedirpath === "" ? 0 : relativedirpath.split("/").length;
      // console.log(dirpath, dirDeepth);
      if (dirDeepth >= deepth) {
        continue;
      }
    }

    if (!node_fs.existsSync(dirpath)) {
      continue;
    }

    for (const entryname of node_fs.readdirSync(dirpath)) {
      const entry = genEntry(node_path.join(dirpath, entryname), workspace, ignore, match);
      if (!entry) {
        continue;
      }
      yield entry;
      if (entry.isDirectory) {
        dirs.push(entry.path);
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
