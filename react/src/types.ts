export type FunctionComponentType<T> = T extends React.FunctionComponent<infer P> ? P : never;
export type FCType<T> = FunctionComponentType<T>;
