import {abort_signal_merge} from "@gaubee/util";
import {useEffect, useState} from "react";

type Opts = {signal?: AbortSignal};
type PageLoadMode = "first" | "next";
type PageError = {page: number; error: unknown};
export const usePageQueryState = <T extends unknown>(
  initContent: T,
  startPage: number,
  queryPage: (previousContent: T, currentPage: number, opts: {signal: AbortSignal}) => Promise<{nextPage: number; content: T; end: boolean}>,
) => {
  const [error, setError] = useState<null | PageError>(null);
  const [content, setContent] = useState(initContent);
  const [page, setPage] = useState(startPage);
  const [end, setEnd] = useState(false);
  const [loadTask, setLoadTask] = useState<null | {
    mode: PageLoadMode;
    signal?: AbortSignal;
    job: PromiseWithResolvers<void>;
  }>(null);
  useEffect(() => {
    if (loadTask) {
      const aborter = new AbortController();
      (async () => {
        try {
          const signal = abort_signal_merge(aborter.signal, loadTask.signal)!;
          signal.addEventListener("abort", () => {
            loadTask.job.reject(error);
          });

          let result;
          if (loadTask.mode === "first") {
            result = await queryPage(initContent, startPage, {
              signal,
            });
          } else if (loadTask.mode === "next") {
            result = await queryPage(content, page, {
              signal,
            });
          } else {
            throw new Error("invalid load mode: " + loadTask.mode);
          }

          setContent(result.content);
          setPage(result.nextPage);
          setEnd(result.end);
          setError(null);
          loadTask.job.resolve();
          console.log("loading success");
        } catch (error) {
          loadTask.job.reject(error);
          setError({page, error});
          console.log("loading error");
        } finally {
          setLoadTask(null);
          console.log("loading done");
        }
      })();
      return () => aborter.abort("cancel");
    }
  }, [loadTask]);
  const loadPage = (mode: PageLoadMode, opts?: Opts) => {
    if (loadTask == null) {
      const job = Promise.withResolvers<void>();
      setLoadTask({...opts, mode, job});
      return job.promise;
    }
    return loadTask.job.promise;
  };
  const loadNext = (opts?: Opts): Promise<void> => loadPage("next", opts);
  const loadFirst = (opts?: Opts): Promise<void> => loadPage("first", opts);
  const isLoadingFirst = loadTask?.mode === "first";
  const isLoadingNext = loadTask?.mode === "next";
  const isLoading = loadTask !== null;
  const isReady = page !== startPage || error !== null;
  const onPtrRefresh = (done: () => void): void => {
    loadFirst().finally(done);
  };
  const onInfinite = (done: () => void): void => {
    loadNext().finally(done);
  };

  return {
    get content() {
      return content;
    },
    set content(value) {
      setContent(value);
    },
    get page() {
      return page;
    },
    set page(value) {
      setPage(value);
    },
    get end() {
      return end;
    },
    set end(value) {
      setEnd(value);
    },
    get error() {
      return error;
    },
    set error(value) {
      setError(value);
    },
    loadFirst,
    loadNext,
    isLoadingFirst,
    isLoadingNext,
    isLoading,
    isReady,
    onPtrRefresh,
    onInfinite,
  };
};
