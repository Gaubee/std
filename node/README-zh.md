> [中文](./README-zh.md) / [English](./README.md)

# @gaubee/node

该项目在 @gaubee/util 的基础上，提供了与 NodeJs-API 相关的进一步补充。

## 如何使用

### 安装

```bash
# pnpm
pnpm add @gaubee/node
# npm
npm install @gaubee/node
# yarn
yarn add @gaubee/node
# jsr
deno add @gaubee/node
```

### 使用

```typescript
import { cwdResolver } from "@gaubee/node/path";

console.log(cwdResolver("file.txt"));
```

## API

### env

-   `viteEnvSource`:
    -   `(): Record<string, string>`
    -   获取 Vite 环境变量源。
-   `nodeEnvSource`:
    -   `(): Record<string, string>`
    -   获取 Node.js 环境变量源 (process.env)。
-   `denoEnvSource`:
    -   `(): Record<string, string>`
    -   获取 Deno 环境变量源。
-   `bunEnvSource`:
    -   `(): Record<string, string>`
    -   获取 Bun 环境变量源。
-   `storageEnvSource`:
    -   `(storage?: Storage): Record<string, string>`
    -   获取基于 Storage API (如 sessionStorage) 的环境变量源。
-   `autoEnvSource`:
    -   `(fallback?: () => Record<string, string>): Record<string, string | undefined>`
    -   自动检测并返回当前环境的变量源 (Deno > Bun > Vite > Node.js > sessionStorage)。
-   `defineEnv`:
    -   `<P extends string, KV extends Record<string, EnvConfig>>(prefix: P, kv: KV, source?: Record<string, string | undefined>, ext?: object): DefineEnvChain<P, DefineEnv<P, KV>>`
    -   定义一组环境变量，支持类型转换、默认值和链式定义。

### path

-   `normalizeFilePath`:
    -   `(path: string | URL): string`
    -   将路径格式化为标准 POSIX 格式，支持 URL 和 Windows 路径。
-   `createResolver`:
    -   `(cwd: string): PathResolver`
    -   创建一个路径解析器，该解析器会相对于指定的 `cwd` (当前工作目录) 解析路径。
    -   返回的函数带有 `dirname` 属性，值为传入的 `cwd`。
-   `cwdResolver`:
    -   `PathResolver` (即 `((...paths: string[]) => string) & {dirname: string}`)
    -   基于当前 Node.js 进程的工作目录 (`process.cwd()`) 的路径解析器。
-   `createResolverByRootFile`:
    -   `(fromPath?: string | URL, rootFilename?: string): PathResolver`
    -   通过向上查找指定的根文件名 (默认为 `package.json`) 来创建路径解析器，解析器会基于包含该根文件的目录进行解析。

### promise

-   `nodeTimmers`:
    -   `{ eventEmitter: NodeTimmer.EventEmiter }`
    -   对 `@gaubee/util` 中 `timmers` 的扩展，提供了与 Node.js 事件相关的 Timmer。
    -   `nodeTimmers.eventEmitter`: 一个 Timmer 工厂函数，用于为 `delay` 函数创建基于 `node:events/EventEmitter` 的 Timmer。可以监听指定事件，并在事件触发时解决 Promise，支持可选的事件参数过滤器。