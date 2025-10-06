import { useEffect, useState } from "react";

const STORAGE_KEY = "todos:v1";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  // Load once on mount
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      if (Array.isArray(saved)) setTodos(saved);
    } catch {}
  }, []);

  // Save whenever todos change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!newTodo.trim()) return;
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text: newTodo.trim(), done: false },
    ]);
    setNewTodo("");
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const removeTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>React To-Do ✅</h1>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a task"
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul style={{ display: "grid", gap: 8, paddingLeft: 0 }}>
        {todos.map((todo) => (
          <li key={todo.id} style={{ listStyle: "none" }}>
            <label style={{ textDecoration: todo.done ? "line-through" : "" }}>
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => toggleTodo(todo.id)}
                style={{ marginRight: 8 }}
              />
              {todo.text}
            </label>
            <button onClick={() => removeTodo(todo.id)} style={{ marginLeft: 8 }}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
