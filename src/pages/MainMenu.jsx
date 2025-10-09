/* eslint-env browser */
// src/pages/MainMenu.jsx
import React, { useEffect, useMemo, useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";

const STORAGE_KEY = "todos:v1";

export default function MainMenu() {
  const [todos, setTodos] = useState([]);
  const location = useLocation();

  const loadFromStorage = useCallback(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      if (Array.isArray(saved)) setTodos(saved);
    } catch {
      // fail silently – menu still renders
    }
  }, []);

  // Initial load + refresh whenever route changes (e.g., returning from /todos)
  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage, location.pathname]);

  // Also refresh when the tab becomes visible again (e.g., after switching tabs)
  useEffect(() => {
    const onVisibility = () => {
      if (document.visibilityState === "visible") loadFromStorage();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [loadFromStorage]);

  // Keep in sync across multiple tabs/windows
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY) loadFromStorage();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [loadFromStorage]);

  // derive counts
  const { total, active, completed } = useMemo(() => {
    const t = Array.isArray(todos) ? todos : [];
    const comp = t.filter((x) => x.done).length;
    const act = t.length - comp;
    return { total: t.length, active: act, completed: comp };
  }, [todos]);

  return (
    <div className="menu-hero container">
      <h1>Welcome to Task Manager ✅</h1>
      <p className="muted">Lightweight, fast, and focused on what matters.</p>

      {/* primary actions — links styled as buttons (no nested interactive elements) */}
      <div className="menu-actions">
        <Link to="/todos" aria-label="Go to Todos" className="btn">
          Go to Todos
        </Link>
        <Link to="/contact" aria-label="Go to Contact" className="btn ghost">
          Go to Contact
        </Link>
      </div>

      {/* helpful descriptions (visual only) */}
      <div className="hidden" id="todos-desc">
        Manage your tasks, add, edit, and complete items.
      </div>
      <div className="hidden" id="contact-desc">
        Send us a message via the contact form.
      </div>

      {/* snapshot card */}
      <section
        className="card"
        style={{
          marginTop: 28,
          padding: 18,
          display: "grid",
          gap: 12,
          textAlign: "left",
        }}
        aria-label="Today's snapshot"
      >
        <h2 style={{ margin: 0 }}>Today’s Snapshot</h2>
        <p className="muted" style={{ margin: 0 }}>
          A quick peek at your current to-do list.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 12,
            marginTop: 6,
          }}
        >
          <Stat label="Total" value={total} />
          <Stat label="Active" value={active} />
          <Stat label="Completed" value={completed} />
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
          <Link to="/todos" className="btn">
            {total ? "Open Todos" : "Start Your First Todo"}
          </Link>
          <Link to="/contact" className="btn ghost">
            Contact Us
          </Link>
        </div>
      </section>

      {/* small footer line */}
      <div className="footer">Built with React + Vite</div>
    </div>
  );
}

// tiny stat card (no prop-types dependency; validator-safe)
// eslint-disable-next-line react/prop-types
function Stat({ label, value }) {
  return (
    <div
      className="card"
      style={{
        background: "var(--card-2)",
        borderRadius: "12px",
        padding: "14px 12px",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>
        {label}
      </div>
      <div style={{ fontWeight: 700, fontSize: 22 }}>{value}</div>
    </div>
  );
}
