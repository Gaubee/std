# @gaubee/nodekit

> [中文](./README-zh.md) / [English](./README.md)

[![JSR @gaubee/nodekit](https://jsr.io/badges/@gaubee/nodekit)](https://jsr.io/@gaubee/nodekit)

## 简介

该项目在 @gaubee/util 和 @gaubee/node 的基础上，提供了与 Node.js 工具链相关的进一步补充，例如 pnpm 操作、dnt 构建辅助、配置文件读写等功能。
注意，该项目的定位是辅助类工具类，因此通常不建议在线上产品中使用该项目。
因为该项目并没有对包含的第三方库做完整的源码检查和去重，无法确保它的安全性，本项目也不会追求体积轻量。

## 使用 (How to use)

### Install

```bash
# JSR (deno)
deno add @gaubee/nodekit

# JSR (npm)
npx jsr add @gaubee/nodekit

# JSR (pnpm)
pnpm dlx jsr add @gaubee/nodekit

# JSR (yarn)
yarn dlx jsr add @gaubee/nodekit
```

### Usage

```typescript
import {someFunction} from "@gaubee/nodekit"; // 或者具体模块如 "@gaubee/nodekit/fs"
// Your code here
```

## API

- [@gaubee/nodekit/colors](#colors)
- [@gaubee/nodekit/config_file](#config_file)
- [@gaubee/nodekit/markdown_file](#markdown_file)
- [@gaubee/nodekit/fs](#fs)
- [@gaubee/nodekit/ignore](#ignore)
- [@gaubee/nodekit/pnpm](#pnpm)
- [@gaubee/nodekit/shell](#shell)
- [@gaubee/nodekit/tui](#tui)

### config_file

- `writeText`:
  - `(path: string, content: string) => void`
  - 写入文本内容到指定文件路径。
- `readJson`:
  - `<T = any>(path: string, defaultValue?: () => T) => T`
  - 读取 JSON 或 JSONC 文件内容。
- `writeJson`:
  - `<T>(path: string, data: T, options?: JsonStringifyOptions, beforeWrite?: (jsonContent: string) => string) => void`
  - 将数据以 JSON 格式写入文件。
- `readYaml`:
  - `<T = any>(path: string, defaultValue?: () => T) => T`
  - 读取 YAML 文件内容。
- `writeYaml`:
  - `<T>(path: string, data: T, options?: YamlStringifyOptions, beforeWrite?: (yamlContent: string) => string) => void`
  - 将数据以 YAML 格式写入文件。
- `readToml`:
  - `<T = any>(path: string, defaultValue?: () => T) => T`
  - 读取 TOML 文件内容。
- `writeToml`:
  - `<T extends Record<PropertyKey, never>>(path: string, data: T, beforeWrite?: (tomlContent: string) => string) => void`
  - 将数据以 TOML 格式写入文件。

### markdown_file

- `matter`:
  - (Re-export of `gray-matter` library)
  - `gray-matter` 库的重新导出，用于处理 Markdown front-matter。
- `readMarkdown`:
  - `(path: string, options?: MarkdownOptions) => matter.GrayMatterFile<string>`
  - 读取 Markdown 文件内容及其 front-matter。
- `writeMarkdown`:
  - `(path: string, content: string, data?: object, options?: MarkdownOptions) => void`
  - 将内容和 front-matter 数据写入 Markdown 文件。

### fs

- `FileEntry`:
  - `class FileEntry extends Entry`
  - 表示文件系统中的一个文件条目，提供文件读取、写入等操作方法。
  - 主要方法: `read()`, `readText()`, `readJson()`, `readYaml()`, `readToml()`, `write()`, `writeJson()`, `writeYaml()`, `writeToml()`, `updateText()`, `readMarkdown()`, `writeMarkdown()`。
- `DirectoryEntry`:
  - `class DirectoryEntry extends Entry`
  - 表示文件系统中的一个目录条目。
- `walkAny`:
  - `(rootpath: string, options?: WalkOptions) => Generator<WalkEntry, void, void>`
  - 遍历指定路径下的文件和目录（包括子目录），返回一个生成器，可根据选项进行过滤。

### ignore

- `Ignore`:
  - `class Ignore`
  - 一个文件匹配工具类，用于根据不同风格的忽略规则（如 .gitignore, .npmignore）判断文件是否应被忽略。
  - 构造函数: `new Ignore(rules: string[], cwd: string, option?: {style?: IgnoreStyle})`
  - 静态方法 `fromIgnoreFile`:
    - `(filepath: string) => Ignore`
    - 从忽略规则文件（如 .gitignore）创建 Ignore 实例。
  - 方法 `isMatch`:
    - `(filepath: string) => boolean`
    - 判断指定路径是否匹配忽略规则。

### pnpm

- `pnpm_publish`:
  - `(options: PnpmPublishOptions) => Promise<void>`
  - 执行 `pnpm publish` 命令来发布包。

### shell

- `$$`:
  - `(options: CreateShellOptions) => Shell`
  - 创建一个新的 shell 执行器实例，可以自定义 `cwd` 和 `env`。
- `$`:
  - `Shell` (预配置实例)
  - 一个预配置的 shell 执行器实例，用于执行终端命令。
  - 主要能力: `$.spawn()`, `$.cwd`, `$.env`, `$.ls()`, `$.colors`。

### tui

- `prompts`:
  - (重新导出 `@inquirer/prompts`)
  - 重新导出 `@inquirer/prompts` 库，用于创建交互式命令行提示。
- `spinner`:
  - (重新导出 `ora`)
  - 重新导出 `ora` 库，用于显示终端加载动画。

### colors

- (重新导出 `@std/fmt/colors`)
  - 此模块重新导出 `@std/fmt/colors` 库的所有功能，提供了一整套用于终端输出着色的工具。
