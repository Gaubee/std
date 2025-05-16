import {abort_signal_race, type PromiseMaybe} from "@gaubee/util";
import type React from "react";
import {type DependencyList, useEffect, useInsertionEffect, useLayoutEffect} from "react";

export const asyncEffectCallback = (fn: (signal: AbortSignalWithRace) => Promise<void>): React.EffectCallback => {
  return () => {
    const abort = new AbortController();
    fn(
      Object.assign(abort.signal, {
        race: (...args: Slice1<Parameters<typeof abort_signal_race>>) => abort_signal_race(abort.signal, ...args),
      }) as AbortSignalWithRace,
    );
    return () => abort.abort();
  };
};
type Slice1<T> = T extends [any, ...infer R] ? R : never;
export type AbortSignalWithRace = AbortSignal & {
  race: <T>(fn_or_promise: PromiseLike<T> | (() => PromiseLike<T>)) => PromiseMaybe<T>;
};

export const useAsyncEffect = (fn: (signal: AbortSignalWithRace) => Promise<void>, deps?: DependencyList): void => {
  useEffect(asyncEffectCallback(fn), deps);
};

export const useAsyncLayoutEffect = (fn: (signal: AbortSignalWithRace) => Promise<void>, deps?: DependencyList): void => {
  useLayoutEffect(asyncEffectCallback(fn), deps);
};

export const useAsyncInsertionEffect = (fn: (signal: AbortSignalWithRace) => Promise<void>, deps?: DependencyList): void => {
  useInsertionEffect(asyncEffectCallback(fn), deps);
};
