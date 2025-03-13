import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { useGetTodosQuery } from "./useGetTodosQuery";
import { Todo } from "./Todo";
import { AddTaskForm } from "./AddTaskForm";

function App() {
  const [skip] = useState(0);
  const [limit] = useState(10);

  const { data, isLoading, toggle, add } = useGetTodosQuery({ skip, limit });

  return (
    <>
      <header>
        <h1>Westpac Todo</h1>
        <div>By Seb</div>
      </header>
      <div className="App-TodoGrid">
        {isLoading && (
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        )}
        {data && (
          <>
            <AddTaskForm onAdded={add} />
            {data?.todos.map((todo) => (
              <Todo
                key={todo.id}
                todo={todo}
                onToggle={() => toggle(todo.id)}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
}

export default App;
