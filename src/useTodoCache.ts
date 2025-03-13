import { useMemo } from "react";
import { fetcher } from "./fetcher";
import { useSyncedState } from "./useSyncedState";

type TodosResponse = Awaited<ReturnType<typeof fetcher>>;

const newTodo = (value: string) => ({
  todo: value,
  id: new Date().getTime(),
  completed: false,
  userId: 0,
});

export const useTodoCache = ({
  limit,
  skip,
}: {
  limit: number;
  skip: number;
}) => {
  const index = `${limit}-${skip}`;
  const [cache, setCache] = useSyncedState<{
    [key: string]: TodosResponse | undefined;
  }>("todo", {});

  const setters = useMemo(() => {
    const hydrate = (response: TodosResponse) =>
      setCache((prev) => ({ ...prev, [index]: response }));

    const add = (value: string) =>
      setCache((prev) => {
        const state = prev[index];
        if (state) {
          return {
            ...prev,
            [index]: { ...state, todos: [newTodo(value), ...state.todos] },
          };
        }
        return prev;
      });

    const toggle = (id: number) =>
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
      });

    const remove = (id: number) =>
      setCache((prev) => {
        const state = prev[index];
        if (state) {
          return {
            ...prev,
            [index]: {
              ...state,
              todos: state.todos.filter((t) => t.id !== id),
            },
          };
        }
        return prev;
      });

    return { hydrate, add, toggle, remove };
  }, [setCache, index]);

  return {
    data: cache[index],
    index,
    ...setters,
  };
};
