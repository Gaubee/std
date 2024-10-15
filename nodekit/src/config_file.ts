import * as JSONC from "@std/jsonc";
import * as YAML from "@std/yaml";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
const normalize_path = (path: string) => path.startsWith("file://") ? fileURLToPath(path) : path;

export const writeText = (path: string, content: string): void => {
    path = normalize_path(path);
    try {
        fs.writeFileSync(normalize_path(path), content);
    } catch (e) {
        if (e instanceof Error && e.message.startsWith("ENOENT:")) {
            throw new Error(e.message + " " + path);
        }
        throw e;
    }
};
/**
 * read json or jsonc file
 */
export const readJson = <T = any>(path: string, defaultValue?: () => T): T => {
    try {
        return JSONC.parse(fs.readFileSync(normalize_path(path), "utf8")) as T;
    } catch (e) {
        if (defaultValue) {
            return defaultValue();
        }
        throw e;
    }
};
/**
 * write json file
 */
export const writeJson = <T>(
    path: string,
    data: T,
    options?: JsonStringifyOptions,
): void => {
    writeText(path, JSON.stringify(data, options?.replacer, options?.space ?? 2));
};
export type JsonStringifyOptions = {
    replacer?: (this: any, key: string, value: any) => any;
    space?: number | string;
};

/**
 * read yaml file
 */
export const readYaml = <T extends object = any>(path: string, defaultValue?: () => T): T => {
    try {
        return YAML.parse(fs.readFileSync(normalize_path(path), "utf8")) as T;
    } catch (e) {
        if (defaultValue) {
            return defaultValue();
        }
        throw e;
    }
};

/**
 * write yaml file
 * @returns
 */
export const writeYaml = <T>(
    path: string,
    data: T,
    options?: YamlStringifyOptions,
): void => {
    writeText(path, YAML.stringify(data, options));
};
export type YamlStringifyOptions = YAML.StringifyOptions;
