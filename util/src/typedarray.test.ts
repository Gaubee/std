import assert from "node:assert";
import {
    typedarray_contact,
    u8a_contact,
    u16a_contact,
    u32a_contact,
    i8a_contact,
    i16a_contact,
    i32a_contact,
    f32a_contact,
    f64a_contact,
} from "./typedarray.ts";

Deno.test("typedarray_contact - Uint8Array", () => {
    const arr1 = new Uint8Array([1, 2, 3]);
    const arr2 = new Uint8Array([4, 5, 6]);
    const result = typedarray_contact(Uint8Array, [arr1, arr2]);
    assert.deepEqual(result, new Uint8Array([1, 2, 3, 4, 5, 6]));
});

Deno.test("u8a_contact", () => {
    const arr1 = new Uint8Array([1, 2, 3]);
    const arr2 = new Uint8Array([4, 5, 6]);
    const arr3 = new Uint8Array([7, 8, 9]);
    const result = u8a_contact(arr1, arr2, arr3);
    assert.deepEqual(result, new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9]));
});

Deno.test("u16a_contact", () => {
    const arr1 = new Uint16Array([1000, 2000]);
    const arr2 = new Uint16Array([3000, 4000]);
    const result = u16a_contact(arr1, arr2);
    assert.deepEqual(result, new Uint16Array([1000, 2000, 3000, 4000]));
});

Deno.test("u32a_contact", () => {
    const arr1 = new Uint32Array([100000, 200000]);
    const arr2 = new Uint32Array([300000, 400000]);
    const result = u32a_contact(arr1, arr2);
    assert.deepEqual(result, new Uint32Array([100000, 200000, 300000, 400000]));
});

Deno.test("i8a_contact", () => {
    const arr1 = new Int8Array([-1, -2]);
    const arr2 = new Int8Array([-3, -4]);
    const result = i8a_contact(arr1, arr2);
    assert.deepEqual(result, new Int8Array([-1, -2, -3, -4]));
});

Deno.test("i16a_contact", () => {
    const arr1 = new Int16Array([-1000, -2000]);
    const arr2 = new Int16Array([-3000, -4000]);
    const result = i16a_contact(arr1, arr2);
    assert.deepEqual(result, new Int16Array([-1000, -2000, -3000, -4000]));
});

Deno.test("i32a_contact", () => {
    const arr1 = new Int32Array([-100000, -200000]);
    const arr2 = new Int32Array([-300000, -400000]);
    const result = i32a_contact(arr1, arr2);
    assert.deepEqual(result, new Int32Array([-100000, -200000, -300000, -400000]));
});

Deno.test("f32a_contact", () => {
    const arr1 = new Float32Array([1.1, 2.2]);
    const arr2 = new Float32Array([3.3, 4.4]);
    const result = f32a_contact(arr1, arr2);
    assert.deepEqual(result, new Float32Array([1.1, 2.2, 3.3, 4.4]));
});

Deno.test("f64a_contact", () => {
    const arr1 = new Float64Array([1.11, 2.22]);
    const arr2 = new Float64Array([3.33, 4.44]);
    const result = f64a_contact(arr1, arr2);
    assert.deepEqual(result, new Float64Array([1.11, 2.22, 3.33, 4.44]));
});
