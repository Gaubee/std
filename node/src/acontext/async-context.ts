import { AsyncLocalStorage } from "node:async_hooks";

/**
 * 异步上下文存储的通用接口，对齐 TC39 proposal-async-context。
 * 这层抽象允许我们在不同 JS 运行时之间切换实现。
 */
export interface AsyncContextStorage<T> {
  /**
   * 创建并进入一个新的异步上下文。
   * @param store 上下文中要存储的数据
   * @param callback 在此上下文中执行的函数
   */
  run<R>(store: T, callback: () => R): R;

  /**
   * 获取当前异步上下文中的数据。
   * @returns 如果在上下文中，则返回存储的数据；否则返回 undefined。
   */
  getStore(): T | undefined;
}

/**
 * 基于 Node.js 原生 AsyncLocalStorage 的实现。
 */
class NodeAsyncContextStorage<T> implements AsyncContextStorage<T> {
  private readonly als: AsyncLocalStorage<T>;

  constructor() {
    this.als = new AsyncLocalStorage<T>();
  }

  run<R>(store: T, callback: () => R): R {
    return this.als.run(store, callback);
  }

  getStore(): T | undefined {
    return this.als.getStore();
  }
}

/**
 * 一个简单的 Polyfill，用于不支持 AsyncLocalStorage 的环境。
 * 注意：这个 Polyfill 不支持跨异步任务的上下文传递，主要用于简化测试或基础场景。
 */
class FallbackAsyncContextStorage<T> implements AsyncContextStorage<T> {
  private currentStore: T | undefined = undefined;

  run<R>(store: T, callback: () => R): R {
    const previousStore = this.currentStore;
    this.currentStore = store;
    try {
      return callback();
    } finally {
      this.currentStore = previousStore;
    }
  }

  getStore(): T | undefined {
    return this.currentStore;
  }
}

export const createAsyncContextStorage = <T,>(): AsyncContextStorage<T> => {
  // 优先使用 Node.js 的原生实现
  if (typeof AsyncLocalStorage === "function") {
    return new NodeAsyncContextStorage<T>();
  }
  // 否则使用备用方案
  console.warn("AsyncLocalStorage is not available. Falling back to a simple polyfill. Concurrency issues may occur.");
  return new FallbackAsyncContextStorage<T>();
};
