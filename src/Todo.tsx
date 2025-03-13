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
      <input
        id={id}
        type="checkbox"
        checked={todo.completed}
        onChange={onToggle}
      />
      <label htmlFor={id} title={todo.todo}>
        {todo.todo}
      </label>
      <button data-delete type="button" onClick={onDelete}>
        Delete
      </button>
    </fieldset>
  );
};
