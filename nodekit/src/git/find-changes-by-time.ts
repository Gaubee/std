import {type ExecException, execSync, type StdioOptions} from "node:child_process";
import path from "node:path";
import {gray, red} from "../colors.ts";
import {FileEntry} from "../fs_entry.ts";

interface GitError extends ExecException {
  status?: number | null;
  //   stderr?: Buffer | string;
  //   stdout?: Buffer | string;
}

/**
 * 查找自指定时间点以来的所有已更改文件（包括已提交和未提交的，包括 sinceTime 这一刻的提交内容）。
 * @param sinceTime - 起始时间点，可以是 Date 对象或有效的日期字符串 (e.g., "2023-10-27", "1 day ago", "2023-10-27T10:00:00Z")。
 * @param cwd - 命令执行的当前工作目录。
 * @returns 返回一个 FileEntry 数组，如果不在 Git 仓库中则返回 null。
 */
export const findChangedFilesSinceTime = async (sinceTime: number | string | Date, cwd: string = "."): Promise<FileEntry[] | null> => {
  let repoPath = cwd;
  try {
    // 获取 Git 仓库位置，同时确保在 Git 仓库中运行
    repoPath = execSync("git rev-parse --show-toplevel", {cwd, encoding: "utf8", stdio: "pipe"}).toString().trim();
  } catch (_) {
    // 如果不在一个git仓库中，则直接返回null
    return null;
  }
  const gitCommandOptions = {cwd: repoPath, encoding: "utf8" as NodeJS.BufferEncoding, stdio: "pipe" as StdioOptions};

  // 格式化日期，确保 git 命令可以识别
  // 使用 toISOString() 是最稳妥的方式，因为它生成了 git 明确支持的 ISO 8601 格式
  let dateString: string;
  try {
    const date = sinceTime instanceof Date ? sinceTime : new Date(sinceTime);
    if (isNaN(date.getTime())) {
      console.error(red(`提供的日期字符串无效: "${sinceTime}"`));
      return []; // 返回空数组表示没有找到文件
    }
    dateString = date.toISOString();
  } catch (e) {
    console.error(red(`解析日期时出错: "${sinceTime}"`), e);
    return [];
  }

  console.log(gray(`正在查找自 ${dateString} 以来的变更...`));

  const changedFiles = new Set<string>();

  // 1. 列出从指定时间点之后的所有已提交变更文件
  try {
    // 使用 `git log` 的 `--since` 选项来过滤时间
    // `--name-only` 只显示修改过的文件名
    // `--pretty=format:""` 禁止显示 commit 的元信息，只留下文件名列表
    // 这种方法可以一次性获取所有相关 commit 中的所有变更文件
    const committedChangesOutput = execSync(`git log --since="${dateString}" --name-only --pretty=format:""`, gitCommandOptions).toString().trim();

    if (committedChangesOutput) {
      committedChangesOutput.split("\n").forEach((file) => {
        // `git log` 的输出在不同 commit 的文件列表之间可能有空行
        if (file.trim()) changedFiles.add(file.trim());
      });
    }
  } catch (error) {
    const gitError = error as GitError;
    // `git log` 在没有匹配时会返回空，但如果命令本身出错（比如git版本太旧不支持某参数），则会抛出异常
    console.error(red(`获取自 ${dateString} 以来的已提交变更时出错: ${gitError.stderr || gitError.message}`));
    // 即使这里出错，我们仍然继续查找未提交的变更
  }

  // 2. 列出工作区中未提交的变更文件 (staged, unstaged, untracked)
  // 这部分逻辑与 find-changes-by-message.ts 完全相同，因为它对于任何场景都是必要的
  const uncommittedCommands = [
    {cmd: "git diff --name-only --cached", desc: "staged changes"}, // 已暂存
    {cmd: "git diff --name-only", desc: "unstaged changes"}, // 未暂存 (对比工作区和暂存区)
    {cmd: "git ls-files --others --exclude-standard", desc: "untracked files"}, // 未跟踪
  ];

  for (const item of uncommittedCommands) {
    try {
      const output = execSync(item.cmd, gitCommandOptions).toString().trim();
      if (output) {
        output.split("\n").forEach((file) => {
          if (file.trim()) changedFiles.add(file.trim());
        });
      }
    } catch (error) {
      const gitError = error as GitError;
      // `git diff` 在有差异时退出码为1，execSync 会抛错，需要特殊处理
      if (item.cmd.startsWith("git diff") && gitError.status === 1 && gitError.stdout) {
        const output = gitError.stdout ?? "";
        if (output) {
          output.split("\n").forEach((file) => {
            if (file.trim()) changedFiles.add(file.trim());
          });
        }
      } else if (gitError.status !== 0 && !(item.cmd.startsWith("git diff") && gitError.status === 1)) {
        // 其他真实错误
        console.error(`获取 ${item.desc} 时出错: ${gitError.stderr || gitError.message}`);
      }
      // `git ls-files` 在没有文件时退出码为0，输出为空。
      // `git diff` 在没有差异时退出码为0，输出为空。这些都是正常情况。
    }
  }

  // 返回相对于仓库根目录的文件路径
  return [...changedFiles].map((filepath) => new FileEntry(path.resolve(repoPath, filepath), {cwd: repoPath}));
};
