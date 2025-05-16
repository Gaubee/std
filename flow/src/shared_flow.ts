import {PureEvent, PureEventDelegate, type PureEventListenOptions, type ReadableDefaultStreamWithController, rs_with_controller} from "@gaubee/util";

/**
 * 个极简的事件监听, 支持异步错误捕捉
 * 对流有着极好的支持，支持背压，因此你甚至可以把它当作一个流发射器
 *
 * @example
 * ```ts
 * const flow = new SharedFlow<number>();
 *
 * const off = flow.on((data) => {
 *      console.log('on data', data)
 * })
 *
 * async function once() {
 *      flow.once((data) => {
 *           console.log('once data', data)
 *      })
 *      console.log('await once data', await flow.once())
 * }
 *
 * async function emit() {
 *     for (let i = 0; i < 10; i++) {
 *         await flow.emit(i);
 *     }
 * }
 *
 * async function stream() {
 *     for await (const data of flow) {
 *         await delay(1000);
 *         console.log('for await', data);
 *     }
 * }
 * ```
 */
export class SharedFlow<T> extends PureEventDelegate<T> implements AsyncIterable<T> {
  constructor(by: PureEvent<T> = new PureEvent()) {
    super(by);
  }
  /**
   * 将事件以流的方式发出
   * 和使用 `for await (const data of flow)` 的方式来隐性触发流监听不同，这里的 stream 函数在调用的时候，就会立刻进行数据监听，因此可以避免一些执行顺序的误会
   */
  stream(options?: PureEventListenOptions): AsyncGenerator<Awaited<T>, void, unknown> {
    const readable = rs_with_controller<T>();
    const off = this.on(
      async (data) => {
        readable.controller.enqueue(data);
        if ((readable.controller.desiredSize ?? 1) <= 0) {
          await readable.onPull.once();
        }
      },
      {
        ...options,
        onDispose() {
          stream.return();
          options?.onDispose?.();
        },
      },
    );
    // 在流结束的时候，清理监听
    readable.onCancel.once(() => {
      readable.onPull.clean();
      off();
    });

    const stream = this.#stream(readable);
    return stream;
  }
  async *#stream(readable: ReadableDefaultStreamWithController<T>) {
    try {
      const reader = readable.stream.getReader();
      while (true) {
        const item = await reader.read();
        if (item.done) {
          break;
        }
        yield item.value;
      }
    } catch (e) {
      console.log("catch", e);
      readable.controller.error(e);
    } finally {
      console.log("finally");
      readable.controller.close();
    }
  }
  [Symbol.asyncIterator](): AsyncGenerator<Awaited<T>, void, unknown> {
    return this.stream();
  }
}

export const sharedFlow = <T>(by?: PureEvent<T>): SharedFlow<T> => new SharedFlow(by);
