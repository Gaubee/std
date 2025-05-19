> [中文](./README-zh.md) [English](./README.md)

# @gaubee/util

[![JSR @gaubee](https://jsr.io/badges/@gaubee/util)](https://jsr.io/@gaubee/util)
[![JSR @gaubee/util score](https://jsr.io/score/@gaubee/util)](https://jsr.io/@gaubee/util)

## 简介

1.  个人项目经验，涵盖大量常用函数集合，建议与 deno 的 [`@std/*`](https://jsr.io/@std) 互为补充。
    > 这个库中与 @std 系列有一些交集，交集的部分通常是我个人觉得我自己的实现更好：
    >
    > - 可能是性能上更好
    > - 可能是使用体验上更易用好用
    > - 可能是条件边界覆盖更全。
2.  这个库通常不会包含垫片相关的，只要在 esnext 范畴内我都会使用，所以请自行处理垫片相关的问题
    > 例如 Promise.withResolvers

## 如何使用

### 安装

```bash
# Deno (JSR)
deno add @gaubee/util

# NPM
npm install @jsr/gaubee__util

# Yarn
yarn add @jsr/gaubee__util

# PNPM
pnpm add @jsr/gaubee__util
```

### 使用

```typescript
import { arr_set_next, date_clone } from "@gaubee/util";

const myArray = [1, 2, 3];
arr_set_next(myArray, 4);
console.log(myArray); // [1, 2, 3, 4]

const originalDate = new Date();
const clonedDate = date_clone(originalDate);
console.log(clonedDate !== originalDate); // true
console.log(clonedDate.getTime() === originalDate.getTime()); // true
```

**关于导入路径的说明：**

您可能注意到，可以直接从 `@gaubee/util` 导入所需的函数，而无需指定子模块路径（如 `@gaubee/util/array`）。这是没有副作用的，请放心使用，不会使最终的打包体积增多。

将模块划分为不同的文件（如 `array.ts`, `date.ts` 等）主要是出于代码组织和维护的考虑。这种模块化的设计也为未来的版本迭代和功能扩展提供了便利。例如，如果未来需要引入不兼容的变更或实验性功能，可能会通过特定的子模块路径来提供，如：

```typescript
// 示例：未来可能出现的导入方式
// import { some_deprecated_function } from "@gaubee/util/array-deprecated";
// import { some_experimental_feature } from "@gaubee/util/array-experimental";
```

目前，建议您直接从 `@gaubee/util` 导入所需的功能，以保持代码的简洁性。

## API

### 目录

*   [@gaubee/util/abort](#abort)
*   [@gaubee/util/bigint](#bigint)
*   [@gaubee/util/collections](#collections)
*   [@gaubee/util/date](#date)
*   [@gaubee/util/debounce](#debounce)
*   [@gaubee/util/decorators-legacy](#decorators-legacy)
*   [@gaubee/util/decorators](#decorators)
*   [@gaubee/util/disposable](#disposable)
*   [@gaubee/util/encoding](#encoding)
*   [@gaubee/util/event_target](#event_target)
*   [@gaubee/util/func](#func)
*   [@gaubee/util/generator](#generator)
*   [@gaubee/util/lrc](#lrc)
*   [@gaubee/util/map](#map)
*   [@gaubee/util/math](#math)
*   [@gaubee/util/number](#number)
*   [@gaubee/util/object](#object)
*   [@gaubee/util/promise](#promise)
*   [@gaubee/util/pure_event](#pure_event)
*   [@gaubee/util/readable_stream](#readable_stream)
*   [@gaubee/util/string](#string)
*   [@gaubee/util/throttle](#throttle)
*   [@gaubee/util/typedarray](#typedarray)

<br>

### abort

<details>
<summary><code>abort_fused_timeout</code> - <a href="./src/abort.ts#L13">源代码</a></summary>

-   `abort_fused_timeout(ms: number, options?: { parentSignal?: AbortSignal | null | undefined; } | undefined): AbortSignal`
-   创建一个在指定毫秒数后自动中止的 AbortSignal，并可选择性地链接到一个父级 AbortSignal。
-   如果父级 Signal 中止，或者超时发生，此 Signal 将中止。

</details>

<details>
<summary><code>abort_signal_from_any</code> - <a href="./src/abort.ts#L34">源代码</a></summary>

-   `abort_signal_from_any(...signals: AbortSignal[]): AbortSignal`
-   从多个 AbortSignal 创建一个新的 AbortSignal，当任何一个输入 Signal 中止时，新的 Signal 也会中止。

</details>

<details>
<summary><code>abort_signal_merge</code> - <a href="./src/abort.ts#L54">源代码</a></summary>

-   `abort_signal_merge(...signals: AbortSignal[]): AbortSignal`
-   合并多个 AbortSignal。当所有提供的 Signal 都中止时，返回的 Signal 才会中止。

</details>

<details>
<summary><code>abort_signal_promisify</code> - <a href="./src/abort.ts#L38">源代码</a></summary>

-   `(input: AbortSignal | {signal: AbortSignal}): Promise<never>`
-   将 AbortSignal 转换为一个 Promise。当 AbortSignal 中止时，返回的 Promise 将会以 AbortSignal 的 reason 被拒绝 (reject)。
-   此函数会缓存结果，对于同一个 AbortSignal 多次调用将返回同一个 Promise 实例。

</details>

<details>
<summary><code>abort_signal_race</code> - <a href="./src/abort.ts#L53">源代码</a></summary>

-   `<T>(signal: AbortSignal, fn_or_promise: PromiseLike<T> | (() => PromiseLike<T>)): PromiseMaybe<T>`
-   使一个 Promise 或一个返回 Promise 的函数与一个 AbortSignal 竞争。
-   如果 AbortSignal 已经中止，则立即抛出其中止原因。
-   如果 AbortSignal 在 Promise 完成之前中止，则结果 Promise 会因 AbortSignal 的中止原因而被拒绝。
-   否则，结果 Promise 会跟随 `fn_or_promise` 的结果（resolve 或 reject）。

</details>

### array

<details>
<summary><code>arr_binary_search</code> - <a href="./src/array.ts#L10">源代码</a></summary>

-   `arr_binary_search<T, V>(sortedList: readonly T[], value: V, comparator: (value: V, item: T, index: number) => number, options?: { low?: number | undefined; high?: number | undefined; } | undefined): number`
-   在已排序的数组中执行二分查找。

</details>

<details>
<summary><code>arr_ensure_index</code> - <a href="./src/array.ts#L45">源代码</a></summary>

-   `arr_ensure_index(arr_length: number, index: number): number`
-   确保索引在数组的有效范围内（包括负数索引）。

</details>

<details>
<summary><code>arr_set_next</code> - <a href="./src/array.ts#L10">源代码</a></summary>

-   `arr_set_next<T>(arr: T[], item: T): void`
-   在数组末尾追加元素。

</details>

<details>
<summary><code>arr_swap_remove</code> - <a href="./src/array.ts#L65">源代码</a></summary>

-   `arr_swap_remove<T>(list: T[], index: number): T | undefined`
-   通过将指定索引处的元素与数组末尾的元素交换然后移除末尾元素的方式，从数组中移除一个元素。这种方法比 `splice` 更快，但会改变元素的顺序。

</details>

<details>
<summary><code>sparse_arr_get_first</code> - <a href="./src/array.ts#L18">源代码</a></summary>

-   `sparse_arr_get_first<T>(arr: ArrayLike<T>): T`
-   获取稀疏数组的第一个实际存在的元素，如果不存在则抛出异常。

</details>

<details>
<summary><code>sparse_arr_get_first_or_null</code> - <a href="./src/array.ts#L24">源代码</a></summary>

-   `sparse_arr_get_first_or_null<T>(arr: ArrayLike<T>): T | undefined`
-   获取稀疏数组的第一个实际存在的元素，如果不存在则返回 `undefined`。

</details>

<details>
<summary><code>sparse_arr_get_first_or_default</code> - <a href="./src/array.ts#L30">源代码</a></summary>

-   `sparse_arr_get_first_or_default<T, R>(arr: ArrayLike<T>, defaultValue: () => R): T | R`
-   获取稀疏数组的第一个实际存在的元素，如果不存在则返回通过 `defaultValue` 函数获取的默认值。

</details>

<details>
<summary><code>arr_get_first</code> - <a href="./src/array.ts#L41">源代码</a></summary>

-   `arr_get_first<T>(arr: ArrayLike<T>): T`
-   获取数组的第一个元素（索引为 0）。如果数组为空或索引 0 不存在，则抛出异常。

</details>

<details>
<summary><code>arr_get_first_or_null</code> - <a href="./src/array.ts#L47">源代码</a></summary>

-   `arr_get_first_or_null<T>(arr: ArrayLike<T>): T | undefined`
-   获取数组的第一个元素（索引为 0）。如果数组为空或索引 0 不存在，则返回 `undefined`。

</details>

<details>
<summary><code>arr_get_first_or_default</code> - <a href="./src/array.ts#L53">源代码</a></summary>

-   `arr_get_first_or_default<T, R>(arr: ArrayLike<T>, defaultValue: () => R): T | R`
-   获取数组的第一个元素（索引为 0）。如果数组为空或索引 0 不存在，则返回通过 `defaultValue` 函数获取的默认值。

</details>

<details>
<summary><code>sparse_arr_get_last</code> - <a href="./src/array.ts#L65">源代码</a></summary>

-   `sparse_arr_get_last<T>(arr: ArrayLike<T>): T`
-   获取稀疏数组的最后一个实际存在的元素，如果不存在则抛出异常。

</details>

<details>
<summary><code>sparse_arr_get_last_or_null</code> - <a href="./src/array.ts#L72">源代码</a></summary>

-   `sparse_arr_get_last_or_null<T>(arr: ArrayLike<T>): T | undefined`
-   获取稀疏数组的最后一个实际存在的元素，如果不存在则返回 `undefined`。

</details>

<details>
<summary><code>sparse_arr_get_last_or_default</code> - <a href="./src/array.ts#L79">源代码</a></summary>

-   `sparse_arr_get_last_or_default<T, R>(arr: ArrayLike<T>, defaultValue: () => R): T | R`
-   获取稀疏数组的最后一个实际存在的元素，如果不存在则返回通过 `defaultValue` 函数获取的默认值。

</details>

<details>
<summary><code>arr_get_last</code> - <a href="./src/array.ts#L113">源代码</a></summary>

-   `arr_get_last<T>(arr: ArrayLike<T>): T`
-   获取数组的最后一个元素（索引为 `length - 1`）。如果数组为空，则抛出异常。

</details>

<details>
<summary><code>arr_get_last_or_null</code> - <a href="./src/array.ts#L119">源代码</a></summary>

-   `arr_get_last_or_null<T>(arr: ArrayLike<T>): T | undefined`
-   获取数组的最后一个元素（索引为 `length - 1`）。如果数组为空，则返回 `undefined`。

</details>

<details>
<summary><code>arr_get_last_or_default</code> - <a href="./src/array.ts#L126">源代码</a></summary>

-   `arr_get_last_or_default<T, R>(arr: ArrayLike<T>, defaultValue: () => R): T | R`
-   获取数组的最后一个元素（索引为 `length - 1`）。如果数组为空，则返回通过 `defaultValue` 函数获取的默认值。

</details>

<details>
<summary><code>arr_remove_first</code> - <a href="./src/array.ts#L138">源代码</a></summary>

-   `arr_remove_first<T>(arr: T[], value: T): number`
-   移除数组中第一个与 `value` 相匹配的元素。返回被移除元素的索引，如果未找到则返回 -1。

</details>

<details>
<summary><code>arr_remove_start</code> - <a href="./src/array.ts#L150">源代码</a></summary>

-   `arr_remove_start<T>(arr: T[], value: T, limit: number): number`
-   从数组开头移除最多 `limit` 个与 `value` 相匹配的元素。返回实际移除的元素数量。

</details>

<details>
<summary><code>arr_remove_last</code> - <a href="./src/array.ts#L165">源代码</a></summary>

-   `arr_remove_last<T>(arr: T[], value: T): number`
-   移除数组中最后一个与 `value` 相匹配的元素。返回被移除元素的索引，如果未找到则返回 -1。

</details>

<details>
<summary><code>arr_remove_end</code> - <a href="./src/array.ts#L177">源代码</a></summary>

-   `arr_remove_end<T>(arr: T[], value: T, limit: number): number`
-   从数组末尾移除最多 `limit` 个与 `value` 相匹配的元素。返回实际移除的元素数量。

</details>

<details>
<summary><code>arr_is_not_empty</code> - <a href="./src/array.ts#L192">源代码</a></summary>

-   `arr_is_not_empty<T>(arr: readonly T[]): arr is [T, ...T[]]`
-   检查数组是否非空，并进行类型收窄。

</details>

<details>
<summary><code>arr_is_empty</code> - <a href="./src/array.ts#L199">源代码</a></summary>

-   `arr_is_empty<T>(arr: readonly T[]): arr is readonly []`
-   检查数组是否为空，并进行类型收窄。

</details>

### bigint

<details>
<summary><code>bigint_gcd</code> - <a href="./src/bigint.ts#L4">源代码</a></summary>

-   `bigint_gcd(left: bigint, right: bigint): bigint`
-   计算两个 `bigint` 类型数值的最大公约数 (Greatest Common Divisor)。

</details>

<details>
<summary><code>bigint_gcd</code> - <a href="./src/bigint.ts#L4">源代码</a></summary>

-   `bigint_gcd(left: bigint, right: bigint): bigint`
-   计算两个大整数的最大公约数 (GCD)。

</details>

### collections

<details>
<summary><code>arr_set_next</code> - <a href="./src/collections.ts#L1">源代码</a></summary>

-   `arr_set_next<T>(arr: T[], item: T): void`
-   在数组末尾追加元素 (与 `array.ts` 中的 `arr_set_next` 重复，可能是导出整理问题)。

</details>

<details>
<summary><code>iter_map_async_try</code> - <a href="./src/collections.ts#L10">源代码</a></summary>

-   `iter_map_async_try<T, R>(iter: Iterable<T>, cb: (item: T, index: number) => PromiseMaybe<R>): Promise<PromiseSettledResult<R>[]>`
-   异步地遍历一个可迭代对象，并对每个元素执行回调函数，捕获所有成功和失败的结果。

</details>

### date

<details>
<summary><code>date_clone</code> - <a href="./src/date.ts#L4">源代码</a></summary>

-   `date_clone(date: Date): Date`
-   克隆一个新的 `Date` 对象。

</details>

<details>
<summary><code>date_add_duration</code> - <a href="./src/date.ts#L20">源代码</a></summary>

-   `date_add_duration(date: Date, duration: Partial<Duration>): Date`
-   向一个 `Date` 对象中添加或减去一段时间。`Duration` 类型定义为 `{ year: number; month: number; day: number; minutes: number; seconds: number; milliseconds: number; }`。

</details>

<details>
<summary><code>date_to_duration</code> - <a href="./src/date.ts#L47">源代码</a></summary>

-   `date_to_duration(date: Date): Duration`
-   将一个 `Date` 对象转换为 `Duration` 对象。

</details>

<details>
<summary><code>date_set_duration</code> - <a href="./src/date.ts#L67">源代码</a></summary>

-   `date_set_duration(date: Date, duration: Partial<Duration>): Date`
-   设置 `Date` 对象的年、月、日、分钟、秒和毫秒。

</details>

<details>
<summary><code>date_formatify</code> - <a href="./src/date.ts#L113">源代码</a></summary>

-   `date_formatify(date: string | number | Date): FormatifyDate`
-   将日期转换为易于格式化的对象 `FormatifyDate`，包含年、月、日、小时（24小时制和12小时制）、分钟、秒以及 AM/PM 指示。

</details>

<details>
<summary><code>date_format</code> - <a href="./src/date.ts#L147">源代码</a></summary>

-   `date_format(format: string, date: string | number | Date): string`
-   根据指定的模板格式化日期。模板占位符包括 `yyyy` (年), `mm` (月), `dd` (日), `HH` (小时), `MM` (分钟), `SS` (秒)。

</details>

<details>
<summary><code>date_format_by_token</code> - <a href="./src/date.ts#L4">源代码</a></summary>

-   `date_clone(date: Date): Date`
-   克隆 Date 对象。
-   基于 `new Date(date.getTime())` 实现，确保高性能。
-   示例:
    ```ts
    const originalDate = new Date();
    const clonedDate = date_clone(originalDate);
    console.log(clonedDate !== originalDate); // true
    console.log(clonedDate.getTime() === originalDate.getTime()); // true
    ```

</details>

<details>
<summary><code>date_format_by_token</code> - <a href="./src/date.ts#L14">源代码</a></summary>

-   `date_format_by_token(date: Date, format: string): string`
-   根据提供的格式字符串（包含特定的日期/时间标记）来格式化日期对象。
-   支持的标记包括：`YYYY`, `YY`, `MM`, `DD`, `HH`, `hh`, `mm`, `ss`, `SSS`, `A`, `a`。

</details>

### debounce

<details>
<summary><code>func_debounce</code> - <a href="./src/debounce.ts#L15">源代码</a></summary>

-   `func_debounce<T extends Func>(fn: T, wait?: number | Timmer<any> | undefined, options?: { maxWait?: number | undefined; leading?: boolean | undefined; trailing?: boolean | undefined; } | undefined): func_debounce.DebouncedFunction<T>`
-   创建一个防抖函数，该函数会延迟执行提供的函数，直到自上次调用以来经过了 `wait` 毫秒。可以配置 `leading` 和 `trailing` 边缘调用，以及 `maxWait` 最大等待时间。

</details>

### decorators-legacy

<details>
<summary><code>legacyAccessor</code> - <a href="./src/decorators-legacy.ts#L19">源代码</a></summary>

-   `legacyAccessor<C extends Class, V>(Class: C, builder: ClassAccessorLegacyDecorator<InstanceType<C>, V>): ClassAccessorDecorator<InstanceType<C>, V>`
-   用于在标准访问器（accessor）装饰器中使用旧版的装饰器。`ClassAccessorLegacyDecorator` 类型为 `(target: T, property: PropertyKey<T>, descriptor: RequiredKeys<TypedPropertyDescriptor<V>, "get" | "set">) => void | TypedPropertyDescriptor<V>`。

</details>

<details>
<summary><code>legacyGetter</code> - <a href="./src/decorators-legacy.ts#L38">源代码</a></summary>

-   `legacyGetter<C extends Class, V>(Class: C, builder: ClassGetterLegacyDecorator<InstanceType<C>, V>): ClassGetterDecorator<InstanceType<C>, V>`
-   用于在标准 getter 装饰器中使用旧版的装饰器。`ClassGetterLegacyDecorator` 类型为 `(target: T, property: PropertyKey<T>, descriptor: RequiredKeys<TypedPropertyDescriptor<V>, "get">) => void | TypedPropertyDescriptor<V>`。

</details>

<details>
<summary><code>legacySetter</code> - <a href="./src/decorators-legacy.ts#L57">源代码</a></summary>

-   `legacySetter<C extends Class, V>(Class: C, builder: ClassSetterLegacyDecorator<InstanceType<C>, V>): ClassSetterDecorator<InstanceType<C>, V>`
-   用于在标准 setter 装饰器中使用旧版的装饰器。`ClassSetterLegacyDecorator` 类型为 `(target: T, property: PropertyKey<T>, descriptor: RequiredKeys<TypedPropertyDescriptor<V>, "set">) => void | TypedPropertyDescriptor<V>`。

</details>

<details>
<summary><code>legacyMethod</code> - <a href="./src/decorators-legacy.ts#L75">源代码</a></summary>

-   `legacyMethod<C extends Class, M extends Func<InstanceType<C>>>(Class: C, builder: ClassMethodLegacyDecorator<InstanceType<C>, M>): ClassMethodDecorator<InstanceType<C>, M>`
-   用于在标准方法（method）装饰器中使用旧版的装饰器。`ClassMethodLegacyDecorator` 类型为 `(target: T, property: PropertyKey<T>, descriptor: RequiredKeys<TypedPropertyDescriptor<M>, "value">) => void`。

</details>

<details>
<summary><code>legacyField</code> - <a href="./src/decorators-legacy.ts#L91">源代码</a></summary>

-   `legacyField<C extends Class, V>(Class: C, builder: ClassFieldLegacyDecorator<InstanceType<C>>): ClassFieldDecorator<InstanceType<C>, V>`
-   用于在标准字段（field）装饰器中使用旧版的装饰器。`ClassFieldLegacyDecorator` 类型为 `(target: T, property: PropertyKey<T>) => void`。

</details>

<details>
<summary><code>legacyClass</code> - <a href="./src/decorators-legacy.ts#L106">源代码</a></summary>

-   `legacyClass<C extends Class>(builder: ClassLegacyDecorator<C>): ClassDecorator<C>`
-   用于在标准类（class）装饰器中使用旧版的装饰器。`ClassLegacyDecorator` 类型为 `(target: C) => void`。

</details>

<details>
<summary><code>decorator_make_debounce_legacy</code> - <a href="./src/decorators-legacy.ts#L5">源代码</a></summary>

-   `decorator_make_debounce_legacy(wait_ms: number, options?: { maxWait?: number | undefined; leading?: boolean | undefined; trailing?: boolean | undefined; } | undefined): (target: any, prop_name: string, desc: PropertyDescriptor) => void`
-   创建一个旧版装饰器，用于对类方法进行防抖处理。

</details>

<details>
<summary><code>decorator_make_memoize_legacy</code> - <a href="./src/decorators-legacy.ts#L13">源代码</a></summary>

-   `decorator_make_memoize_legacy(key_fun?: ((...args: any[]) => any) | undefined): (target: any, prop_name: string, desc: PropertyDescriptor) => void`
-   创建一个旧版装饰器，用于对类方法的结果进行记忆化（缓存）。

</details>

### decorators

<details>
<summary><code>accessor</code> - <a href="./src/decorators.ts#L10">源代码</a></summary>

-   `accessor<T extends object, V>(builder: ClassAccessorDecorator<T, V>): ClassAccessorDecorator<T, V>`
-   用于修饰类的访问器（accessor）。`ClassAccessorDecorator` 类型为 `(target: ClassAccessorDecoratorTarget<T, V>, context: ClassAccessorDecoratorContext<T, V>) => void | ClassAccessorDecoratorResult<T, V>`。

</details>

<details>
<summary><code>safeAccessor</code> - <a href="./src/decorators.ts#L16">源代码</a></summary>

-   `safeAccessor<T extends object, V>(): <R extends ClassAccessorDecoratorReturn<T, V>>(builder: ClassAccessorDecorator<T, V, R>) => ClassAccessorDecorator<T, V, R>`
-   与 `accessor` 类似，但提供强类型安全的返回。

</details>

<details>
<summary><code>getter</code> - <a href="./src/decorators.ts#L26">源代码</a></summary>

-   `getter<T extends object, V>(builder: ClassGetterDecorator<T, V>): ClassGetterDecorator<T, V>`
-   用于修饰类的 getter 方法。`ClassGetterDecorator` 类型为 `(target: (this: T) => V, context: ClassGetterDecoratorContext<T, V>) => void | ((this: T) => V)`。

</details>

<details>
<summary><code>safeGetter</code> - <a href="./src/decorators.ts#L32">源代码</a></summary>

-   `safeGetter<T extends object, V>(): <R extends ClassGetterDecoratorReturn<T, V>>(builder: ClassGetterDecorator<T, V, R>) => ClassGetterDecorator<T, V, R>`
-   与 `getter` 类似，但提供强类型安全的返回。

</details>

<details>
<summary><code>beforeGetter</code> - <a href="./src/decorators.ts#L38">源代码</a></summary>

-   `beforeGetter<T extends object, V>(before: Func<T, [], void>): ClassGetterDecorator<T, V>`
-   在 getter 方法执行前执行指定函数 `before`。

</details>

<details>
<summary><code>afterGetter</code> - <a href="./src/decorators.ts#L49">源代码</a></summary>

-   `afterGetter<T extends object, V>(after: Func<T, [V], void>): ClassGetterDecorator<T, V>`
-   在 getter 方法执行后执行指定函数 `after`，并将 getter 的返回值作为参数传入。

</details>

<details>
<summary><code>wrapGetter</code> - <a href="./src/decorators.ts#L60">源代码</a></summary>

-   `wrapGetter<T extends object, V>(wrap: (this: T, get: () => V) => V): ClassGetterDecorator<T, V>`
-   包装 getter 方法，允许自定义其行为。

</details>

<details>
<summary><code>setter</code> - <a href="./src/decorators.ts#L73">源代码</a></summary>

-   `setter<T = unknown, V = unknown>(builder: ClassSetterDecorator<T, V>): ClassSetterDecorator<T, V>`
-   用于修饰类的 setter 方法。`ClassSetterDecorator` 类型为 `(target: (this: T, value: V) => void, context: ClassSetterDecoratorContext<T, V>) => void | ((this: T, value: V) => void)`。

</details>

<details>
<summary><code>safeSetter</code> - <a href="./src/decorators.ts#L79">源代码</a></summary>

-   `safeSetter<T extends object, V>(): <R extends ClassSetterDecoratorReturn<T, V>>(builder: ClassSetterDecorator<T, V, R>) => ClassSetterDecorator<T, V, R>`
-   与 `setter` 类似，但提供强类型安全的返回。

</details>

<details>
<summary><code>beforeSetter</code> - <a href="./src/decorators.ts#L87">源代码</a></summary>

-   `beforeSetter<T extends object, V>(before: Func<T, [V], void>): ClassSetterDecorator<T, V>`
-   在 setter 方法执行前执行指定函数 `before`，并将传入 setter 的值作为参数。

</details>

<details>
<summary><code>afterSetter</code> - <a href="./src/decorators.ts#L99">源代码</a></summary>

-   `afterSetter<T extends object, V>(after: Func<T, [V], void>): ClassSetterDecorator<T, V>`
-   在 setter 方法执行后执行指定函数 `after`，并将传入 setter 的值作为参数。

</details>

<details>
<summary><code>wrapSetter</code> - <a href="./src/decorators.ts#L111">源代码</a></summary>

-   `wrapSetter<T extends object, V>(wrap: (this: T, value: V, set: Func<T, [V], void>) => void): ClassSetterDecorator<T, V>`
-   包装 setter 方法，允许自定义其行为。

</details>

<details>
<summary><code>field</code> - <a href="./src/decorators.ts#L128">源代码</a></summary>

-   `field<T extends object, V>(builder: ClassFieldDecorator<T, V>): ClassFieldDecorator<T, V>`
-   用于修饰类的普通字段。`ClassFieldDecorator` 类型为 `(target: undefined, context: ClassFieldDecoratorContext<T, V>) => void | ((this: T, value: V) => V)`。

</details>

<details>
<summary><code>safeField</code> - <a href="./src/decorators.ts#L134">源代码</a></summary>

-   `safeField<T extends object, V>(): <R extends ClassFieldDecoratorReturn<T, V>>(builder: ClassFieldDecorator<T, V, R>) => ClassFieldDecorator<T, V, R>`
-   与 `field` 类似，但提供强类型安全的返回。

</details>

<details>
<summary><code>method</code> - <a href="./src/decorators.ts#L149">源代码</a></summary>

-   `method<T extends object, M extends Method<T>>(builder: ClassMethodDecorator<T, M>): ClassMethodDecorator<T, M>`
-   用于修饰类的方法。`ClassMethodDecorator` 类型为 `(target: M, context: ClassMethodDecoratorContext<T, M>) => void | M`。

</details>

<details>
<summary><code>safeMethod</code> - <a href="./src/decorators.ts#L157">源代码</a></summary>

-   `safeMethod<T extends object, M extends Method<T>>(): <R extends ClassMethodDecoratorReturn<T, M>>(builder: ClassMethodDecorator<T, M, R>) => ClassMethodDecorator<T, M, R>`
-   与 `method` 类似，但提供强类型安全的返回。

</details>

<details>
<summary><code>bindThis</code> - <a href="./src/decorators.ts#L161">源代码</a></summary>

-   `bindThis<T extends object, M extends Method<T>>(): ClassMethodDecorator<T, M>`
-   将方法的 `this` 绑定到当前实例。不支持私有方法。

</details>

<details>
<summary><code>Class</code> - <a href="./src/decorators.ts#L172">源代码</a></summary>

-   `Class<C extends Class>(builder: ClassDecorator<C>): ClassDecorator<C>`
-   用于修饰类本身。`ClassDecorator` 类型为 `(target: C, context: ClassDecoratorContext<C>) => void`。

</details>

<details>
<summary><code>decorator_make_debounce</code> - <a href="./src/decorators.ts#L10">源代码</a></summary>

-   `decorator_make_debounce(wait_ms: number, options?: { maxWait?: number | undefined; leading?: boolean | undefined; trailing?: boolean | undefined; } | undefined): <T extends Func>(target: T, context: ClassMethodDecoratorContext<unknown, T>) => T`
-   创建一个装饰器 (ES Decorators Stage 3)，用于对类方法进行防抖处理。

</details>

### disposable

<details>
<summary><code>create_disposable_group</code> - <a href="./src/disposable.ts#L10">源代码</a></summary>

-   `create_disposable_group(): DisposableGroup`
-   创建一个可释放组，用于管理一组可释放资源。当组被释放时，所有添加的资源也会被释放。

</details>

### encoding

<details>
<summary><code>binary_to_base64_string</code> - <a href="./src/encoding.ts#L6">源代码</a></summary>

-   `binary_to_base64_string(binary: Uint8Array): string`
-   将 Uint8Array 二进制数据转换为 Base64 编码的字符串。

</details>

<details>
<summary><code>string_to_utf8_binary</code> - <a href="./src/encoding.ts#L13">源代码</a></summary>

-   `string_to_utf8_binary(str: string): Uint8Array`
-   将字符串编码为 UTF-8 格式的 Uint8Array。

</details>

<details>
<summary><code>utf8_binary_to_string</code> - <a href="./src/encoding.ts#L20">源代码</a></summary>

-   `utf8_binary_to_string(binary: Uint8Array): string`
-   将 UTF-8 编码的 Uint8Array 解码为字符串。

</details>

### event_target

<details>
<summary><code>event_target_on</code> - <a href="./src/event_target.ts#L13">源代码</a></summary>

-   `event_target_on<E extends Event, T extends Pick<EventTarget, "addEventListener" | "removeEventListener"> = EventTarget>(target: T, eventType: string, cb: (event: E) => void, options?: AddEventListenerOptions | undefined): () => void`
-   为 EventTarget 附加事件监听器，并返回一个移除该监听器的函数。

</details>

### func

<details>
<summary><code>uncurryThisFn</code> - <a href="./src/func.ts#L6">源代码</a></summary>

-   `uncurryThisFn<T, ARGS extends readonly unknown[], R>(func: (this: T, ...args: ARGS) => R): (self: T, ...restArgs: ARGS) => R`
-   函数转化，创建一个新函数：它的第一个参数将作为原函数的 `this`。

</details>

<details>
<summary><code>curryThisFn</code> - <a href="./src/func.ts#L13">源代码</a></summary>

-   `curryThisFn<T, ARGS extends readonly unknown[], R>(func: (self: T, ...args: ARGS) => R): (this: T, ...args: ARGS) => R`
-   函数转化，创建一个新函数：它的 `this` 是原函数的第一个参数。

</details>

<details>
<summary><code>func_remember</code> - <a href="./src/func.ts#L46">源代码</a></summary>

-   `func_remember<F extends Func<any, any[], any>, K extends Func<ThisParameterType<F>, Parameters<F>, any> | void>(func: F, key?: K | undefined): FuncRemember<F, K>`
-   让一个函数的返回结果被缓存。可以提供一个自定义的 `key` 函数来生成缓存键，如果生成的键不一样，缓存会失效。

</details>

<details>
<summary><code>func_wrap</code> - <a href="./src/func.ts#L100">源代码</a></summary>

-   `func_wrap<F extends Func<any, any[], any>, R>(func: F, wrapper: (context: { target: F; this: ThisParameterType<F>; arguments: Parameters<F>; }, next: () => ReturnType<F>) => R): (this: ThisParameterType<F>, ...args: Parameters<F>) => R`
-   包裹一个“目标函数”，将它的执行权交给“包裹函数”。包裹函数可以在目标函数执行之前或者执行之后做一些工作，比如参数检查，比如返回值修改。

</details>

<details>
<summary><code>extendsMethod</code> - <a href="./src/func.ts#L120">源代码</a></summary>

-   `extendsMethod<T extends object>(target: T, prop: PropertyKey, method: Func<PrototypeToThis<T>, any[], any>): void`
-   向某一个对象配置函数属性。

</details>

<details>
<summary><code>extendsGetter</code> - <a href="./src/func.ts#L131">源代码</a></summary>

-   `extendsGetter<T extends object>(target: T, prop: PropertyKey, getter: Func<PrototypeToThis<T>, [], any>): void`
-   向某一个对象配置 getter 属性。

</details>

<details>
<summary><code>func_catch</code> - <a href="./src/func.ts#L200">源代码</a></summary>

-   `func_catch: FuncCatch` (这是一个重载函数或具有多个签名的对象)
-   包裹一个函数，使其返回一个元组 `[error, result]`，从而可以用类似 Go 语言的方式处理错误和结果。如果函数是异步的，返回的也是一个异步的元组。

</details>

### generator

<details>
<summary><code>GF</code> - <a href="./src/generator.ts#L6">源代码</a></summary>

-   `GF: GeneratorFunction`
-   GeneratorFunction 的构造函数。

</details>

<details>
<summary><code>AGF</code> - <a href="./src/generator.ts#L16">源代码</a></summary>

-   `AGF: AsyncGeneratorFunction`
-   AsyncGeneratorFunction 的构造函数。

</details>

<details>
<summary><code>ag_done</code> - <a href="./src/generator.ts#L34">源代码</a></summary>

-   `ag_done<T extends AsyncIterableIterator<any, AGReturn<T>, AGNext<T>>>(ag: T, each?: AsyncGeneratorDoneOptions<T> | undefined): Promise<AGReturn<T>>`
-   持续迭代一个异步迭代器直到结束，并返回其最终的返回值。
-   示例:
    ```ts
    // const r: number
    const r = await ag_done((async function* () {
        return 1;
    })());
    ```

</details>

<details>
<summary><code>ag_map</code> - <a href="./src/generator.ts#L52">源代码</a></summary>

-   `ag_map<T extends AsyncIterableIterator<any, AGReturn<T>, AGNext<T>>, R>(ag: T, each: AsyncGeneratorMapOptions<T, R>): Promise<R[]>`
-   异步地映射一个异步迭代器的每个值，并返回包含映射结果的数组。

</details>

<details>
<summary><code>ag_map_reduce</code> - <a href="./src/generator.ts#L64">源代码</a></summary>

-   `ag_map_reduce<T extends AsyncIterableIterator<any, AGReturn<T>, AGNext<T>>, M, R>(ag: T, each: AsyncGeneratorMapReduceOptions<T, M, R>): Promise<R>`
-   异步地映射并归约一个异步迭代器的值。

</details>

<details>
<summary><code>ag_then</code> - <a href="./src/generator.ts#L91">源代码</a></summary>

-   `ag_then<T extends AsyncIterableIterator<any, AGReturn<T>, AGNext<T>>, ARGS extends Parameters<Promise<AGReturn<T>>["then"]> = Parameters<Promise<AGReturn<T>>["then"]>>(ag: T, ...args: ARGS): Promise<ReturnType<FilterNotNull<ARGS>[number]>>`
-   持续迭代一个异步迭代器直到结束，然后像 Promise 一样执行 `then` 回调。
-   示例:
    ```ts
    // const r: 1 | boolean
    const r = await ag_then(
        (async function* () {
        })(),
        () => 1 as const,
        () => false,
    );
    ```

</details>

### lrc

<details>
<summary><code>Lrc</code> (class) - <a href="./src/lrc.ts#L19">源代码</a></summary>

-   `class Lrc<K, V>`
-   一个极简的最近最少使用 (Least Recently Used, LRU) 缓存实现。
-   示例:
    ```ts
    const lrc = new Lrc()
    function getTime() {
         return lrc.getOrPut('time', ()=>{
              return Date.now()
         })
    }
    const time1 = getTime()
    // hit cache
    const time2 = getTime()
    // time1 === time2

    // remove all cache
    lrc.clear(0)

    const time3 = getTime()
    // time1 !== time3
    ```

</details>

### map

<details>
<summary><code>map_to_array</code> - <a href="./src/map.ts#L5">源代码</a></summary>

-   `map_to_array<K, V, R>(map: Map<K, V>, mapper: (value: V, key: K) => R): R[]`
-   遍历 Map 对象，将每个键值对通过 `mapper` 函数转换后，聚合到一个新的数组中并返回。

</details>

<details>
<summary><code>map_get_or_put</code> - <a href="./src/map.ts#L22">源代码</a></summary>

-   `map_get_or_put<T extends CommonMap<GetMapKey<T>, GetMapValue<T>>, K extends GetMapKey<T>>(map: T, key: K, put: (key: K, map: T) => GetMapValue<T>): GetMapValue<T>`
-   读取 Map 中的值，如果键不存在，则调用 `put` 函数创建值，存入 Map 并返回该值。

</details>

<details>
<summary><code>map_delete_and_get</code> - <a href="./src/map.ts#L36">源代码</a></summary>

-   `map_delete_and_get<T extends CommonMap<GetMapKey<T>, GetMapValue<T>>, K extends GetMapKey<T>>(map: T, key: K): GetMapValue<T> | undefined`
-   从 Map 中删除一个键值对，并返回被删除的值。如果键不存在，则返回 `undefined`。

</details>

<details>
<summary><code>map_get_or_put_async</code> - <a href="./src/map.ts#L50">源代码</a></summary>

-   `map_get_or_put_async<T extends CommonMap<GetMapKey<T>, GetMapValue<T>>, K extends GetMapKey<T>>(map: T, key: K, put: (key: K, map: T) => PromiseMaybe<GetMapValue<T>>): Promise<GetMapValue<T>>`
-   异步地读取 Map 中的值。如果键不存在，则异步调用 `put` 函数创建值，存入 Map 并返回该值。此函数在异步创建过程中会进行互斥锁定，以防止并发问题。

</details>

### math

<details>
<summary><code>math_clamp</code> - <a href="./src/math.ts#L4">源代码</a></summary>

-   `math_clamp(value: number, lower: number, upper: number): number`
-   将一个值限制在一个下限和上限之间（包含边界）。

</details>

<details>
<summary><code>math_lerp</code> - <a href="./src/math.ts#L11">源代码</a></summary>

-   `math_lerp(value: number, from: number, to: number): number`
-   在 `from` 和 `to` 之间进行线性插值。当 `value` 为 0 时返回 `from`，为 1 时返回 `to`。

</details>

<details>
<summary><code>math_lerp_with_clamp</code> - <a href="./src/math.ts#L15">源代码</a></summary>

-   `math_lerp_with_clamp(value: number, from: number, to: number): number`
-   先将 `value` 限制在 0 和 1 之间，然后在 `from` 和 `to` 之间进行线性插值。

</details>

<details>
<summary><code>math_nearest_value</code> - <a href="./src/math.ts#L20">源代码</a></summary>

-   `math_nearest_value(value: number, a: number, b: number): number`
-   返回 `a` 和 `b` 中更接近给定 `value` 的那个值。

</details>

### number

<details>
<summary><code>number_gcd</code> - <a href="./src/number.ts#L4">源代码</a></summary>

-   `number_gcd(left: number, right: number): number`
-   计算两个数的最大公约数 (Greatest Common Divisor)。

</details>

### object

<details>
<summary><code>obj_pick</code> - <a href="./src/object.ts#L7">源代码</a></summary>

-   `obj_pick<T extends object, KS extends (keyof T)[] = (keyof T)[]>(obj: T, ...props: KS): Pick<T, KS[number]>`
-   通过选中对象中的指定键来创建一个新的对象。

</details>

<details>
<summary><code>obj_pick_as</code> - <a href="./src/object.ts#L26">源代码</a></summary>

-   `obj_pick_as<T extends object, const A extends Alias<T>>(obj: T, alias: A): PickAs<T, A>`
-   通过选中对象中的指定键，并根据 `alias` 对象重命名这些键，来创建一个新的对象。
-   示例:
    ```ts
    const sym_k = Symbol("k");
    const obj = { a: 5, b: 6, c: 7, d: 8, 0: true, 1: false, [sym_k]: "sym" };
    const obj2 = obj_pick_as(obj, { aa: "a", cc: "c", zero: 0, k: sym_k });

    // obj2.aa == obj.a
    ```

</details>

<details>
<summary><code>obj_omit</code> - <a href="./src/object.ts#L49">源代码</a></summary>

-   `obj_omit<T extends object, KS extends (keyof T)[] = (keyof T)[]>(obj: T, ...props: KS): Omit<T, KS[number]>`
-   通过排除对象中的指定键来创建一个新的对象。
-   示例:
    ```ts
    const sym_k = Symbol("k");
    const obj = { a: 5, b: 6, c: 7, d: 8, 0: true, 1: false, [sym_k]: "sym" };
    const omitted = obj_omit(obj, "a", "c", 0, sym_k);

    // assertEquals(omitted, { b: 6, d: 8, "1": false }); // 注意示例中的 "0": true 应该被排除
    ```

</details>

<details>
<summary><code>obj_lazify</code> - <a href="./src/object.ts#L80">源代码</a></summary>

-   `obj_lazify<T extends object>(obj: T, target?: T | undefined): T`
-   让一个对象的所有 getter 属性成为惰性求值的属性。即，getter 只有在第一次被访问时才会执行，其结果会被缓存并直接替换该 getter。

</details>

<details>
<summary><code>obj_lazy_builder</code> - <a href="./src/object.ts#L89">源代码</a></summary>

-   `obj_lazy_builder<T extends object>(obj: Partial<T>, get: <K extends keyof T>(target: Partial<T>, prop: K) => T[K], target?: Partial<T> | undefined): T`
-   传入一个稀疏的对象，在 get 的过程中，通过提供的 `get` 函数构建出属性值并缓存。

</details>

<details>
<summary><code>obj_prop_lazify</code> - <a href="./src/object.ts#L100">源代码</a></summary>

-   `obj_prop_lazify<T extends object>(obj: T, prop: keyof T, target?: T | undefined): T`
-   让一个对象的指定 getter 属性成为惰性求值的属性。

</details>

<details>
<summary><code>obj_all_descriptors</code> - <a href="./src/object.ts#L121">源代码</a></summary>

-   `obj_all_descriptors<T extends object>(obj: T): Array<[prop: keyof T & (string | symbol), desp: PropertyDescriptor]>`
-   获取一个对象自身所有属性的描述符（不包括原型链上的属性）。

</details>

<details>
<summary><code>obj_delegate_by</code> - <a href="./src/object.ts#L135">源代码</a></summary>

-   `obj_delegate_by<D extends object, T extends D>(target: T, proto: D, getBy?: ((target: T) => D) | undefined, options?: { recursive?: boolean | undefined; omit?: Iterable<PropertyKey> | undefined; } | undefined): Set<PropertyKey>`
-   将 `proto` 对象的属性和方法委托给 `target` 对象。可以通过 `getBy` 函数指定实际的委托者。可以配置是否递归遍历原型链以及要排除的属性。

</details>

<details>
<summary><code>obj_assign_props</code> - <a href="./src/object.ts#L200">源代码</a></summary>

-   `obj_assign_props<T extends object, S extends object>(target: T, source: S, options?: { props?: Iterable<keyof S> | undefined; omit?: Iterable<keyof S> | undefined; predicate?: ((key: keyof S, source: S, target: T) => boolean) | undefined; } | undefined): T & S`
-   类似于 `Object.assign`，但提供了更细致的控制，如指定要分配的属性、要忽略的属性，或通过谓词函数决定是否分配某个属性。

</details>

### promise

<details>
<summary><code>timmers</code> (object) - <a href="./src/promise.ts#L19">源代码</a></summary>

-   `timmers: { timeout: (ms: number) => Timmer<void>; raf: Timmer<number>; microtask: Timmer<void>; eventTarget: <T extends Event>(target: Pick<EventTarget, "addEventListener" | "removeEventListener">, eventType: string, filter?: ((event: T) => boolean | void) | undefined) => Timmer<T>; from: <T extends number | Timmer<any>>(ms: T) => Timmer.From<T>; }`
-   一个包含多种定时器创建函数的对象，例如基于 `setTimeout`、`requestAnimationFrame`、`queueMicrotask` 或 `EventTarget` 的定时器。

</details>

<details>
<summary><code>delay</code> - <a href="./src/promise.ts#L77">源代码</a></summary>

-   `delay<T extends number | Timmer<any>>(ms: T, options?: { signal?: AbortSignal | null | undefined; disposer?: PureEvent<void, any> | undefined; } | undefined): delay.Delayer<Timmer.FromType<T>>`
-   `setTimeout`/`clearTimeout` 的 Promise 版本。返回一个 Promise，该 Promise 在指定的 `ms` 或 `Timmer` 解决后完成。可以被取消，并支持 `AbortSignal`。
-   如果 `ms` 为 0，则使用 `queueMicrotask`。
-   示例:
    ```ts
    const d = delay(1000)

    await d; // is promise

    d.cancel(); // clearTimeout

    d.cancel('some reason'); // clearTimeout and reject promise

    const ac = new AbortController()
    const d_with_signal = delay(1000, { signal: ac.signal }) // with AbortSignal
    ac.abort('some reason'); // clearTimeout and reject promise
    ```

</details>

<details>
<summary><code>promise_try</code> - <a href="./src/promise.ts#L130">源代码</a></summary>

-   `promise_try<R>(fn: () => R): Promise<PromiseSettledResult<Awaited<R>>>`
-   尝试执行一个函数（可以是同步或异步的），并返回一个表示其结果的 `PromiseSettledResult` 对象（即 `{status: 'fulfilled', value: R}` 或 `{status: 'rejected', reason: any}`）。

</details>

<details>
<summary><code>promise_once_then</code> - <a href="./src/promise.ts#L164">源代码</a></summary>

-   `promise_once_then<P extends PromiseLike<any>, T = Awaited<P>>(promise: P, task: PromiseOnceThenTask<T>): () => void`
-   一个内存安全的、只专注于执行回调的 Promise `then` 方法。与标准的 `promise.then` 不同，它不会创建新的 Promise 实例，这在某些场景下（如将 Promise 用作锁）可以避免内存问题。返回一个取消函数。

</details>

<details>
<summary><code>promise_once_then_cancel</code> - <a href="./src/promise.ts#L190">源代码</a></summary>

-   `promise_once_then_cancel<P extends PromiseLike<any>, T = Awaited<P>>(promise: P, task: PromiseOnceThenTask<T>): void`
-   取消通过 `promise_once_then` 注册的回调任务。

</details>

<details>
<summary><code>isPromiseLike</code> - <a href="./src/promise-helper.ts#L6">源代码</a></summary>

-   `isPromiseLike(p: any): p is PromiseLike<unknown>`
-   判断一个值是否是 PromiseLike 对象（即拥有 `then` 方法）。

</details>

### pure_event

<details>
<summary><code>PureEvent</code> (class) - <a href="./src/pure_event.ts#L62">源代码</a></summary>

-   `class PureEvent<T, OffResult extends PureEventOffResult = PureEventOffResult>`
-   一个现代化的单事件监听器，对异步与错误捕捉有良好支持，可自定义移除事件时的触发器。
-   示例:
    ```ts
    import { PureEvent } from "@gaubee/util";
    const pevent = new PureEvent<string>();

    /// basic
    // add listen
    const off = pevent.on((data) => console.log("on", data));
    // dispatch listen
    pevent.emit("hi");
    // remove listen
    off();

    // add listen with custom key
    pevent.on((data) => console.log("on", data), { key: "key1" });
    // remove listen with custom key
    pevent.off("key1");

    // add listen width dispose function
    const off_dispose = pevent.on((data) => console.log("on", data), {
      onDispose: async () => {
        console.log("off");
        return 123;
      },
    });
    // remove listen and run dispatch function
    // console.log(await off_dispose()); // { status: "fulfilled", value: 123 }

    /// once
    // add one time listen with callback function
    pevent.once((data) => console.log("once", data));
    // add one time listen without callback function and return promise
    pevent.once().then((data) => console.log("once.then", data));
    // add one time listen with filter function
    pevent.once({ filter(data){ return data == "match" } }).then((data) => console.log("once filter", data));
    ```

</details>

### readable_stream

<details>
<summary><code>rs_with_controller</code> - <a href="./src/readable_stream.ts#L38">源代码</a></summary>

-   `rs_with_controller: ReadableByteWithController` (这是一个重载函数或具有多个签名的对象)
-   一个易用的 `ReadableStream` 构造函数，它直接暴露了 `controller` 对象，并使用 `PureEvent` 来暴露 `pull` 和 `cancel` 事件。

</details>







### string

<details>
<summary><code>str_reverse</code> - <a href="./src/string.ts#L5">源代码</a></summary>

-   `str_reverse(str: string): string`
-   反转字符串，正确处理 Unicode 字符。

</details>

<details>
<summary><code>str_replace_start</code> - <a href="./src/string.ts#L16">源代码</a></summary>

-   `str_replace_start(str: string, searchValue: string, replaceValue: string): string`
-   如果字符串以 `searchValue` 开头，则将其替换为 `replaceValue`。

</details>

<details>
<summary><code>str_replace_end</code> - <a href="./src/string.ts#L26">源代码</a></summary>

-   `str_replace_end(str: string, searchValue: string, replaceValue: string): string`
-   如果字符串以 `searchValue` 结尾，则将其替换为 `replaceValue`。

</details>

<details>
<summary><code>str_trim_indent</code> - <a href="./src/string.ts#L33">源代码</a></summary>

-   `str_trim_indent(str: string): string`
-   移除字符串中每行共同的前导空白（基于最小缩进），并移除末尾的空白。

</details>

<details>
<summary><code>str_human_space</code> - <a href="./src/string.ts#L66">源代码</a></summary>

-   `str_human_space: Set<string>`
-   一个包含各种对于人类来说是空格的字符的 Set 集合。

</details>

<details>
<summary><code>human_space_regex</code> - <a href="./src/string.ts#L87">源代码</a></summary>

-   `human_space_regex: func_remember.Return<() => { start: RegExp; end: RegExp; all: RegExp; }>`
-   一个缓存函数，返回包含用于匹配人类空格字符的正则表达式的对象（分别用于匹配开头、结尾和所有出现的地方）。

</details>

<details>
<summary><code>str_human_trim</code> - <a href="./src/string.ts#L99">源代码</a></summary>

-   `str_human_trim(str: string): string`
-   移除字符串开头和结尾的人类可识别的空格字符。

</details>

<details>
<summary><code>stringify_fn_body</code> - <a href="./src/string.ts#L107">源代码</a></summary>

-   `stringify_fn_body(fn: Func<any, any[], any>, tabSize?: number | undefined): string`
-   从函数体中提取代码片段字符串，并进行格式化（移除多余空行、统一缩进等）。

</details>



### throttle

<details>
<summary><code>func_throttle</code> - <a href="./src/throttle.ts#L10">源代码</a></summary>

-   `func_throttle<T extends Func<any, any[], any>>(fn: T, wait?: number | Timmer<any> | undefined, options?: { waitPromise?: boolean | undefined; before?: boolean | undefined; } | undefined): func_throttle.ThrottledFunction<T>`
-   创建一个节流函数，该函数在指定的 `wait` 时间间隔内最多执行一次。可以配置是否等待 Promise 完成，以及是否在时间段开始或结束时执行。

</details>