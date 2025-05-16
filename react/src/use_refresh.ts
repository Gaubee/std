import {useReducer} from "react";

export const useRefresh = (): React.ActionDispatch<[]> => {
  const [, contentRefresh] = useReducer((x) => x + 1, 0);
  return contentRefresh;
};
