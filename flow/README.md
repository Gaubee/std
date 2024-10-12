# @gaubee/flow

## [docs 文档](https://jsr.io/@gaubee/flow/doc)

**install:**

```bash
npm install @gaubee/flow
pnpm install @gaubee/flow
yarn install @gaubee/flow
deno add npm:@gaubee/flow
bun add @gaubee/flow

deno add jsr:@gaubee/flow
npx jsr add @gaubee/flow
yarn dlx jsr add @gaubee/flow
pnpm dlx jsr add @gaubee/flow
bunx jsr add @gaubee/flow
```

**example:**

```ts
import { SharedFlow, StateFlow } from "@gaubee/flow";
const shared_flow = new SharedFlow<string>();

// add listen and got stream
const stream = shared_flow.stream();

shared_flow.emit("hi");

for await (const data of stream) {
    console.log(data);
    // break loop will remove listen
    break;
}

// 基本用法
shared_flow.on((data) => console.log("on", data));
shared_flow.emit("hi");

// 监听的时候可以自定义key
shared_flow.on((data) => console.log("on", data), { key: "key1" });
// 监听的时候可以自定义移除监听时的函数
shared_flow.on((data) => console.log("on", data), {
    onDispose: () => {
        console.log("off");
    },
});

// 单次监听，回调函数模式
shared_flow.once((data) => console.log("once", data));
// 单词监听，promise模式
shared_flow.once().then((data) => console.log("once.then", data));
```
