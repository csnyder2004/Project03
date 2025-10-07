// src/App.jsx
// Full app with main menu, navbar, and routes

import React from "react";
import { Routes, Route, NavLink, Navigate } from "react-router-dom";

// Pages
import MainMenu from "./pages/MainMenu.jsx";
import Todos from "./pages/Todos.jsx";
import Contact from "./pages/Contact.jsx";

export default function App() {
  return (
    <>
      {/* ===== Top Navigation Bar ===== */}
      <header style={{ borderBottom: "1px solid #e5e7eb", background: "#fff" }}>
        <nav
          style={{
            maxWidth: 980,
            margin: "0 auto",
            padding: "0 16px",
            height: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontFamily: "system-ui, Arial, sans-serif",
          }}
        >
          {/* Brand */}
          <div style={{ fontWeight: 600 }}>
            <NavLink to="/" style={{ textDecoration: "none", color: "#111" }}>
              Task Manager
            </NavLink>
          </div>

          {/* Navigation Links */}
          <ul style={{ listStyle: "none", display: "flex", gap: 12, margin: 0, padding: 0 }}>
            <li>
              <NavLink
                to="/"
                end
                style={({ isActive }) => ({
                  textDecoration: "none",
                  padding: "6px 10px",
                  borderRadius: 6,
                  color: isActive ? "#fff" : "#667",
                  background: isActive ? "#3b82f6" : "transparent",
                })}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/todos"
                style={({ isActive }) => ({
                  textDecoration: "none",
                  padding: "6px 10px",
                  borderRadius: 6,
                  color: isActive ? "#fff" : "#667",
                  background: isActive ? "#3b82f6" : "transparent",
                })}
              >
                Todos
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                style={({ isActive }) => ({
                  textDecoration: "none",
                  padding: "6px 10px",
                  borderRadius: 6,
                  color: isActive ? "#fff" : "#667",
                  background: isActive ? "#3b82f6" : "transparent",
                })}
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>

      {/* ===== Page Routes ===== */}
      <main
        style={{
          maxWidth: 980,
          margin: "0 auto",
          padding: "20px 16px 40px",
          fontFamily: "system-ui, Arial, sans-serif",
        }}
      >
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/todos" element={<Todos />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
}
