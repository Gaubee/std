import {findChangedFilesSinceTime} from "./find-changes-by-time.ts";

async function main() {
  const time = "Fri Jun 6 11:11:29 2025 +0800"; // 替换为你想要的时间
  const changedFiles = await findChangedFilesSinceTime(time);

  if (changedFiles) {
    console.log(`Changed files since ${time}:`);
    changedFiles.forEach((file) => {
      console.log(file.path);
    });
  } else {
    console.log("Not a Git repository.");
  }
}

if (import.meta.main) {
  await main();
}
