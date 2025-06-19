import assert from "node:assert";
import {pureEvent} from "./pure_event.ts";

Deno.test("pure_event", async () => {
  const pe = pureEvent<string>();
  const res = Promise.withResolvers<string>();
  pe((data) => {
    res.resolve(data);
  });
  pe.emit("hi");
  assert.equal(await res.promise, "hi");
});

Deno.test("pure_event once", async () => {
  const pe = pureEvent<string>();
  const res = Promise.withResolvers<string>();
  pe.once((data) => {
    res.resolve(data);
  });
  pe.emit("hi");
  assert.equal(await res.promise, "hi");
});

Deno.test("pure_event once2", async () => {
  const pe = pureEvent<string>();
  const res = Promise.withResolvers<string>();
  const once = pe.once;
  once((data) => {
    res.resolve(data);
  });
  pe.emit("hi");
  assert.equal(await res.promise, "hi");
});
