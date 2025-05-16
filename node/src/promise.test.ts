import {delay} from "@gaubee/util";
import {expectTypeOf} from "expect-type";
import {EventEmitter} from "node:events";
import {nodeTimmers} from "./promise.ts";
Deno.test("delay return type", () => {
  void (async () => {
    expectTypeOf(await delay(nodeTimmers.eventEmitter(new EventEmitter<{a: [1, 2]}>(), "a"), {})).toEqualTypeOf<[1, 2]>();
    expectTypeOf(await delay(nodeTimmers.eventEmitter<[3, 4]>(new EventEmitter<{a: [1, 2]}>(), "a"), {})).toEqualTypeOf<[3, 4]>();
  });
});
