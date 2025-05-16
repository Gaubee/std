import {normalizeFilePath} from "@gaubee/node";
import matter from "gray-matter";
import fs from "node:fs";
export {matter};
/**
 * read markdown file
 */
export const readMarkdown = (path: string, options?: MarkdownOptions): matter.GrayMatterFile<string> => {
  return matter(fs.readFileSync(normalizeFilePath(path), options?.encoding)) as matter.GrayMatterFile<string>;
};

export type MarkdownOptions = Pick<matter.GrayMatterOption<string, any>, "engines" | "delimiters" | "language"> & {
  encoding?: NodeJS.BufferEncoding;
};
/**
 * write markdown file
 */
export const writeMarkdown = (path: string, content: string, data?: object, options?: MarkdownOptions): void => {
  fs.writeFileSync(normalizeFilePath(path), data ? matter.stringify(content, data, options) : content, options?.encoding);
};
