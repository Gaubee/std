# @gaubee/util

## 简介

1. 个人项目经验，涵盖大量常用函数集合，建议与 deno 的 [`@std/*`](https://jsr.io/@std) 互为补充。
    > 这个库中与 @std 系列有一些交集，交集的部分通常是我个人觉得我自己的实现更好：
    >
    > - 可能是性能上更好
    > - 可能是使用体验上更易用好用
    > - 可能是条件边界覆盖更全。
1. 这个库不会包含垫片相关的，只要在 esnext 范畴内我都会使用，所以请自行处理垫片相关的问题

## 使用 How to use

**install:**

```bash
npm install @gaubee/util
pnpm install @gaubee/util
yarn install @gaubee/util
deno add @gaubee/util
bun add @gaubee/util
```

**usage:**

> 注意，本项目没有副作用了，对 [Tree-Shaking](https://rollupjs.org/introduction/#tree-shaking) 支持良好，你可以直接 import 一整个包，最终 bundle 的时候，只会包含你实际使用的部分。

```ts
import { delay } from "@gaubee/util";
```

### 简介

1. 个人项目经验，涵盖大量常用函数集合，建议与 deno 的 [`@std/*`](https://jsr.io/@std) 互为补充。
    > 这个库中与 @std 系列有一些交集，交集的部分通常是我个人觉得我自己的实现更好：
    >
    > - 可能是性能上更好
    > - 可能是使用体验上更易用好用
    > - 可能是条件边界覆盖更全。
1. 这个库通常不会包含垫片相关的，只要在 esnext 范畴内我都会使用，所以请自行处理垫片相关的问题
    > 例如 Promise.withResolvers

### 关于 @gaubee/util/global

> 如果你的项目是 application 级别，不会被其它项目所依赖，那么我建议导入 global 系列，它能大幅度提升你的 js 开发体验。
> 虽然大家都说“不要污染原型链”，但是辩证看待，我建议你在合适的时候，“应该充分利用原型链”。
> 在原型链上扩展函数，通过链式调用，可以达到很多符合直觉的开发体验。
>
> 并且，随着 [shadowrealm 提案](https://github.com/tc39/proposal-shadowrealm)
> 的演进，未来污染原型链在复杂项目里头就将不再是问题。

由于 jsr 上不允许上传污染全局的模块，所以如果需要，请使用 [npm 版本](https://www.npmjs.com/package/@gaubee/util)。 **npm
版本还包含了 commonjs 的直接支持**。

## API

-   参考链接：[jsr-docs 文档](https://jsr.io/@gaubee/util/doc)
-   参考链接：[deepwiki-docs 文档](https://deepwiki.com/Gaubee/std/3-package:-@gaubeeutil)

### @gaubee/util/abort

-   `abort_signal_merge`:
    -   `(..._signals: (AbortSignal | undefined | null)[]) => AbortSignal | undefined`
    -   将 N 个 AbortSignal 合并成 0/1 个

### @gaubee/util/array

-   `arr_set_next`:
    -   `(arr: Array<T>, item: T) => void`
    -   在数组末尾追加元素
-   `sparse_arr_get_first`:
    -   `<T>(arr: ArrayLike<T>) => T`
    -   取数组第一个元素（跳过稀疏部分），不存在则抛出异常
-   `sparse_arr_get_first_or_null`:
    -   `<T>(arr: ArrayLike<T>) => T | undefined`
    -   取数组第一个元素（跳过稀疏部分），不存在则返回 undefined
-   `sparse_arr_get_first_or_default`:
    -   `<T, R>(arr: ArrayLike<T>, defaultValue: () => R) => T | R`
    -   取数组第一个元素（跳过稀疏部分），不存在则返回默认值
-   `arr_get_first`:
    -   `<T>(arr: ArrayLike<T>) => T`
    -   取数组第一个元素（下标 0），不存在则抛出异常
-   `arr_get_first_or_null`:
    -   `<T>(arr: ArrayLike<T>) => T | undefined`
    -   取数组第一个元素（下标 0），不存在则返回 undefined
-   `arr_get_first_or_default`:
    -   `<T, R>(arr: ArrayLike<T>, defaultValue: () => R) => T | R`
    -   取数组第一个元素（下标 0），不存在则返回默认值
-   `sparse_arr_get_last`:
    -   `<T>(arr: ArrayLike<T>) => T`
    -   取数组最后一个元素（跳过稀疏部分），不存在则抛出异常
-   `sparse_arr_get_last_or_null`:
    -   `<T>(arr: ArrayLike<T>) => T | undefined`
    -   取数组最后一个元素（跳过稀疏部分），不存在则返回 undefined
-   `sparse_arr_get_last_or_default`:
    -   `<T, R>(arr: ArrayLike<T>, defaultValue: () => R) => T | R`
    -   取数组最后一个元素（跳过稀疏部分），不存在则返回默认值
-   `arr_get_last`:
    -   `<T>(arr: ArrayLike<T>) => T`
    -   取数组最后一个元素（下标 length-1），不存在则抛出异常
-   `arr_get_last_or_null`:
    -   `<T>(arr: ArrayLike<T>) => T | undefined`
    -   取数组最后一个元素（下标 length-1），不存在则返回 undefined
-   `arr_get_last_or_default`:
    -   `<T, R>(arr: ArrayLike<T>, defaultValue: () => R) => T | R`
    -   取数组最后一个元素（下标 length-1），不存在则返回默认值
-   `arr_remove_first`:
    -   `<T>(arr: T[], value: T) => number`
    -   移除数组中指定的第一个匹配项，返回移除的索引，未找到返回 -1

### @gaubee/util/bigint

-   `bigint_gcd`:
    -   `(left: bigint, right: bigint) => bigint`
    -   计算两个 bigint 的最大公约数 (GCD)

### @gaubee/util/date

-   `date_clone`:
    -   `(date: Date) => Date`
    -   克隆 Date 对象
-   `Duration`:
    -   `type Duration = { year: number; month: number; day: number; minutes: number; seconds: number; milliseconds: number; }`
    -   人类可读的时间对象类型
-   `date_add_duration`:
    -   `(date: Date, duration: Partial<Duration>) => Date`
    -   向 Date 对象添加时间段
-   `date_to_duration`:
    -   `(date: Date) => Duration`
    -   将 Date 对象转换为 Duration 对象
-   `date_set_duration`:
    -   `(date: Date, duration: Partial<Duration>) => Date`
    -   设置 Date 对象的指定时间部分
-   `FormatifyDate`:
    -   `type FormatifyDate = { ... }`
    -   用于格式化的日期信息对象类型
-   `date_formatify`:
    -   `(date: string | number | Date) => FormatifyDate`
    -   将日期转换为易于格式化的信息对象
-   `date_format`:
    -   `(format: string, date: string | number | Date) => string`
    -   根据指定模板格式化日期

### @gaubee/util/debounce

-   `func_debounce`:
    -   `<T extends Func>(fn: T, wait: number | Timmer = 0, options: { before?: boolean }) => DebouncedFunction<T>`
    -   创建一个防抖函数，延迟执行提供的函数直到等待时间过去。包含 `isPending`, `cancel`, `source`, `flush` 方法。
    -   `DebouncedFunction`: 带有额外控制方法的函数类型
