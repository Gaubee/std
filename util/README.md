# @gaubee/util

## [docs 文档](https://jsr.io/@gaubee/util/doc)

**install:**

```bash
npm install @gaubee/util
pnpm install @gaubee/util
yarn install @gaubee/util
deno add npm:@gaubee/util
bun add @gaubee/util

deno add jsr:@gaubee/util
npx jsr add @gaubee/util
yarn dlx jsr add @gaubee/util
pnpm dlx jsr add @gaubee/util
bunx jsr add @gaubee/util
```

**example:**

```ts
import * as gutil from "@gaubee/util";
import { ag_done } from "@gaubee/util/generator";
import { bigint_gcd } from "@gaubee/util/bigint";
import { iter_map_not_null } from "@gaubee/util/collections";
import { date_add_duration } from "@gaubee/util/date";
import { binary_to_hex_string } from "@gaubee/util/encoding";
import { event_target_on } from "@gaubee/util/event_target";
import { func_remember } from "@gaubee/util/func";
import { Lrc } from "@gaubee/util/lrc";
import { map_get_or_put_async } from "@gaubee/util/map";
import { number_gcd } from "@gaubee/util/number";
import { obj_lazify } from "@gaubee/util/object";
import { delay } from "@gaubee/util/promise";
import { PureEvent } from "@gaubee/util/pure_event";
import { rs_with_controller } from "@gaubee/util/readable_stream";
```

### 简介

1. 个人项目经验，涵盖大量常用函数集合，建议与 deno 的 [`@std/*`](https://jsr.io/@std) 互为补充。
   > 这个库中与 @std 系列有一些交集，交集的部分通常是我个人觉得我自己的实现更好：
   >
   > - 可能是性能上更好
   > - 可能是使用体验上更易用好用
   > - 可能是条件边界覆盖更全。
1. 这个库不会包含垫片相关的，只要在 esnext 范畴内我都会使用，所以请自行处理垫片相关的问题

### 关于 @gaubee/util/global

> 如果你的项目是 application 级别，不会被其它项目所依赖，那么我建议导入 global 系列，它能大幅度提升你的 js 开发体验。
> 虽然大家都说“不要污染原型链”，但是辩证看待，我建议你在合适的时候，“应该充分利用原型链”。
> 在原型链上扩展函数，通过链式调用，可以达到很多符合直觉的开发体验。
>
> 并且，随着 [shadowrealm 提案](https://github.com/tc39/proposal-shadowrealm) 的演进，未来污染原型链在复杂项目里头就将不再是问题。

由于 jsr 上不允许上传污染全局的模块，所以如果需要，请使用 [npm 版本](https://www.npmjs.com/package/@gaubee/util)。
**npm 版本还包含了 commonjs 的直接支持**。
