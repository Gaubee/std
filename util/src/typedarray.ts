export const typedarray_contact = <
    T extends
        | Uint8Array
        | Uint8ClampedArray
        | Uint16Array
        | Uint32Array
        | BigUint64Array
        | Int8Array
        | Int16Array
        | Int32Array
        | BigInt64Array
        | Float32Array
        | Float64Array,
>(
    ctor: new (len: number) => T,
    buffers: T[],
): T => {
    const res = new ctor(buffers.reduce((len, u) => len + u.length, 0));
    let pos = 0;
    for (const u of buffers) {
        res.set(u as any, pos);
        pos += u.length;
    }
    return res;
};
export const u8a_contact = (...buffers: (Uint8Array | Uint8ClampedArray)[]) =>
    typedarray_contact(Uint8Array, buffers) as Uint8Array<ArrayBuffer>;

export const u8ca_contact = (...buffers: (Uint8Array | Uint8ClampedArray)[]) =>
    typedarray_contact(Uint8ClampedArray, buffers) as Uint8ClampedArray<ArrayBuffer>;

export const u16a_contact = (...u16as: Uint16Array[]) =>
    typedarray_contact(Uint16Array, u16as) as Uint16Array<ArrayBuffer>;

export const u32a_contact = (...u16as: Uint32Array[]) =>
    typedarray_contact(Uint32Array, u16as) as Uint32Array<ArrayBuffer>;

export const u64a_contact = (...u16as: BigUint64Array[]) =>
    typedarray_contact(BigUint64Array, u16as) as BigUint64Array<ArrayBuffer>;

export const i8a_contact = (...buffers: Int8Array[]) =>
    typedarray_contact(Int8Array, buffers) as Int8Array<ArrayBuffer>;

export const i16a_contact = (...u16as: Int16Array[]) =>
    typedarray_contact(Int16Array, u16as) as Int16Array<ArrayBuffer>;

export const i32a_contact = (...u16as: Int32Array[]) =>
    typedarray_contact(Int32Array, u16as) as Int32Array<ArrayBuffer>;

export const i64a_contact = (...u16as: BigInt64Array[]) =>
    typedarray_contact(BigInt64Array, u16as) as BigInt64Array<ArrayBuffer>;

export const f32a_contact = (...u16as: Float32Array[]) =>
    typedarray_contact(Float32Array, u16as) as Float32Array<ArrayBuffer>;

export const f64a_contact = (...u16as: Float64Array[]) =>
    typedarray_contact(Float64Array, u16as) as Float64Array<ArrayBuffer>;
