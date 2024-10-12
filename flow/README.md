# @gaubee/flow

启发于 kotlin 的 flow，针对 js/ts 开发人员设计的接口，通常可以作为一个事件管理器

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

- Basic Usage: `SharedFlow extends PureEventDelegate`

```ts
import { SharedFlow } from "@gaubee/flow";
const shared_flow = new SharedFlow<string>();
/// basic
// add listen
const off = shared_flow.on((data) => console.log("on", data));
// dispatch listen
shared_flow.emit("hi");
// remove listen
off();

// add listen with custom key
shared_flow.on((data) => console.log("on", data), { key: "key1" });
// remove listen with custom key
shared_flow.off("key1");

// add listen width dispose function
const off = shared_flow.on((data) => console.log("on", data), {
  onDispose: async () => {
    console.log("off");
    return 123;
  },
});
// remove listen and run dispatch function
console.log(await off()); // { status: "fulfilled", value: 123 }

/// once
// add one time listen with callback function
shared_flow.once((data) => console.log("once", data));
// add one time listen without callback function and return promise
shared_flow.once().then((data) => console.log("once.then", data));
// add one time listen with filter function
shared_flow
  .once({
    filter(data) {
      return data == "match";
    },
  })
  .then((data) => console.log("once filter", data));
```

- `SharedFlow.stream`

```ts
import { SharedFlow } from "@gaubee/flow";
const shared_flow = new SharedFlow<string>();

// add listen and got stream
const stream = shared_flow.stream();

shared_flow.emit("hi");

for await (const data of stream) {
  console.log(data);
  // break loop will remove listen
  break;
}
```

- `StateFlow extends SharedFlow` & `StateFlow.value`

```ts
import { StateFlow } from "@gaubee/flow";

const state_flow = new StateFlow<string>("v1");
state_flow.emit("v2");
state_flow.value === "v2";
state_flow.value = "v3";
```
