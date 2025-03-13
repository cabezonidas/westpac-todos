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
    toggle: (id: number) =>
      setCache((prev) => {
        const state = prev[index];
        if (state) {
          return {
            ...prev,
            [index]: {
              ...state,
              todos: state.todos.map((t) =>
                t.id === id ? { ...t, completed: !t.completed } : t
              ),
            },
          };
        }
        return prev;
      }),
    add: (value: string) =>
      setCache((prev) => {
        const state = prev[index];
        if (state) {
          return {
            ...prev,
            [index]: {
              ...state,
              todos: [
                {
                  todo: value,
                  id: new Date().getTime(),
                  completed: false,
                  userId: 0,
                },
                ...state.todos,
              ],
            },
          };
        }
        return prev;
      }),
  };
};
