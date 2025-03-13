import { useEffect, useRef } from "react";
import { fetcher } from "./fetcher";
import { useTodoCache } from "./useTodoCache";

export const useGetTodosQuery = ({
  limit,
  skip,
}: {
  limit: number;
  skip: number;
}) => {
  const { hydrate, index, ...rest } = useTodoCache({ limit, skip });
  const queryState = useRef<{ [key: string]: { isLoading: boolean } }>({});

  useEffect(() => {
    const key = `${limit}-${skip}`;
    if (!queryState.current[key]?.isLoading) {
      queryState.current[key] = { isLoading: true };
      // Do fetch
      fetcher({ limit, skip })
        .then(hydrate)
        .finally(() => (queryState.current[key] = { isLoading: false }));
    }
  }, [limit, skip, hydrate]);

  return {
    isLoading: queryState.current?.[index]?.isLoading ?? true,
    ...rest,
  };
};
