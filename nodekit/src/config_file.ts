import * as JSONC from "@std/jsonc";
import * as YAML from "@std/yaml";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
const normalize_path = (path: string) =>
  path.startsWith("file://") ? fileURLToPath(path) : path;

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
  beforeWrite?: (jsonContent: string) => string
): void => {
  let jsonContent = JSON.stringify(
    data,
    options?.replacer,
    options?.space ?? 2
  );
  if (beforeWrite) {
    jsonContent = beforeWrite(jsonContent);
  }
  writeText(path, jsonContent);
};
export type JsonStringifyOptions = {
  replacer?: (this: any, key: string, value: any) => any;
  space?: number | string;
};

/**
 * read yaml file
 */
export const readYaml = <T = any>(
  path: string,
  defaultValue?: () => T
): T => {
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
  beforeWrite?: (yamlContent: string) => string
): void => {
  let yamlContent = YAML.stringify(data, options);
  if (beforeWrite) {
    yamlContent = beforeWrite(yamlContent);
  }
  writeText(path, yamlContent);
};
export type YamlStringifyOptions = YAML.StringifyOptions;
