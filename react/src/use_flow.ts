import { type SetStateAction, useInsertionEffect, useState } from "react";

import { type SharedFlow, StateFlow } from "@gaubee/flow";
import { type EasyState, type ReactState, easy_state_proto } from "./use_easy_state.ts";
interface UseFlow {
  <T>(flow: StateFlow<T>, state?: ReactState<T>): EasyState<T>;
  <T>(flow: SharedFlow<T>, state: ReactState<T>): EasyState<T>;
  <T>(flow: SharedFlow<T | undefined>, state?: ReactState<T | undefined>): EasyState<T | undefined>;
}

export const useFlow: UseFlow = <T extends unknown>(flow: SharedFlow<T>, state?: ReactState<T>) => {
  if (state == null) {
    state = (flow instanceof StateFlow ? useState(flow.value) : useState()) as ReactState<T>;
  }
  const [value, setValue] = state;
  const setValue2 = (valAc: SetStateAction<T>) => {
    flow.emit(typeof valAc === "function" ? (valAc as (prevState: T) => T)(value) : valAc);
  };
  useInsertionEffect(() => {
    // if (flow instanceof StateFlow) {
    //   setValue(flow.value);
    // }
    const off = flow.on(setValue);
    return () => void off();
  }, [flow]);
  return Object.setPrototypeOf([value, setValue2], easy_state_proto) as EasyState<T>;
};
