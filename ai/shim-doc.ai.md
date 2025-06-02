> 基于 `tc39-shim/src/index.ts` 的导出，补充 `tc39-shim/README.md` 文档内容。可以参考 `w3c-shim/README.md` 文档内容，来确保风格的一致性
> 基于 `w3c-shim/src/index.ts` 的导出，补充 `w3c-shim/README.md` 文档内容。可以参考 `tc39-shim/README.md` 文档内容，来确保风格的一致性

# AI 任务：README.md 内容生成与格式化指南

**项目背景与目标:**
您是一个 AI 助手，当前任务是为 JavaScript/TypeScript shim 库项目（例如 `@gaubee/tc39-shim` 或 `@gaubee/w3c-shim`）生成或更新其 `README.md` 文件（基于 `[tc39-shim/w3c-shim]src/index.ts` 的导出）。目标是确保 `README.md` 文件能够准确、清晰地反映库所导出的 shims，并且严格遵守下述的格式和内容标准。此标准基于 `/Users/kzf/Development/GitHub/gaubee-std/tc39-shim/README.md` 的既有结构和风格。

**AI 执行此任务时所需的输入信息:**

1. `PROJECT_NAME`: (字符串) 包的完整名称，例如：`@gaubee/tc39-shim`。
2. `SOURCE_ENTRY_FILE`: (字符串) 指向项目主要源码文件（通常是 `src/index.ts` 或类似文件），该文件负责导出库提供的所有 shims。
3. `MODULE_DEFINITIONS`: (对象数组) 一个包含所有从 `SOURCE_ENTRY_FILE` 导出的 shim/模块详细信息的列表。每个对象应包含：
   - `MODULE_NAME`: (字符串) 模块的导出名称，例如：`decimal`, `promise`。
   - `MODULE_SHORT_DESCRIPTION`: (字符串) 对模块功能的简明中文描述，例如：`十进制精确数字运算`。
   - `MODULE_REFERENCE_URL`: (字符串) 指向与该模块相关的官方 TC39 提案或 W3C 规范文档的 URL。
   - `MODULE_ADDITIONAL_DETAILS`: (字符串, 可选) 关于该模块的其他重要补充说明或特性描述（中文）。

**`README.md` 文件结构与内容排版规范:**

1. **主标题:**

   - 必须使用一级 Markdown 标题。
   - 格式: `# {{PROJECT_NAME}}`
     - 其中 `{{PROJECT_NAME}}` 会被替换为实际的项目名称。

2. **引言段落:**

   - 紧跟主标题下方。
   - 必须使用以下固定的标准介绍文本：

     ```md
     > [中文](./README-zh.md) / [English](./README.md)

     该项目与 @gaubee/util 保持了一致的风格（尽可能提供函数式风格，从而避免副作用），提供了常见的垫片。
     它按需引入，对于具有原生支持的 runtime，基本不会有额外的开销。
     ```

   - 该文本是中文，请生成到 `README-zh.md`中，并且 `README.md`中使用同义的英文内容。
   - 之后的生成的内容都保持这个规律，中文和英文分开。

3. **特性/模块列表:**

   - 此部分位于引言段落之后。
   - 必须是一个有序的数字编号列表。
   - 列表中的每一项代表库提供的一个 shim 或模块。
   - **每个列表项的格式必须严格遵循以下结构:**

     ```md
     1.  {{ITEM_NUMBER}}. **{{MODULE_NAME}}** - {{MODULE_SHORT_DESCRIPTION}}
         - {{MODULE_ADDITIONAL_DETAILS}}
         - {{MODULE_ADDITIONAL_DETAILS}}
         - 参考 {{MODULE_REFERENCE_URL}}
         - > 补充说明 {{MODULE_REFERENCE_ADDITIONAL_DETAILS}}
         - 参考 {{MODULE_REFERENCE_URL}}
         - > 补充说明 {{MODULE_REFERENCE_ADDITIONAL_DETAILS}}
     ```

     - 如果 `MODULE_ADDITIONAL_DETAILS` 用来提供必要的解释，应该确保内容的简练，通常可以省略。风格可以参考现有 `README.md` 的已知内容，主要是说明与原本提案的差异。
     - 这里 `MODULE_REFERENCE_URL` 优先使用 `https://github.com/tc39/*` 或者 `https://github.com/w3c/*`，的链接
     - 这里 `MODULE_REFERENCE_URL` 可以有多个链接，如果是多个链接，那么就使用多行罗列。
     - 注意，`MODULE_REFERENCE_ADDITIONAL_DETAILS` 通常是不需要的，因为整个仓库的风格是一致的，这部分如果 AI 在阅读源代码后，觉得有必要给使用者阅读的警示，那么可以尝试提示，否则这部分通常由开发者（我）来填写。或者给开发者（我）一些建议。比如这个项目的统一风格就是native优先，否则自动降级成shim，而有些提案是无法完全实现的，只能尽可能做模拟，因此这里可能就需要告知模拟的程度如何。

   - **格式化示例 (参照 `tc39-shim/README.md`):**

     ```markdown
     1. **decimal** - 十进制精确数字运算

        - 基于 big.js 做的迁移，是 big.js 的平替，特点是它是纯函数，只携带着极少的副作用（stringify:toString/valueOf/toJSON）
        - 参考 https://github.com/tc39/proposal-decimal

     2. **pipeline** - 函数式管道操作
        - 通过数组编排来模拟 `|>` 操作符的能力
        - 参考 https://github.com/tc39/proposal-pipeline-operator
        - > 补充说明: 目前的只实现了最基础的模拟管道的操作，关于其它需求，比如参数位置的变换，会继续完善。
     ```

**AI 的核心执行指令:**
请根据上述提供的输入信息（`PROJECT_NAME`, `SOURCE_ENTRY_FILE`, `MODULE_DEFINITIONS`），生成或更新目标项目的 `README.md` 文件的完整内容。
核心要求： - 确保 `SOURCE_ENTRY_FILE` 中导出的所有模块都已在 `README.md` 中列出。 - 严格按照“特性/模块列表”部分的规定格式进行排版。 - 如果是更新现有的 `README.md` 文件，请仔细比对当前项目的导出内容，确保文档与实际代码一致，并统一到本指南所定义的格式标准。 - 确保所有中文描述和补充说明的语言流畅自然。
