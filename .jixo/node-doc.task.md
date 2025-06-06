---
agents:
  - readme-writer
model: deepseek-reasoner
---

> 基于 `@gaubee/node/src` 目录下各模块的导出，补充 `@gaubee/node/README.md` 和 `@gaubee/node/README-zh.md` 文档内容。
> 目标是确保 README 文件准确、清晰地反映库所提供的工具函数，并遵循 `@gaubee/node` 现有的 README 风格和结构。

# AI 任务：@gaubee/node README.md 内容生成与格式化指南

**项目背景与目标:**
您是一个 AI 助手，当前任务是为 `@gaubee/node` 这个 JavaScript/TypeScript 工具函数库项目生成或更新其 `README.md` (英文) 和 `README-zh.md` (中文) 文件。文档需要基于项目 `src` 目录下的模块导出（例如 `src/env.ts`, `src/path.ts` 等）。目标是确保 README 文件能够准确、清晰地反映库所导出的工具函数，并且严格遵守下述的格式和内容标准，此标准基于现有 `@gaubee/node/README.md` 的结构和风格。

**AI 执行此任务时所需的输入信息:**

1.  `PROJECT_NAME`: (字符串) 包的完整名称，固定为：`@gaubee/node`。
2.  `SOURCE_MODULES_INFO`: (对象数组) 一个包含所有从 `src` 目录导出的模块及其函数详细信息的列表。每个模块对象应包含：
    - `MODULE_GROUP_NAME`: (字符串) 模块的分组名称，通常来源于文件名（例如：`env` 来自 `env.ts`, `path` 来自 `path.ts`）。
    - `FUNCTIONS`: (对象数组) 该模块下所有导出函数的列表，每个函数对象包含：
      - `FUNCTION_NAME`: (字符串) 函数的导出名称。
      - `FUNCTION_SIGNATURE`: (字符串) 函数的 TypeScript 签名。
      - `FUNCTION_SHORT_DESCRIPTION_CHINESE`: (字符串) 对函数功能的简明中文描述。
      - `FUNCTION_SHORT_DESCRIPTION_ENGLISH`: (字符串) 对函数功能的简明英文描述。
      - `FUNCTION_ADDITIONAL_DETAILS_CHINESE`: (字符串, 可选) 关于该函数的其他重要补充说明或特性描述（中文）。
      - `FUNCTION_ADDITIONAL_DETAILS_ENGLISH`: (字符串, 可选) 关于该函数的其他重要补充说明或特性描述（英文）。
      - `FUNCTION_EXAMPLE_CHINESE`: (字符串, 可选) 函数使用示例代码（中文注释）。
      - `FUNCTION_EXAMPLE_ENGLISH`: (字符串, 可选) 函数使用示例代码（英文注释）。

**`README.md` (英文) 和 `README-zh.md` (中文) 文件结构与内容排版规范:**

- **通用要求**: `README-zh.md` 使用中文内容，`README.md` 使用对应的英文内容。以下规范以中文为例，英文版需做相应翻译。

1.  **主标题:**

    - 必须使用一级 Markdown 标题。
    - 格式: `# @gaubee/node`

2.  **徽章 (Badges):**

    - (如果 AI 可以获取或被提供，则包含，否则提示开发者手动添加/保留此部分)
    - 例如：`[![JSR @gaubee/node](https://jsr.io/badges/@gaubee/node)](https://jsr.io/@gaubee/node)` (链接待确认)

3.  **引言段落 (简介):**

    - 紧跟主标题（或徽章）下方。
    - 参考 `@gaubee/node/README.md` 的现有风格，强调库的特点：在 `@gaubee/util` 基础上，提供了与 Node.js API 相关的进一步补充。
    - `README-zh.md` (示例，具体内容参考现有 README 或由 AI 生成):

      ```md
      ## 简介

      该项目在 @gaubee/util 的基础上，提供了与 NodeJs-API 相关的进一步补充。
      ```

    - `README.md` (English equivalent)

4.  **使用 (How to use):**

    - 包含 `install` 和 `usage` 小节。
    - `install` 部分列出多种包管理器的安装命令，参考现有 `README.md` (针对 `@gaubee/node`)。
    - `usage` 部分提供一个简单的导入示例，参考现有 `README.md` (针对 `@gaubee/node`)。

5.  **API 文档部分:**

    - 此部分是 AI 生成的核心内容，标题为 `## API`。
    - API 文档按 `MODULE_GROUP_NAME` 组织，每个模块组使用三级 Markdown 标题。
    - 格式: `### {{MODULE_GROUP_NAME}}` (例如: `### env`, `### path`)
    - 目录链接格式: `*   [@gaubee/node/{{MODULE_GROUP_NAME}}](#{{MODULE_GROUP_NAME}})` (例如: `*   [@gaubee/node/env](#env)`)
    - 在每个模块组标题下，列出该模块组包含的所有函数 (`FUNCTIONS`)。
    - **每个函数的格式必须严格遵循以下结构:**
      ````md
      - `{{FUNCTION_NAME}}`:
        - `{{FUNCTION_SIGNATURE}}`
        - {{FUNCTION_SHORT_DESCRIPTION}} (中文或英文，根据目标文件确定)
        - {{FUNCTION_ADDITIONAL_DETAILS}} (可选, 中文或英文)
        - 示例 (可选, Example):
          ```ts
          // {{FUNCTION_EXAMPLE}}
          ```
      ````
    - **格式化示例 (参照 `@gaubee/util/README-zh.md` 的风格，但模块和函数名替换为 `@gaubee/node` 的内容):**

      ```markdown
      ### env

      - `getNodeEnv`:
        - `(): string | undefined`
        - 获取 Node.js 环境变量 `NODE_ENV`

      ### path

      - `resolvePath`:
        - `(...paths: string[]): string`
        - 解析路径
      ```

**AI 的核心执行指令:**
请根据上述提供的输入信息 (`PROJECT_NAME`, `SOURCE_MODULES_INFO`) 和对应项目的 `deno.json` 的 `exports`，生成或更新目标项目 `@gaubee/node` 的 `README.md` 和 `README-zh.md` 文件的 **API 文档部分**和**目录部分**。对于其他部分（如简介、安装、特定说明章节），如果未提供更新内容，则应尽可能保留现有内容或根据通用指南生成。
核心要求：

- **目录和API段落生成**: 严格基于对应项目 `deno.json` 文件中的 `exports` 字段来生成目录项和API文档中的模块标题。如果 `exports` 中不存在某个模块，则不应在目录或API文档中出现该模块。
- **函数覆盖**: 确保 `SOURCE_MODULES_INFO` 中定义的所有模块（这些模块必须存在于 `deno.json` 的 `exports` 中）及其所有导出的函数（特别是 `export const` 形式导出的）都已在 `README.md` 和 `README-zh.md` 的 API 部分列出。
- **格式规范**: 严格按照“API 文档部分”规定的格式进行排版，包括模块标题格式 `### {{MODULE_GROUP_NAME}}` 和目录链接格式 `*   [@gaubee/node/{{MODULE_GROUP_NAME}}](#{{MODULE_GROUP_NAME}})`。
- **多语言链接**: 在 `README.md` 和 `README-zh.md` 的文件开头添加多语言导航链接：`> [中文](./README-zh.md) / [English](./README.md)`。
- 如果是更新现有的 README 文件，请仔细比对当前项目的导出内容与 `SOURCE_MODULES_INFO` 及 `deno.json` 的 `exports`，确保文档与实际代码一致，并统一到本指南所定义的格式标准。
- 确保所有中文描述和补充说明的语言流畅自然，英文版本准确对应。
- 对于函数签名，直接使用提供的 `FUNCTION_SIGNATURE`。
- `FUNCTION_ADDITIONAL_DETAILS` 和 `FUNCTION_EXAMPLE` 是可选的，如果提供则包含。
- **尊重现有内容**: 在更新 `README-zh.md` 或 `README.md` 时，如果某个模块或函数的文档已存在，并且其内容（尤其是描述、示例和补充说明）与 `SOURCE_MODULES_INFO` 中的信息在核心上（如函数签名）保持一致，则应优先保留现有文件中的这部分内容。这因为现有内容可能已经过作者的仔细审核和微调。AI 应仅在 `SOURCE_MODULES_INFO` 提供了新函数、或者现有文档与代码（如函数签名、核心功能描述）存在显著不一致或缺失时，才进行覆盖或全新生成对应部分。
