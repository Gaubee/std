import path from "node:path";
import {findChangedFilesAfterMessage} from "./find-changes-by-message.ts";

// --- 使用示例 ---
Deno.test("findChangedFilesAfterMessage", async () => {
  const messagePattern = "@jixo"; // 你要搜索的 commit message 内容
  const repoDir = "."; // Git 仓库的路径，默认为当前目录

  console.log(`Searching for changes since commit with message containing "${messagePattern}" in ${path.resolve(repoDir)}...`);
  const files = await findChangedFilesAfterMessage(messagePattern, repoDir);

  if (files && files.length > 0) {
    console.log("\nChanged files (relative to git root):");
  } else {
    console.log("\nNo changed files found based on the criteria.");
  }
  console.log(files?.map((file) => file.path));
});
