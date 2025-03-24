import assert from "node:assert";
import { delay } from "@gaubee/util";
import { SharedFlow } from "./shared_flow.ts";

Deno.test("stream", async () => {
    const flow = new SharedFlow<string>();

    const source = Array.from({ length: 4 }, (_, i) => `data:${i}`);
    async function writer(stream: AsyncGenerator<string, void>) {
        for (const data of source) {
            await flow.emit(data);
            console.log("write", data);
        }

        if (Math.random() > 0.5) {
            console.log("write end 1", await stream.return());
        } else {
            console.log("write end 2", flow.off("test"));
        }
    }

    async function render(stream: AsyncGenerator<string>) {
        const result = [];
        for await (const data of stream) {
            await delay(500);
            console.log("read", data);
            result.push(data);
        }
        console.log("read end", result);
        return result;
    }

    const stream = flow.stream({ key: "test" });
    void writer(stream);
    const result = await render(stream);

    assert.deepEqual(result, source);
});
