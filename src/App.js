// src/App.jsx
// Full app with main menu, navbar, and routes

import React from "react";
import { Routes, Route, NavLink, Navigate } from "react-router-dom";

// Pages
import MainMenu from "./pages/MainMenu.jsx";
import Todos from "./pages/Todos.jsx";
import Contact from "./pages/Contact.jsx";
import Navbar from "./components/Navbar.jsx";

export default function App() {
  return (
    <>
      {/* ===== Top Navigation Bar ===== */}
      <header className="navbar">
        <nav className="nav-inner">
          <div className="brand">
            <NavLink to="/">Task Manager</NavLink>
          </div>

          <ul className="nav-links">
            <li><NavLink to="/" end>Home</NavLink></li>
            <li><NavLink to="/todos">Todos</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
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
