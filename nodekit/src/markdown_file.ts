import {normalizeFilePath} from "@gaubee/node";
import fs from "node:fs";
import {matter} from "./front-matter/index.ts";
export {matter};
/**
 * read markdown file
 */
export const readMarkdown = <T>(path: string, options?: MarkdownOptions): matter.Result<T> => {
  return matter(fs.readFileSync(normalizeFilePath(path), options?.encoding));
};

export interface MarkdownOptions extends matter.ParseOptions {
  encoding?: NodeJS.BufferEncoding;
}

/**
 * write markdown file
 */
export const writeMarkdown = (path: string, content: string, data?: object, options?: MarkdownOptions): void => {
  fs.writeFileSync(normalizeFilePath(path), data ? matter.stringify(content, data, options) : content, options?.encoding);
};
