import { SharedFlow } from "@gaubee/flow";

/**
 * 定义事件类型枚举
 */
export enum ChangeEvent {
  ADD = "add", // 添加事件
  UPDATE = "update", // 更新事件
  DELETE = "delete", // 删除事件
}

/**
 * 回调函数类型定义
 */
export type ChangeCallback<K, V> = (
  event: ChangeEvent,
  key: K,
  value: V | undefined,
  oldValue?: V
) => void;

/**
 * 事件数据接口
 */
export interface ChangeEventData<K, V> {
  key: K; // 键
  value: V | undefined; // 当前值
  oldValue?: V; // 旧值（如果有）
}

/**
 * 可监听变化的Map实现
 * 能够监听元素的删除/新增/更新
 */
export class ChangeableMap<K, V> extends Map<K, V> {
  addFlow = new SharedFlow<ChangeEventData<K, V>>(); // 添加事件流
  updateFlow = new SharedFlow<ChangeEventData<K, V>>(); // 更新事件流
  deleteFlow = new SharedFlow<ChangeEventData<K, V>>(); // 删除事件流

  /**
   * 根据事件类型获取对应的流
   */
  #getFlowByType(type: ChangeEvent): SharedFlow<ChangeEventData<K, V>> {
    switch (type) {
      case ChangeEvent.ADD:
        return this.addFlow;
      case ChangeEvent.UPDATE:
        return this.updateFlow;
      case ChangeEvent.DELETE:
        return this.deleteFlow;
      default:
        throw new Error(`未知的事件类型: ${type}`);
    }
  }

  /**
   * 触发事件通知所有监听器
   */
  async #notifyListeners(
    event: ChangeEvent,
    key: K,
    value: V | undefined,
    oldValue?: V
  ): Promise<void> {
    const eventData: ChangeEventData<K, V> = { key, value, oldValue };
    // 根据事件类型选择对应的流
    const flow = this.#getFlowByType(event);
    await flow.emit(eventData);
  }

  /**
   * 设置键值对，如果键已存在则更新值
   * @param key 键
   * @param value 值
   * @returns this 支持链式调用
   */
  override set(key: K, value: V): this {
    const hasKey = this.has(key);
    const oldValue = hasKey ? this.get(key) : undefined;

    super.set(key, value);

    if (hasKey) {
      this.#notifyListeners(ChangeEvent.UPDATE, key, value, oldValue);
    } else {
      this.#notifyListeners(ChangeEvent.ADD, key, value);
    }

    return this;
  }

  /**
   * 删除指定键的值
   * @param key 键
   * @returns 是否成功删除
   */
  override delete(key: K): boolean {
    if (this.has(key)) {
      const oldValue = this.get(key);
      const result = super.delete(key);
      this.#notifyListeners(ChangeEvent.DELETE, key, undefined, oldValue);
      return result;
    }
    return false;
  }

  /**
   * 清空Map中的所有元素
   */
  override clear(): void {
    // 获取所有键值对的副本以通知删除事件
    const entries = Array.from(this.entries());
    super.clear();

    // 为每个被删除的元素触发删除事件
    for (const [key, value] of entries) {
      this.#notifyListeners(ChangeEvent.DELETE, key, undefined, value);
    }
  }

  // Map 的迭代方法已经由 extends Map<K, V> 继承
}
