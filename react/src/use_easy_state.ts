import { obj_assign_safe_props } from "@gaubee/util";
import { type Dispatch, type SetStateAction, useState } from "react";

export type ReactState<T> = [T, Dispatch<SetStateAction<T>>];
export interface EasyState<T> extends ReactState<T> {
    value: T;
    dispatch: Dispatch<SetStateAction<T>>;
}
export interface UseEasyState {
    <T>(initialState: T | (() => T)): EasyState<T>;
    <T>(initialState?: undefined): EasyState<T | undefined>;
}
export const easy_state_proto = obj_assign_safe_props([] as any as ReactState<any>)({
    get value() {
        return this[0];
    },
    set value(value) {
        this[1](value);
    },
});

export const useEasyState: UseEasyState = <T extends unknown>(initialState?: T) => {
    const state = useState(initialState);
    Object.setPrototypeOf(state, easy_state_proto);
    return state as EasyState<T>;
};
