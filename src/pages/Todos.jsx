// src/pages/Todos.jsx
import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "todos:v1";

export default function Todos() {
  // ---------------- State ----------------
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("all"); // "all" | "completed" | "incomplete"
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  // ---------------- Persistence ----------------
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      if (Array.isArray(saved)) setTodos(saved);
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  // ---------------- Derived counts ----------------
  const { activeCount, completedCount } = useMemo(() => {
    let active = 0;
    let done = 0;
    for (const t of todos) (t.done ? done++ : active++);
    return { activeCount: active, completedCount: done };
  }, [todos]);

  const allDone = todos.length > 0 && completedCount === todos.length;

  // ---------------- CRUD actions ----------------
  const addTodo = () => {
    const text = newTodo.trim();
    if (!text) return;
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text, done: false },
    ]);
    setNewTodo("");
  };

  const onNewTodoKeyDown = (e) => {
    if (e.key === "Enter") addTodo();
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

  const clearCompleted = () => {
    if (completedCount === 0) return;
    setTodos((prev) => prev.filter((t) => !t.done));
  };

  const toggleAll = () => {
    const shouldCompleteAll = !allDone; // if not all done, complete all; else uncheck all
    setTodos((prev) => prev.map((t) => ({ ...t, done: shouldCompleteAll })));
  };

  // ---------------- Edit handlers ----------------
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

  // ---------------- Filtering ----------------
  const visible = useMemo(() => {
    if (filter === "completed") return todos.filter((t) => t.done);
    if (filter === "incomplete") return todos.filter((t) => !t.done);
    return todos;
  }, [todos, filter]);

  // ---------------- Render ----------------
  return (
    <div className="container">
      <h2>Todos</h2>

      <div className="todo-wrap">
        {/* Input row */}
        <div className="todo-input">
          <input
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={onNewTodoKeyDown}
            placeholder="Add a new task and press Enter"
            aria-label="New task"
          />
          <button onClick={addTodo} disabled={!newTodo.trim()}>
            Add
          </button>
        </div>

        {/* Toolbar: filters, counters, bulk actions */}
        <div className="toolbar">
          <div className="filters" role="tablist" aria-label="Filter todos">
            <button
              className={filter === "all" ? "active" : ""}
              onClick={() => setFilter("all")}
              role="tab"
              aria-selected={filter === "all"}
            >
              All
            </button>
            <button
              className={filter === "completed" ? "active" : ""}
              onClick={() => setFilter("completed")}
              role="tab"
              aria-selected={filter === "completed"}
            >
              Completed
            </button>
            <button
              className={filter === "incomplete" ? "active" : ""}
              onClick={() => setFilter("incomplete")}
              role="tab"
              aria-selected={filter === "incomplete"}
            >
              Incomplete
            </button>
          </div>

          <div className="counter badge">
            {activeCount} active · {completedCount} completed
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button className="ghost" onClick={toggleAll} disabled={todos.length === 0}>
              {allDone ? "Uncheck All" : "Complete All"}
            </button>
            <button
              className="ghost"
              onClick={clearCompleted}
              disabled={completedCount === 0}
              aria-disabled={completedCount === 0}
              title={
                completedCount === 0
                  ? "No completed tasks to clear"
                  : `Clear ${completedCount} completed`
              }
            >
              Clear Completed {completedCount > 0 ? `(${completedCount})` : ""}
            </button>
          </div>
        </div>

        {/* List */}
        <ul className="list" aria-live="polite">
          {visible.map((todo) => (
            <li key={todo.id} className="item">
              <div className="left">
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => toggleTodo(todo.id)}
                  aria-label={`Mark "${todo.text}" ${
                    todo.done ? "incomplete" : "complete"
                  }`}
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
                  <label
                    className={todo.done ? "done" : ""}
                    onDoubleClick={() => startEdit(todo)}
                    title="Double-click to edit"
                  >
                    {todo.text}
                  </label>
                )}
              </div>

              <div className="right">
                {editingId === todo.id ? (
                  <>
                    <button className="muted" onClick={saveEdit}>
                      Save
                    </button>
                    <button className="muted" onClick={cancelEdit}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button className="muted" onClick={() => startEdit(todo)}>
                      Edit
                    </button>
                    <button
                      className="danger"
                      onClick={() => removeTodo(todo.id)}
                      aria-label={`Delete "${todo.text}"`}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>

        {/* Empty state */}
        {todos.length === 0 && (
          <p className="muted">No tasks yet — add your first one above!</p>
        )}
      </div>
    </div>
  );
}
