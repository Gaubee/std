import {obj_assign_props, obj_pick} from "@gaubee/util/object";
import * as prompts from "@inquirer/prompts";
import * as ora from "ora";

const spinner: Spinner = obj_assign_props(ora.default, obj_pick(ora, "oraPromise", "spinners"));
export type Spinner = typeof ora.default & {
  oraPromise: typeof ora.oraPromise;
  spinners: typeof ora.spinners;
};
export namespace Spinner {
  export type Spinner = ora.Spinner;
  export type Color = ora.Color;
  export type PrefixTextGenerator = ora.PrefixTextGenerator;
  export type SuffixTextGenerator = ora.SuffixTextGenerator;
  export type Options = ora.Options;
  export type PersistOptions = ora.PersistOptions;
  export type PromiseOptions<T> = ora.PromiseOptions<T>;
}
export {prompts, spinner};
