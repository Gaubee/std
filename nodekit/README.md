# @gaubee/nodekit

> [中文](./README-zh.md) / [English](./README.md)

[![JSR @gaubee/nodekit](https://jsr.io/badges/@gaubee/nodekit)](https://jsr.io/@gaubee/nodekit)

## Introduction

This project builds upon @gaubee/util and @gaubee/node, providing further enhancements related to the Node.js toolchain, such as pnpm operations, dnt build assistance, configuration file reading/writing, and more.
Note: This project is positioned as an auxiliary tool library and is generally not recommended for use in online products.
Because this project has not conducted a complete source code review and deduplication of the included third-party libraries, its security cannot be guaranteed, and this project will not pursue lightweight volume.

## How to use

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
import {someFunction} from "@gaubee/nodekit"; // or specific module like "@gaubee/nodekit/fs"
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
  - Writes text content to the specified file path.
- `readJson`:
  - `<T = any>(path: string, defaultValue?: () => T) => T`
  - Reads JSON or JSONC file content.
- `writeJson`:
  - `<T>(path: string, data: T, options?: JsonStringifyOptions, beforeWrite?: (jsonContent: string) => string) => void`
  - Writes data to a file in JSON format.
- `readYaml`:
  - `<T = any>(path: string, defaultValue?: () => T) => T`
  - Reads YAML file content.
- `writeYaml`:
  - `<T>(path: string, data: T, options?: YamlStringifyOptions, beforeWrite?: (yamlContent: string) => string) => void`
  - Writes data to a file in YAML format.
- `readToml`:
  - `<T = any>(path: string, defaultValue?: () => T) => T`
  - Reads TOML file content.
- `writeToml`:
  - `<T extends Record<PropertyKey, never>>(path: string, data: T, beforeWrite?: (tomlContent: string) => string) => void`
  - Writes data to a file in TOML format.

### markdown_file

- `matter`:
  - (Re-export of `gray-matter` library)
  - Re-export of the `gray-matter` library for handling Markdown front-matter.
- `readMarkdown`:
  - `(path: string, options?: MarkdownOptions) => matter.GrayMatterFile<string>`
  - Reads Markdown file content and its front-matter.
- `writeMarkdown`:
  - `(path: string, content: string, data?: object, options?: MarkdownOptions) => void`
  - Writes content and front-matter data to a Markdown file.

### fs

- `FileEntry`:
  - `class FileEntry extends Entry`
  - Represents a file entry in the file system, providing methods for file operations like reading and writing.
  - Key methods: `read()`, `readText()`, `readJson()`, `readYaml()`, `readToml()`, `write()`, `writeJson()`, `writeYaml()`, `writeToml()`, `updateText()`, `readMarkdown()`, `writeMarkdown()`.
- `DirectoryEntry`:
  - `class DirectoryEntry extends Entry`
  - Represents a directory entry in the file system.
- `walkAny`:
  - `(rootpath: string, options?: WalkOptions) => Generator<WalkEntry, void, void>`
  - Walks through files and directories under a given path (including subdirectories), returning a generator. Can be filtered using options.

### ignore

- `Ignore`:
  - `class Ignore`
  - A file matching utility class to determine if a file should be ignored based on different ignore rule styles (e.g., .gitignore, .npmignore).
  - Constructor: `new Ignore(rules: string[], cwd: string, option?: {style?: IgnoreStyle})`
  - Static method `fromIgnoreFile`:
    - `(filepath: string) => Ignore`
    - Creates an Ignore instance from an ignore rules file (e.g., .gitignore).
  - Method `isMatch`:
    - `(filepath: string) => boolean`
    - Checks if the specified path matches the ignore rules.

### pnpm

- `pnpm_publish`:
  - `(options: PnpmPublishOptions) => Promise<void>`
  - Executes the `pnpm publish` command to publish a package.

### shell

- `$$`:
  - `(options: CreateShellOptions) => Shell`
  - Creates a new shell executor instance, allowing customization of `cwd` and `env`.
- `$`:
  - `Shell` (pre-configured instance)
  - A pre-configured shell executor instance for running terminal commands.
  - Key capabilities: `$.spawn()`, `$.cwd`, `$.env`, `$.ls()`, `$.colors`.

### tui

- `prompts`:
  - (Re-export of `@inquirer/prompts`)
  - Re-export of the `@inquirer/prompts` library for creating interactive command-line prompts.
- `spinner`:
  - (Re-export of `ora`)
  - Re-export of the `ora` library for displaying terminal spinners.

### colors

- (Re-export of `@std/fmt/colors`)
  - This module re-exports all functionalities from the `@std/fmt/colors` library, providing a comprehensive set of tools for colorizing terminal output.
