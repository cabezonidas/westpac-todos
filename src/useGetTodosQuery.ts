import { useEffect, useRef, useState } from "react";
import { fetcher } from "./fetcher";

type TodosResponse = Awaited<ReturnType<typeof fetcher>>;

export const useGetTodosQuery = ({
  limit,
  skip,
}: {
  limit: number;
  skip: number;
}) => {
  const index = `${limit}-${skip}`;
  const [cache, setCache] = useState<{
    [key: string]: TodosResponse | undefined;
  }>({});
  const queryState = useRef<{ [key: string]: { isLoading: boolean } }>({});

  useEffect(() => {
    const key = `${limit}-${skip}`;
    if (!queryState.current[key]?.isLoading) {
      queryState.current[key] = { isLoading: true };
      // Do fetch
      fetcher({ limit, skip })
        .then((response) => setCache((prev) => ({ ...prev, [key]: response })))
        .finally(() => (queryState.current[key] = { isLoading: false }));
    }
  }, [limit, skip, queryState]);

  return {
    data: cache[index],
    isLoading: queryState.current?.[index]?.isLoading ?? true,
  };
};
