import fs from "node:fs";
import node_path from "node:path";
import process from "node:process";
import {fileURLToPath} from "node:url";
/**
 * 将一个路径格式化成标准的 posix 格式
 */
export const normalizeFilePath = (path: string | URL): string => {
  if (typeof path !== "string") {
    path = String(path);
  }
  if (path.startsWith("file://")) {
    path = fileURLToPath(path);
  }
  if (path.includes("\\")) {
    path = path.replaceAll("\\", "/");
  }
  return path;
};

/**
 * path.resolve 的柯里化函数
 */
export type PathResolver = ((...paths: string[]) => string) & {dirname: string};

/**
 * 创建一个 path.resolve 柯里化函数
 */
export const createResolver = (cwd: string): PathResolver => {
  return Object.assign(
    (...paths: string[]) => {
      return normalizeFilePath(node_path.resolve(cwd, ...paths));
    },
    {dirname: cwd},
  );
};

/**
 * 等同于 path.resolve(process.cwd(), ...paths)
 */
export const cwdResolver: PathResolver = /*@__PURE__*/ createResolver(process.cwd());

/**
 * 向上寻找某一个文件名，以它所在的目录创建 resolver
 */
export const createResolverByRootFile = (fromPath: string | URL = process.cwd(), rootFilename = "package.json"): PathResolver => {
  let rootDirname = normalizeFilePath(fromPath);
  while (false === fs.existsSync(node_path.resolve(rootDirname, rootFilename))) {
    rootDirname = node_path.resolve(rootDirname, "..");
  }
  return createResolver(rootDirname);
};
