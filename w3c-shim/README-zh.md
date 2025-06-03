# @gaubee/w3c-shim

> [中文](./README-zh.md) [English](./README.md)

该项目与 @gaubee/util 保持了一致的风格（尽可能提供函数式风格，从而避免副作用），提供了常见的垫片。
它按需引入，对于具有原生支持的 runtime，基本不会有额外的开销。

1. **scrollend** - 滚动结束事件处理
   - 提供 scrollend 事件的监听和移除功能
   - 自动检测浏览器原生支持(Chrome 114+)，否则回退到垫片实现
   - 垫片实现细节：
     - 使用滚动事件+超时检测
     - 处理指针/触摸事件以避免误报
     - 完善的事件监听器生命周期管理
   - 参考 https://github.com/w3c/csswg-drafts/issues/8607
   - > 注意：垫片实现的触发时机可能与原生实现略有不同

2. **inert** - inert 属性垫片
   - 提供 element_inert() 函数来获取/设置 inert 状态
   - 自动检测浏览器原生支持，否则回退到垫片实现
   - 垫片实现细节：
     - 使用 CSS 禁用指针事件和用户选择
     - 管理 aria-hidden 状态以保证可访问性
     - 可应用于任何 Element 元素
   - 参考 https://html.spec.whatwg.org/multipage/interaction.html#inert
   - > 注意：在复杂的 DOM 场景中，垫片实现可能与原生行为略有不同
