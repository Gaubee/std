import * as prompts from "@inquirer/prompts";
import * as ora from "ora";
const spinner = Object.assign(ora.default, ora);
export type Spinner = ReturnType<typeof spinner>;
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
