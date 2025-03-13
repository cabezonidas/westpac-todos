type Todo = {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
};

type TodosResponse = {
  todos: Array<Todo>;
  total: number;
  skip: number;
  limit: number;
};

export const fetcher = async ({
  limit,
  skip,
}: {
  limit: number;
  skip: number;
}): Promise<TodosResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await fetch(
    `https://dummyjson.com/todos?limit=${limit}&skip=${skip}`
  );
  return await response.json();
};
