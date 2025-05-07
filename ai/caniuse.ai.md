为我这个项目中 caniuse 开头的const常量，加上对应的caniuse链接到其注释中，并直接在注释中补充Chrome/Safari这两个浏览器的支持情况。

参考格式：

```ts
/**
 * Checks if the `scrollend` event is supported.
 * @see 
 * - Chrome: 114+
 * - Safari: Not Support
 */
export const caniuseScrollEnd = "onscrollend" in globalThis;@
```
