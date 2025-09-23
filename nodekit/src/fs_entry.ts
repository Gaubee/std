import {normalizeFilePath} from "@gaubee/node";
import {obj_lazify} from "@gaubee/util";
import type {Buffer} from "node:buffer";
import node_fs from "node:fs";
import node_path from "node:path";
import process from "node:process";
import {type JsonStringifyOptions, readJson, readToml, readYaml, writeJson, writeToml, writeYaml, type YamlStringifyOptions} from "./config_file.ts";
import {type MarkdownOptions, matter, readMarkdown, writeMarkdown} from "./markdown_file.ts";
export type AnyEntry = FileEntry | DirectoryEntry;

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
  copy(args: {path?: string; cwd?: string}): AnyEntry | undefined {
    const {path = this.path, cwd = this.cwd} = args;
    // @ts-ignore
    return (this.constructor as any).from(path, cwd);
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
  readMarkdown<T = any>(options?: MarkdownOptions): matter.Result<T> {
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
