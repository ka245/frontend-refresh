import { useRef, useState } from "react";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

const initialTodos: Todo[] = [
  { id: 1, text: "Review React hooks", completed: true },
  { id: 2, text: "Practice JavaScript", completed: false },
  { id: 3, text: "Update CV", completed: false },
];

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [input, setInput] = useState<string>("");
  const nextId = useRef(
    Math.max(0, ...initialTodos.map((todo) => todo.id)) + 1,
  );

  const addTodo = () => {
    const trimmedInput = input.trim();

    if (!trimmedInput) return;

    const newTodo: Todo = {
      id: nextId.current++,
      text: trimmedInput,
      completed: false,
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setInput("");
  };

  const toggleTodo = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id: number) => {
    const listWithDeletedTodo = todos.filter((todo) => todo.id !== id);
    setTodos(listWithDeletedTodo);
  };

  return (
    <div>
      <h1>My Todo List</h1>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a task..."
      />

      <button onClick={addTodo}>Add</button>
      {todos.length > 0 ? (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />

              <span>{todo.text}</span>

              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks yet</p>
      )}
    </div>
  );
}

export default TodoList;
