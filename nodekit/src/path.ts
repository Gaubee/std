import node_path from "node:path";
import fs from "node:fs";
import process from "node:process";
import { fileURLToPath } from "node:url";
/**
 * 将一个路径格式化成标准的 posix 格式
 */
export const normalizeFilePath = (path: string | URL): string => {
    if (typeof path !== "string") {
        path = path.toString();
    }
    if (path.startsWith("file:///")) {
        path = fileURLToPath(path);
    }
    if (path.includes("\\")) {
        path = path.split(node_path.sep).join(node_path.posix.sep);
    }
    return path;
};

type PathResolver = (...paths: string[]) => string;
/**
 * 创建一个 path.resolve 柯里化函数
 */
export const createResolver = (cwd: string): PathResolver => {
    return Object.assign((...paths: string[]) => {
        return normalizeFilePath(node_path.resolve(cwd, ...paths));
    }, { dirname: cwd });
};

/**
 * 等同于 path.resolve(process.cwd(), ...paths)
 */
export const resolveCwd: PathResolver = createResolver(process.cwd());

/** 寻找一个包文件目录 */
export const createProjectResolver = (fromPath: string | URL = process.cwd(), projectRootFilename = "package.json") => {
    let rootDirname = normalizeFilePath(fromPath);
    while (
        false === fs.existsSync(node_path.resolve(rootDirname, projectRootFilename))
    ) {
        rootDirname = node_path.resolve(rootDirname, "..");
    }
    return createResolver(rootDirname);
};
