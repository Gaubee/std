# @gaubee/util

这是我项目开发经验沉淀下来的经验。

### 风格理念

因为我对 js/ts 的十几年的使用理念，已经从别人口中推荐的“不要污染原型链”，变成了“应该充分利用原型链”。

并且，随着 [shadowrealm 提案](https://github.com/tc39/proposal-shadowrealm) 的演进，污染原型链在复杂项目里头就将不再是问题。
在原型链上扩展函数，可以达到很多符合直觉的开发体验。

但同时，这个库也给出了非污染的方案，你可以按需导入使用。

在当下，使用污染原型链的方案，主要用于最上层应用级别，如果你的开发是给别人做库，那么我也建议你别污染原型链，否则会给它人带来负担。

### API

- `@gaubee/util/lrc`
- `@gaubee/util/func`
- `@gaubee/util/evt`
- `@gaubee/util/collections`
