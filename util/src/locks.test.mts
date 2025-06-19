import assert from "node:assert";
import {locks} from "./locks.ts";
import {delay} from "./promise.ts";
import {str_trim_indent} from "./string.ts";

Deno.test("locks", async () => {
  const results: string[] = [];
  const log = (...args: string[]) => {
    const log = args.join(" ");
    results.push(log);
    console.log(log);
  };

  const exclusive = async (name: string) => {
    using lock = await locks.request("task1");
    log("start", name);
    await delay(100);
    log("end", name);
  };

  const shared = async (name: string) => {
    using lock = await locks.request("task1", {mode: "shared"});

    log("start", name);
    await delay(100);
    log("end", name);
  };

  exclusive("a");
  exclusive("b");
  shared("c");
  shared("d");
  shared("e");
  exclusive("f");
  shared("g");
  await exclusive("h");
  assert.deepEqual(
    results.join("\n"),
    str_trim_indent(`
    start a
    end a
    start b
    end b
    start c
    start d
    start e
    end c
    end d
    end e
    start f
    end f
    start g
    end g
    start h
    end h`),
  );
});

Deno.test("locks2", async () => {
  const results: string[] = [];
  const log = (...args: string[]) => {
    const log = args.join(" ");
    results.push(log);
    console.log(log);
  };
  const exclusive = async (name: string) => {
    await locks.run("task1", {}, async () => {
      log("start", name);
      await delay(100);
      log("end", name);
    });
  };
  const shared = async (name: string) => {
    await locks.run("task1", {mode: "shared"}, async () => {
      log("start", name);
      await delay(100);
      log("end", name);
    });
  };

  exclusive("a");
  exclusive("b");
  shared("c");
  shared("d");
  shared("e");
  exclusive("f");
  shared("g");
  await exclusive("h");
  assert.deepEqual(
    results.join("\n"),
    str_trim_indent(`
    start a
    end a
    start b
    end b
    start c
    start d
    start e
    end c
    end d
    end e
    start f
    end f
    start g
    end g
    start h
    end h`),
  );
});
