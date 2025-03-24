import matter, { GrayMatterFile } from "gray-matter";
import fs from "node:fs";
import { normalizeFilePath } from "./path.ts";
/**
 * read markdown file
 */
export const readMarkdown = (path: string, options?: MarkdownOptions) => {
    return matter(fs.readFileSync(normalizeFilePath(path), options?.encoding)) as GrayMatterFile<string>;
};

export type MarkdownOptions = Pick<matter.GrayMatterOption<string, any>, "engines" | "delimiters" | "language"> & {
    encoding?: NodeJS.BufferEncoding;
};
/**
 * write markdown file
 */
export const writeMarkdown = (path: string, content: string, data?: object, options?: MarkdownOptions) => {
    fs.writeFileSync(
        normalizeFilePath(path),
        data ? matter.stringify(content, data, options) : content,
        options?.encoding,
    );
};
