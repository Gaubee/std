/**
 * Checks if the `scrollend` event is supported.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollend_event
 * Chrome: 114+
 * Safari: 16.4+
 */
export const caniuseScrollEnd = "onscrollend" in globalThis;
import {
    addScrollendEventListener as native_addScrollendEventListener,
    removeScrollendEventListener as native_removeScrollendEventListener,
} from "./scrollend.native.ts";
import {
    addScrollendEventListener as shim_addScrollendEventListener,
    removeScrollendEventListener as shim_removeScrollendEventListener,
} from "./scrollend.shim.ts";
export const removeScrollendEventListener = caniuseScrollEnd
    ? native_removeScrollendEventListener
    : shim_removeScrollendEventListener;
export const addScrollendEventListener = caniuseScrollEnd
    ? native_addScrollendEventListener
    : shim_addScrollendEventListener;
