import type {Timmer} from "@gaubee/util";
import type {EventEmitter as NodeEventEmitter} from "node:events";
export const nodeTimmers = {
  eventEmitter: ((emitter: import("node:events").EventEmitter, name: string, filter?: (...args: unknown[]) => boolean | void) => {
    return ((resolve) => {
      let cb: (args: unknown[]) => void;
      if (typeof filter === "function") {
        cb = (...args) => {
          if (filter(...args)) {
            resolve(args);
            emitter.off(name, cb);
          }
        };
        emitter.on(name, cb);
      } else {
        emitter.once(name as string, (cb = (...args) => resolve(args)));
      }
      return () => emitter.off(name, cb);
    }) as Timmer<unknown[]>;
  }) as NodeTimmer.EventEmiter,
};

export namespace NodeTimmer {
  export interface EventEmiter {
    <EE extends NodeEventEmitter, N extends EventEmiter.GetEventName<EE>>(
      emitter: EE,
      name: N,
      filter?: (...args: EventEmiter.GetEventType<EE, N>) => boolean | void,
    ): Timmer<EventEmiter.GetEventType<EE, N>>;
    <Args extends unknown[]>(emitter: NodeEventEmitter, name: string, filter?: (...args: Args) => boolean | void): Timmer<Args>;
  }
  export namespace EventEmiter {
    export type GetEventMap<EE> = EE extends NodeEventEmitter<infer E extends Record<keyof E, any[]>> ? E : Record<string, any[]>;
    export type GetEventName<EE> = keyof GetEventMap<EE>;
    export type GetEventType<EE, N> = N extends keyof GetEventMap<EE> ? (GetEventMap<EE>[N] extends unknown[] ? GetEventMap<EE>[N] : unknown[]) : unknown[];
  }
}
