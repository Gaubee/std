# @gaubee/web

该项目搜罗了一些与 DOM-API 相关的封装

## API

-   **`createAdoptedStyleSheets`** 可以获得一个更加易用的 adoptedStyleSheets（用于管理样式表）
    直接改变这个数组的元素，可以直接让样式生效，另外，在数组的基础上，额外增加了一些快捷操作的方法：
    -   扩展 Array-Like 的方法
        -   `remove: (item: CSSStyleSheet) => void`
        -   `toggle: (item: CSSStyleSheet, enable?: boolean) => void`
        -   `replace: (oldItem: CSSStyleSheet | null | undefined, newItem: CSSStyleSheet) => void`
    -   扩展 Map-like 的方法
        -   `has: (key: unknown) => boolean`
        -   `set: (key: unknown, item: CSSStyleSheet) => void`
        -   `delete: (key: unknown) => void`
        -   `get: (key: unknown) => CSSStyleSheet | undefined`
-   **`new CssSheetArray`** 可以获得一个更加易用的 CSSStyleSheet 控制器
    -   扩展属性
        -   `owner: AdoptedStyleSheets | null` 可以附加到某个样式表上，或者移除
        -   `readonly styleSheet: CSSStyleSheet` 获得 CSSStyleSheet 对象本身（请勿直接用它的 API 进行修改）
        -   `readonly size: number` 获得 CSSRule 的数量
    -   扩展 Array-Like 方法
        -   `addRule: (cssText: string, index?: number) => CSSRule | null`
        -   `removeRule: (index: number) => boolean`
        -   `getRule: (index: number) => CSSRule | null`
        -   `[Symbol.iterator]`
    -   扩展 Map-like 的方法
        -   `keys: () => MapIterator<unknown>`
        -   `hasRule: (key: unknown) => boolean`
        -   `setRule: (key: unknown, cssText: string, index?: number) => CSSRule | null`
        -   `deleteRule: (key: unknown) => boolean`
