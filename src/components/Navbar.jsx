// src/components/Navbar.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    "nav-link" + (isActive ? " active" : "");

  const closeMenu = () => setOpen(false);

  return (
    <header className="top-nav">
      <nav className="container navbar">
        {/* Brand */}
        <div className="brand">
          <NavLink to="/" onClick={closeMenu}>Task Manager</NavLink>
        </div>

        {/* Mobile toggle */}
        <button
          className={`nav-toggle ${open ? "open" : ""}`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          <span />
          <span />
          <span />
        </button>

        {/* Links */}
        <ul className={`nav-links ${open ? "show" : ""}`} onClick={closeMenu}>
          <li><NavLink to="/" end className={linkClass}>Home</NavLink></li>
          <li><NavLink to="/todos" className={linkClass}>Todos</NavLink></li>
          <li><NavLink to="/contact" className={linkClass}>Contact</NavLink></li>
        </ul>
      </nav>
    </header>
  );
}
