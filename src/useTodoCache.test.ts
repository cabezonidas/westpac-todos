import { describe, expect, test } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useTodoCache } from "./useTodoCache";

const initialHydration = {
  todos: [
    {
      id: 1,
      todo: "initial",
      completed: false,
      userId: 0,
    },
  ],
  total: 0,
  skip: 0,
  limit: 0,
};

describe("useTodoCache", () => {
  test("hydrates the state", async () => {
    const { result } = renderHook(useTodoCache, {
      initialProps: { limit: 2, skip: 0 },
    });

    act(() => result.current.hydrate(initialHydration));
    expect(result.current.data).toEqual(initialHydration);
  });
  test("adds the state", async () => {
    const { result } = renderHook(useTodoCache, {
      initialProps: { limit: 2, skip: 0 },
    });

    act(() => result.current.hydrate(initialHydration));

    act(() => result.current.add("new thing to do"));

    const todos = result.current.data!.todos;
    expect(todos.length).toBe(2);

    // Added first to the list, and defaulted to incomplete
    expect(todos[0]).toMatchObject({
      completed: false,
      userId: 0,
      todo: "new thing to do",
    });

    expect(todos[1]).toMatchObject(initialHydration.todos[0]);
  });
});
