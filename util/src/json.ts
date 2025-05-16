export namespace JSONType {
  export type Primitive = string | boolean | number | null;
  export type Array = (Primitive | Object | Array)[];
  export type Object = {
    [key: string]: Primitive | Array | Object;
  };
}
