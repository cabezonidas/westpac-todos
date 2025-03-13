import { useGetTodosQuery } from "./useGetTodosQuery";
import "./Todo.css";

type Todo = NonNullable<
  ReturnType<typeof useGetTodosQuery>["data"]
>["todos"][number];

export const Todo = ({
  todo,
  onDelete,
  onToggle,
}: {
  todo: Todo;
  onToggle: () => void;
  onDelete?: () => void;
}) => {
  const id = `${todo.id}`;
  return (
    <fieldset className="Todo">
      <label htmlFor={id}>{todo.todo}</label>
      <input
        id={id}
        type="checkbox"
        checked={todo.completed}
        onChange={onToggle}
      />
      <button data-delete disabled type="button" onClick={onDelete}>
        Delete
      </button>
    </fieldset>
  );
};
