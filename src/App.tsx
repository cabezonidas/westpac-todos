import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { useGetTodosQuery } from "./useGetTodosQuery";
import { Todo } from "./Todo";
import { AddTaskForm } from "./AddTaskForm";
import { useSyncedState } from "./useSyncedState";

function App() {
  const [skip, setSkip] = useSyncedState("page", 0);
  const [limit] = useState(10);

  const { data, isLoading, toggle, add, remove } = useGetTodosQuery({
    skip,
    limit,
  });

  const canLoadMore = data ? (skip + 1) * limit < data.total : false;

  return (
    <div className="App">
      <div>
        <header>
          <h1>Westpac Todo</h1>
          <div>By Seb</div>
        </header>
        <div className="App-Add_Pagination">
          <AddTaskForm onAdded={add} />
          <div className="Pagination">
            <button
              type="button"
              onClick={() => setSkip((prev) => Math.max(prev - 1, 0))}
            >
              Prev
            </button>
            <button
              type="button"
              onClick={() => canLoadMore && setSkip((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <div className="App-TodoGrid">
        {isLoading && !data && (
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        )}
        {data && (
          <>
            {data?.todos.map((todo) => (
              <Todo
                key={todo.id}
                todo={todo}
                onToggle={() => toggle(todo.id)}
                onDelete={() => remove(todo.id)}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
