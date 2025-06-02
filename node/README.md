> [中文](./README-zh.md) / [English](./README.md)

# @gaubee/node

This project provides further supplements related to Node.js APIs based on @gaubee/util.

## How to use

### Install

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

### Usage

```typescript
import { cwdResolver } from "@gaubee/node/path";

console.log(cwdResolver("file.txt"));
```

## API

### env

-   `viteEnvSource`:
    -   `(): Record<string, string>`
    -   Gets the Vite environment variable source.
-   `nodeEnvSource`:
    -   `(): Record<string, string>`
    -   Gets the Node.js environment variable source (process.env).
-   `denoEnvSource`:
    -   `(): Record<string, string>`
    -   Gets the Deno environment variable source.
-   `bunEnvSource`:
    -   `(): Record<string, string>`
    -   Gets the Bun environment variable source.
-   `storageEnvSource`:
    -   `(storage?: Storage): Record<string, string>`
    -   Gets an environment variable source based on the Storage API (e.g., sessionStorage).
-   `autoEnvSource`:
    -   `(fallback?: () => Record<string, string>): Record<string, string | undefined>`
    -   Automatically detects and returns the environment variable source for the current environment (Deno > Bun > Vite > Node.js > sessionStorage).
-   `defineEnv`:
    -   `<P extends string, KV extends Record<string, EnvConfig>>(prefix: P, kv: KV, source?: Record<string, string | undefined>, ext?: object): DefineEnvChain<P, DefineEnv<P, KV>>`
    -   Defines a set of environment variables, supporting type conversion, default values, and chained definitions.

### path

-   `normalizeFilePath`:
    -   `(path: string | URL): string`
    -   Formats the path to standard POSIX format, supporting URL and Windows paths.
-   `createResolver`:
    -   `(cwd: string): PathResolver`
    -   Creates a path resolver that resolves paths relative to the specified `cwd` (current working directory).
    -   The returned function has a `dirname` property with the value of the passed `cwd`.
-   `cwdResolver`:
    -   `PathResolver` (i.e., `((...paths: string[]) => string) & {dirname: string}`)
    -   A path resolver based on the current Node.js process's working directory (`process.cwd()`).
-   `createResolverByRootFile`:
    -   `(fromPath?: string | URL, rootFilename?: string): PathResolver`
    -   Creates a path resolver by looking up the specified root filename (defaults to `package.json`) upwards. The resolver will resolve paths based on the directory containing that root file.

### promise

-   `nodeTimmers`:
    -   `{ eventEmitter: NodeTimmer.EventEmiter }`
    -   An extension to `timmers` in `@gaubee/util`, providing Timmer related to Node.js events.
    -   `nodeTimmers.eventEmitter`: A Timmer factory function for creating Timers based on `node:events/EventEmitter` for the `delay` function. It can listen for specified events and resolve the Promise when the event is triggered, with optional support for event argument filters.
