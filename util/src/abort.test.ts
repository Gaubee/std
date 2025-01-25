import assert from "node:assert";
import { abort_signal_race } from "./abort.ts";

Deno.test("abort_signal_race resolve", async () => {
    const result = await abort_signal_race(AbortSignal.timeout(10), async () => 123);
    assert.equal(result, 123);
});
Deno.test("abort_signal_race reject", async () => {
    await assert.rejects(
        async () => {
            await abort_signal_race(AbortSignal.timeout(10), () => {
                throw new Error("123");
            });
        },
        { message: "123" },
    );
});
