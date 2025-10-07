import { useEffect, useState } from "react";

const STORAGE_KEY = "todos:v1";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  // Load once
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      if (Array.isArray(saved)) setTodos(saved);
    } catch {}
  }, []);

  // Save on change
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
    if (editingId === id) {
      setEditingId(null);
      setEditingText("");
    }
  };

  // Edit handlers
  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditingText(todo.text);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };

  const saveEdit = () => {
    const text = editingText.trim();
    if (!text) return cancelEdit();
    setTodos((prev) =>
      prev.map((t) => (t.id === editingId ? { ...t, text } : t))
    );
    setEditingId(null);
    setEditingText("");
  };

  const onEditKeyDown = (e) => {
    if (e.key === "Enter") saveEdit();
    if (e.key === "Escape") cancelEdit();
  };

  // --- NEW: clear completed ---
  const completedCount = todos.filter(t => t.done).length;
  const clearCompleted = () => {
    if (completedCount === 0) return;
    setTodos(prev => prev.filter(t => !t.done));
  };

  const visible = todos.filter((t) =>
    filter === "all" ? true : filter === "completed" ? t.done : !t.done
  );

  return (
    <div>
      <h2 className="text-2xl font-semibold text-indigo-600">Todos</h2>

      <div className="row">
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a task"
          aria-label="New task"
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <div className="row" style={{ justifyContent: "space-between", marginTop: 12 }}>
        <div className="filters">
          <button
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={filter === "completed" ? "active" : ""}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
          <button
            className={filter === "incomplete" ? "active" : ""}
            onClick={() => setFilter("incomplete")}
          >
            Incomplete
          </button>
        </div>

        {/* NEW: Clear Completed */}
        <button
          className="muted"
          onClick={clearCompleted}
          disabled={completedCount === 0}
          aria-disabled={completedCount === 0}
          title={completedCount === 0 ? "No completed tasks to clear" : `Clear ${completedCount} completed`}
        >
          Clear Completed {completedCount > 0 ? `(${completedCount})` : ""}
        </button>
      </div>

      <ul className="list">
        {visible.map((todo) => (
          <li key={todo.id} className="item">
            <div className="left">
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => toggleTodo(todo.id)}
                aria-label={`Mark ${todo.text} ${todo.done ? "incomplete" : "complete"}`}
              />

              {editingId === todo.id ? (
                <input
                  className="edit-input"
                  autoFocus
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  onKeyDown={onEditKeyDown}
                  onBlur={saveEdit}
                  aria-label="Edit task text"
                />
              ) : (
                <label className={todo.done ? "done" : ""}>{todo.text}</label>
              )}
            </div>

            <div className="right">
              {editingId === todo.id ? (
                <>
                  <button className="muted" onClick={saveEdit}>Save</button>
                  <button className="muted" onClick={cancelEdit}>Cancel</button>
                </>
              ) : (
                <>
                  <button className="muted" onClick={() => startEdit(todo)}>
                    Edit
                  </button>
                  <button className="danger" onClick={() => removeTodo(todo.id)}>
                    Delete
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
