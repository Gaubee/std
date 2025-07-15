/**
 * https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Locks_API
 */

import {arr_remove_first} from "./array.ts";
import {map_get_or_put} from "./collections.ts";

export type LockMode = "exclusive" | "shared";
export interface LockOptions {
  // ifAvailable?: boolean;
  mode?: LockMode;
  signal?: AbortSignal;
  // steal?: boolean;
}

export class LockManger {
  #locks = new Map<string, Lock[]>();
  #getLocks(name: string) {
    return map_get_or_put(this.#locks, name, () => []);
  }
  /**等到可以执行的时候，返回lock对象 */
  async request(name: string, options: LockOptions = {}): Promise<Lock> {
    const {mode = "exclusive", signal} = options || {};
    const _locks = this.#getLocks(name);
    const lock = new Lock(name, mode, signal, () => {
      arr_remove_first(locks, lock);
      if (locks.length === 0) {
        this.#locks.delete(name);
      }
    });
    // 首先拷贝一份旧的
    const locks = _locks.slice();
    // 然后立刻加入到队列中
    _locks.push(lock);

    /// 如果是共享锁，那么无视其它同批次的共享锁，只需要寻找最后一个互斥锁
    if (mode === "shared") {
      /// 寻找最后一个互斥锁
      const lastExclusiveLock = locks.findLast((lock) => lock.mode === "exclusive");
      // 等待互斥锁执行完毕
      if (lastExclusiveLock != null) {
        await lastExclusiveLock.promise;
      }
    }

    /// 如果是互斥锁，参考最后一个锁
    if (mode === "exclusive") {
      const lastLock = locks.at(-1);
      /// 如果之后一个也是互斥锁，那么等待互斥锁执行完毕
      if (lastLock?.mode === "exclusive") {
        await lastLock.promise;
      } else if (lastLock?.mode === "shared") {
        /// 如果之后一个锁是共享锁，那么找出同批次的共享锁，等待它们全部执行完毕
        const sharedLocks = [lastLock];
        for (let i = locks.length - 2; i >= 0; i--) {
          const lock = locks[i];
          if (lock.mode === "shared") {
            sharedLocks.push(lock);
          } else {
            break;
          }
        }
        await Promise.all(sharedLocks.map((lock) => lock.promise));
      }
    }

    /// 返回锁
    lock.pending = false;
    return lock;
  }
  async run<R>(name: string, options: LockOptions, callback: (lock: Lock) => Promise<R>): Promise<R> {
    using lock = await this.request(name, options);
    return await callback(lock);
  }
  query(name: string): {
    held: Lock[];
    pending: Lock[];
  } {
    const locks = this.#locks.get(name);
    const held: Lock[] = [];
    const pending: Lock[] = [];

    if (locks && locks.length > 0) {
      for (const lock of locks) {
        if (lock.pending) {
          pending.push(lock);
        } else {
          held.push(lock);
        }
      }
    }

    return {
      held,
      pending,
    };
  }
}

class Lock {
  /** 是否正在等待 */
  public pending = true;
  constructor(
    readonly name: string,
    readonly mode: LockMode,
    readonly signal: AbortSignal | undefined,
    private onRelease: () => void,
  ) {
    if (signal) {
      if (signal.aborted) {
        this.#job.reject(signal.reason);
      } else {
        signal.addEventListener("abort", () => {
          this.#job.reject(signal.reason);
        });
      }
    }
  }
  #job = Promise.withResolvers<void>();
  release(): void {
    this.#job.resolve();
    this.onRelease();
  }
  get promise(): Promise<void> {
    return this.#job.promise;
  }
  [Symbol.dispose]() {
    this.release();
  }
}

export const locks: LockManger = new LockManger();
