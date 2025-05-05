import { StateFlow } from "./state_flow.ts";
import { curryThisFn } from "@gaubee/util";

// 测试构造函数初始值设置
Deno.test("StateFlow - should initialize with correct value", () => {
    const initialValue = 42;
    const stateFlow = new StateFlow(initialValue);
    assert.strictEqual(stateFlow.value, initialValue);
});

// 测试 value 的 getter 和 setter
Deno.test("StateFlow - should update value through setter", () => {
    const stateFlow = new StateFlow(1);
    const newValue = 2;
    stateFlow.value = newValue;
    assert.strictEqual(stateFlow.value, newValue);
});

// 测试 emit 方法的状态变化
Deno.test("StateFlow - should emit new value and update state", async () => {
    const stateFlow = new StateFlow(0);
    const newValue = 100;

    // 创建一个监听器来验证 emit
    let emittedValue: number | undefined;
    stateFlow.on((value) => {
        emittedValue = value;
    });

    await stateFlow.emit(newValue);

    assert.strictEqual(stateFlow.value, newValue);
    assert.strictEqual(emittedValue, newValue);
});

// 测试相同值的 emit 不会触发更新
Deno.test("StateFlow - should not emit when value is the same", async () => {
    const stateFlow = new StateFlow(1);
    let emitCount = 0;

    stateFlow.on(() => {
        emitCount++;
    });

    await stateFlow.emit(1); // 相同的值
    assert.strictEqual(emitCount, 0); // 不应该触发 emit

    await stateFlow.emit(2); // 不同的值
    assert.strictEqual(emitCount, 1); // 应该触发一次 emit
});

// 测试新订阅者是否立即收到当前状态
Deno.test(
    "StateFlow - should immediately emit current value to new subscribers",
    () => {
        const initialValue = 42;
        const stateFlow = new StateFlow(initialValue);

        let receivedValue: number | undefined;
        stateFlow.watchImmediate((value) => {
            receivedValue = value;
        });

        // 新订阅者应该立即收到当前值
        assert.strictEqual(receivedValue, initialValue);

        // 发送新值，新订阅者应该立即收到新值
        stateFlow.emit(43);
        stateFlow.on((value) => {
            receivedValue = value;
        });
        assert.strictEqual(receivedValue, 43);
    },
);
