import node_path from "node:path";
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
