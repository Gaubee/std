> 基于 `@gaubee/util/src` 目录下各模块的导出，补充 `@gaubee/util/README.md` 和 `@gaubee/util/README-zh.md` 文档内容。
> 目标是确保 README 文件准确、清晰地反映库所提供的工具函数，并遵循 `@gaubee/util` 现有的 README 风格和结构。

# AI 任务：@gaubee/util README.md 内容生成与格式化指南

**项目背景与目标:**
您是一个 AI 助手，当前任务是为 `@gaubee/util` 这个 JavaScript/TypeScript 工具函数库项目生成或更新其 `README.md` (英文) 和 `README-zh.md` (中文) 文件。文档需要基于项目 `src` 目录下的模块导出（例如 `src/array.ts`, `src/date.ts` 等）。目标是确保 README 文件能够准确、清晰地反映库所导出的工具函数，并且严格遵守下述的格式和内容标准，此标准基于现有 `@gaubee/util/README.md` 的结构和风格。

**AI 执行此任务时所需的输入信息:**

1.  `PROJECT_NAME`: (字符串) 包的完整名称，固定为：`@gaubee/util`。
2.  `SOURCE_MODULES_INFO`: (对象数组) 一个包含所有从 `src` 目录导出的模块及其函数详细信息的列表。每个模块对象应包含：
    *   `MODULE_GROUP_NAME`: (字符串) 模块的分组名称，通常来源于文件名（例如：`array` 来自 `array.ts`, `date` 来自 `date.ts`）。
    *   `FUNCTIONS`: (对象数组) 该模块下所有导出函数的列表，每个函数对象包含：
        *   `FUNCTION_NAME`: (字符串) 函数的导出名称（例如：`arr_set_next`, `date_clone`）。
        *   `FUNCTION_SIGNATURE`: (字符串) 函数的 TypeScript 签名（例如：`(arr: Array<T>, item: T) => void`, `(date: Date) => Date`）。
        *   `FUNCTION_SHORT_DESCRIPTION_CHINESE`: (字符串) 对函数功能的简明中文描述（例如：`在数组末尾追加元素`）。
        *   `FUNCTION_SHORT_DESCRIPTION_ENGLISH`: (字符串) 对函数功能的简明英文描述（例如：`Appends an element to the end of an array`）。
        *   `FUNCTION_ADDITIONAL_DETAILS_CHINESE`: (字符串, 可选) 关于该函数的其他重要补充说明或特性描述（中文），例如性能特点、与标准库函数的对比、使用注意事项等。
        *   `FUNCTION_ADDITIONAL_DETAILS_ENGLISH`: (字符串, 可选) 关于该函数的其他重要补充说明或特性描述（英文）。
        *   `FUNCTION_EXAMPLE_CHINESE`: (字符串, 可选) 函数使用示例代码（中文注释）。
        *   `FUNCTION_EXAMPLE_ENGLISH`: (字符串, 可选) 函数使用示例代码（英文注释）。

**`README.md` (英文) 和 `README-zh.md` (中文) 文件结构与内容排版规范:**

*   **通用要求**: `README-zh.md` 使用中文内容，`README.md` 使用对应的英文内容。以下规范以中文为例，英文版需做相应翻译。

1.  **主标题:**
    *   必须使用一级 Markdown 标题。
    *   格式: `# @gaubee/util`

2.  **徽章 (Badges):**
    *   (如果 AI 可以获取或被提供，则包含，否则提示开发者手动添加/保留此部分)
    *   例如：`[![JSR @gaubee](https://jsr.io/badges/@gaubee)](https://jsr.io/@gaubee)`

3.  **引言段落 (简介):**
    *   紧跟主标题（或徽章）下方。
    *   参考 `@gaubee/util/README.md` 的现有风格，强调库的特点：个人项目经验、常用函数集合、与 `@std/*` 互补、性能、易用性、Tree-Shaking 友好、非垫片库等。
    *   `README-zh.md`:
        ```md
        ## 简介

        1.  个人项目经验，涵盖大量常用函数集合，建议与 deno 的 [`@std/*`](https://jsr.io/@std) 互为补充。
            > 这个库中与 @std 系列有一些交集，交集的部分通常是我个人觉得我自己的实现更好：
            >
            > - 可能是性能上更好
            > - 可能是使用体验上更易用好用
            > - 可能是条件边界覆盖更全。
        2.  这个库通常不会包含垫片相关的，只要在 esnext 范畴内我都会使用，所以请自行处理垫片相关的问题
            > 例如 Promise.withResolvers
        ```
    *   `README.md` (English equivalent)

4.  **使用 (How to use):**
    *   包含 `install` 和 `usage` 小节。
    *   `install` 部分列出多种包管理器的安装命令，参考现有 `README.md`。
    *   `usage` 部分提供一个简单的导入示例，参考现有 `README.md`。

5.  **特定说明章节 (例如 "关于 @gaubee/util/global"):**
    *   如果存在这类特殊章节，AI 应被指示保留这些章节的现有内容，或根据提供的特定指令进行更新。通常这类内容可能需要手动维护。

6.  **API 文档部分:**
    *   此部分是 AI 生成的核心内容，标题为 `## API`。
    *   API 文档按 `MODULE_GROUP_NAME` 组织，每个模块组使用三级 Markdown 标题。
    *   格式: `### {{MODULE_GROUP_NAME}}` (例如: `### array`, `### date`)
    *   目录链接格式: `*   [@gaubee/util/{{MODULE_GROUP_NAME}}](#{{MODULE_GROUP_NAME}})` (例如: `*   [@gaubee/util/array](#array)`)
    *   在每个模块组标题下，列出该模块组包含的所有函数 (`FUNCTIONS`)。
    *   **每个函数的格式必须严格遵循以下结构:**
        ```md
        -   `{{FUNCTION_NAME}}`:
            -   `{{FUNCTION_SIGNATURE}}`
            -   {{FUNCTION_SHORT_DESCRIPTION}} (中文或英文，根据目标文件确定)
            -   {{FUNCTION_ADDITIONAL_DETAILS}} (可选, 中文或英文)
            -   示例 (可选, Example):
                ```ts
                // {{FUNCTION_EXAMPLE}}
                ```
        ```
    *   **格式化示例 (参照 `@gaubee/util/README-zh.md` 的风格):**
        ```markdown
        ### array

        -   `arr_set_next`:
            -   `(arr: Array<T>, item: T) => void`
            -   在数组末尾追加元素
        -   `sparse_arr_get_first`:
            -   `<T>(arr: ArrayLike<T>) => T`
            -   取数组第一个元素（跳过稀疏部分），不存在则抛出异常

        ### date

        -   `date_clone`:
            -   `(date: Date) => Date`
            -   克隆 Date 对象
            -   基于 `new Date(date.getTime())` 实现，确保高性能。
            -   示例:
                ```ts
                const originalDate = new Date();
                const clonedDate = date_clone(originalDate);
                console.log(clonedDate !== originalDate); // true
                console.log(clonedDate.getTime() === originalDate.getTime()); // true
                ```
        ```

**AI 的核心执行指令:**
请根据上述提供的输入信息 (`PROJECT_NAME`, `SOURCE_MODULES_INFO`) 和 `deno.json` 的 `exports`，生成或更新目标项目 `@gaubee/util` 的 `README.md` 和 `README-zh.md` 文件的 **API 文档部分**和**目录部分**。对于其他部分（如简介、安装、特定说明章节），如果未提供更新内容，则应尽可能保留现有内容或根据通用指南生成。
核心要求：
-   **目录和API段落生成**: 严格基于 `deno.json` 文件中的 `exports` 字段来生成目录项和API文档中的模块标题。如果 `exports` 中不存在某个模块，则不应在目录或API文档中出现该模块。
-   **函数覆盖**: 确保 `SOURCE_MODULES_INFO` 中定义的所有模块（这些模块必须存在于 `deno.json` 的 `exports` 中）及其所有导出的函数（特别是 `export const` 形式导出的）都已在 `README.md` 和 `README-zh.md` 的 API 部分列出。
-   **格式规范**: 严格按照“API 文档部分”规定的格式进行排版，包括模块标题格式 `### {{MODULE_GROUP_NAME}}` 和目录链接格式 `*   [@gaubee/util/{{MODULE_GROUP_NAME}}](#{{MODULE_GROUP_NAME}})`。
-   **多语言链接**: 在 `README.md` 和 `README-zh.md` 的文件开头添加多语言导航链接：`> [中文](./README-zh.md) [English](./README.md)`。
-   如果是更新现有的 README 文件，请仔细比对当前项目的导出内容与 `SOURCE_MODULES_INFO` 及 `deno.json` 的 `exports`，确保文档与实际代码一致，并统一到本指南所定义的格式标准。
-   确保所有中文描述和补充说明的语言流畅自然，英文版本准确对应。
-   对于函数签名，直接使用提供的 `FUNCTION_SIGNATURE`。
-   `FUNCTION_ADDITIONAL_DETAILS` 和 `FUNCTION_EXAMPLE` 是可选的，如果提供则包含。
-   **尊重现有内容**: 在更新 `README-zh.md` 或 `README.md` 时，如果某个模块或函数的文档已存在，并且其内容（尤其是描述、示例和补充说明）与 `SOURCE_MODULES_INFO` 中的信息在核心上（如函数签名）保持一致，则应优先保留现有文件中的这部分内容。这因为现有内容可能已经过作者的仔细审核和微调。AI 应仅在 `SOURCE_MODULES_INFO` 提供了新函数、或者现有文档与代码（如函数签名、核心功能描述）存在显著不一致或缺失时，才进行覆盖或全新生成对应部分。