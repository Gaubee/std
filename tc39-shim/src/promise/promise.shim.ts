export const promise_with_resolvers = function withResolvers<T>(this: PromiseConstructor) {
  // type PromiseWithResolvers = ReturnType< PromiseConstructor['withResolvers']<T> >
  let resolve!: PromiseWithResolvers<T>["resolve"];
  let reject!: PromiseWithResolvers<T>["reject"];
  const promise = new this<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return {promise, resolve, reject};
}.bind(Promise) as <T>() => PromiseWithResolvers<T>;
