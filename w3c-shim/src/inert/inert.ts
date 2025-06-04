/**
 * Checks if the `inert` attribute is supported.
 * @see https://caniuse.com/mdn-api_htmlelement_inert
 * - Chrome: 102+
 * - Safari: 15.5+
 */
export const caniuseInert = "inert" in document.documentElement;
import {element_inert as native_element_inert} from "./inert.native.ts";
import {element_inert as shim_element_inert} from "./inert.shim.ts";
export const element_inert = caniuseInert ? native_element_inert : shim_element_inert;
