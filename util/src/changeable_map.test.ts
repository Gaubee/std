import { ChangeableMap, type ChangeEventData } from "../src/changeable-map.ts";

// 基本测试
Deno.test("ChangeableMap 基本测试", async () => {
  // 创建Map实例
  const map = new ChangeableMap<string, number>();

  // 监听添加和更新事件
  const events: ChangeEventData<string, number>[] = [];
  //  监听map新增
  map.addFlow.on((data) => {
    console.log("新增:", data.key, "值:", data.value);
    events.push(data);
  });
  // 监听更新
  map.updateFlow.on((data) => {
    console.log("更新:", data.key, "值:", data.value);
    events.push(data);
  });
  // 监听删除
  map.deleteFlow.on((data) => {
    console.log("删除:", data.key, "值:", data.value, "旧值:", data.oldValue);
    events.push(data);
  });

  // 测试添加元素
  map.set("a", 1); // 应触发ADD事件

  // 测试更新元素
  map.set("a", 2); // 应触发UPDATE事件

  // 测试删除元素
  map.delete("a"); // 应触发DELETE事件

  // 等待所有事件触发完成
  await new Promise((resolve) => setTimeout(resolve, 10));

  // 验证事件数量和类型
  console.log("捕获的事件总数:", events.length);

  // 测试一次性监听
  map.addFlow.once((data) => {
    console.log("一次性监听结果:", data);
  });
  map.set("b", 3);
  map.set("c", 4);
});

// 流式处理测试
Deno.test("ChangeableMap 流式处理", async () => {
  const map = new ChangeableMap<string, number>();

  // 启动事件流监听
  const streamTest = async () => {
    let count = 0;
    for await (const change of map.addFlow.stream()) {
      console.log("流接收:", change.key, change.value);
      count++;
      if (count >= 3) break; // 只处理前3个事件
    }
    console.log("流处理完成，共处理", count, "个事件");
  };

  // 启动流处理
  const streamPromise = streamTest();

  // 稍等一下确保流监听已建立
  await new Promise((resolve) => setTimeout(resolve, 10));

  // 触发一些变更
  map.set("x", 1);
  map.set("y", 2);
  map.set("z", 3);
  map.set("x", 10);

  // 等待流处理完成
  await streamPromise;
});
