/**
 * Checks if the `Promise.withResolvers` method is supported.
 * @see https://caniuse.com/mdn-javascript_builtins_promise_withresolvers
 * - Chrome: 119+
 * - Safari: 17.2+
 */
export const caniusePromiseWithResolvers = "withResolvers" in Promise;

import {promise_with_resolvers as native_promise_with_resolvers} from "./promise.native.ts";
import {promise_with_resolvers as shim_promise_with_resolvers} from "./promise.shim.ts";

export const promise_with_resolvers = caniusePromiseWithResolvers ? native_promise_with_resolvers : shim_promise_with_resolvers;
