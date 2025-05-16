import {withEffect} from "@gaubee/util";
function withResolvers<T>(this: PromiseConstructor) {
  // type PromiseWithResolvers = ReturnType< PromiseConstructor['withResolvers']<T> >
  let resolve!: PromiseWithResolvers<T>["resolve"];
  let reject!: PromiseWithResolvers<T>["reject"];
  const promise = new this<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return {promise, resolve, reject};
}
export const promise_with_resolvers = withEffect(withResolvers.bind(Promise) as <T>() => PromiseWithResolvers<T>, () => {
  Object.defineProperty(Promise, "withResolvers", {
    value: withResolvers,
    writable: true,
    enumerable: false,
    configurable: true,
  });
});
