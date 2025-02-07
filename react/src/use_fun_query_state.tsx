import { obj_assign_props } from "@gaubee/util";
import { useEffect, useState } from "react";
import { renderBuilder } from "./common_render_builder.tsx";
import { f7PtrFactory } from "./page_ptr.mts";

type FunQueryApi<I extends any[] = any[], O = any> = (...args: I) => Promise<O>;
type FunQueryInput<FDef extends FunQueryApi> =
  FDef extends FunQueryApi<infer I, any> ? I : never;
type FunQueryOutput<FDef extends FunQueryApi> =
  FDef extends FunQueryApi<any, infer O> ? O : never;
type FunQueryActionOptions = {
  signal?: AbortSignal;
};
export const useFunQueryState = <FDef extends FunQueryApi>(
  initValue: FunQueryOutput<FDef>,
  api: FDef,
  exec: (
    api: FDef,
    input: FunQueryInput<FDef>,
    opts?: FunQueryActionOptions,
  ) => Promise<FunQueryOutput<FDef>> = (api, input) => api(...input),
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState<FunQueryOutput<FDef>>(initValue);
  const [error, setError] = useState<unknown>(null);
  const doQuery = async (
    input: FunQueryInput<FDef>,
    opts?: FunQueryActionOptions,
  ) => {
    setIsLoading(true);
    try {
      const output = await exec(api, input, opts);
      setValue(output);
      setError(null);
      return output;
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };
  const queryWithDestructor = (input: FunQueryInput<FDef>) => {
    const aborter = new AbortController();
    doQuery(input, {
      signal: aborter.signal,
    });
    return () => aborter.abort("cancel");
  };
  const useQuery = (input: FunQueryInput<FDef>, deps?: any[]) => {
    useEffect(() => queryWithDestructor(input), deps ?? input);
    return result;
  };
  const f7OnPageInit = (input: FunQueryInput<FDef>) =>
    f7PtrFactory(() => doQuery(input));

  const f7OnPtrRefresh = (input: FunQueryInput<FDef>) => {
    return (done: () => void) => {
      doQuery(input).finally(done);
    };
  };
  const result = obj_assign_props(
    {
      get value() {
        return value;
      },
      set value(value) {
        setValue(value);
      },
    },
    Object.freeze({
      isLoading,
      doQuery: doQuery,
      queryWithDestructor,
      useQuery,
      f7OnPtrRefresh: f7OnPtrRefresh,
      f7OnPageInit,
      get render() {
        return renderBuilder(!isLoading, value, error);
      },
    }),
  );
  return result;
};
