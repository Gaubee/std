import assert from "node:assert";
import { pureEvent } from "./pure_event.ts";

Deno.test("pure_event", async () => {
  const pe = pureEvent<string>();
  const res = Promise.withResolvers<string>();
  pe((data) => {
    res.resolve(data);
  });
  pe.emit("hi");
  assert.equal(await res.promise, "hi");
});
