# @gaubee/w3c-shim

> [中文](./README-zh.md) [English](./README.md)

该项目与 @gaubee/util 保持了一致的风格（尽可能提供函数式风格，从而避免副作用），提供了常见的垫片。
它按需引入，对于具有原生支持的 runtime，基本不会有额外的开销。

1. **scrollend** - 滚动结束事件处理
   - 提供 scrollend 事件的监听和移除功能
   - 参考 https://github.com/w3c/csswg-drafts/issues/8607
