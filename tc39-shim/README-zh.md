# @gaubee/tc39-shim

> [中文](./README-zh.md) / [English](./README.md)

该项目与 @gaubee/util 保持了一致的风格（尽可能提供函数式风格，从而避免副作用），提供了常见的垫片。 它按需引入，对于具有原生支持的 runtime，基本不会有额外的开销。

1. **decimal** - 十进制精确数字运算
   - 基于 big.js 做的迁移，是 big.js 的平替，特点是它是纯函数，只携带着极少的副作用（stringify:toString/valueOf/toJSON）
   - 参考 https://github.com/tc39/proposal-decimal
2. **pipeline** - 函数式管道操作
   - 通过数组编排来模拟 `|>` 操作符的能力
   - 参考 https://github.com/tc39/proposal-pipeline-operator
   - 补充说明: 目前的只实现了最基础的模拟管道的操作，关于其它需求，比如参数位置的变换，会继续完善
3. **promise** - Promise 的扩展函数
   - 提供 Promise.withResolvers 方法，用于获取 Promise 的 resolve 和 reject 函数
   - 参考 https://github.com/tc39/proposal-promise-with-resolvers
4. **set** - Set 的扩展函数
   - 提供集合运算相关的方法：union（并集）、intersection（交集）、difference（差集）等
   - 参考 https://github.com/tc39/proposal-set-methods

## 关于副作用

默认情况下，该项目不会对原生对象进行任何修改。如果你需要应用到全局（polyfill），那么请使用 applyEffect 来进行安装。比如：

```ts
import {
  applyEffect,
  promise_with_resolvers,
  set_difference,
  set_intersection,
  set_is_disjoint_from,
  set_is_subset_of,
  set_is_superset_of,
  set_symmetric_difference,
  set_union,
} from "@gaubee/tc39-shim";
applyEffect(promise_with_resolvers, set_union, set_intersection, set_difference, set_symmetric_difference, set_is_subset_of, set_is_superset_of, set_is_disjoint_from);
```
