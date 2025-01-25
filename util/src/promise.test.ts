import { delay, promise_once_then } from "./promise.ts";

Deno.test("promise_once_then", async () => {
    const p = delay(100).then(() => 123);
    promise_once_then(p, {
        onfulfilled(value) {
            console.log("okk", 123);
        },
    });
    await p;
    promise_once_then(p, {
        onfulfilled(value) {
            console.log("okk2", 123);
        },
    });
});
