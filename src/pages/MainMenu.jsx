// src/pages/MainMenu.jsx
// Simple main menu for navigation to different app sections

import React from "react";
import { Link } from "react-router-dom";

export default function MainMenu() {
  return (
    <div style={{ textAlign: "center", padding: "3rem", fontFamily: "system-ui" }}>
      <h1>Welcome to Task Manager ✅</h1>
      <p>Select a section below to begin:</p>

      <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "2rem" }}>
        <Link to="/todos">
          <button style={{ padding: "1rem 2rem", fontSize: "1rem" }}>Go to Todos</button>
        </Link>

        <Link to="/contact">
          <button style={{ padding: "1rem 2rem", fontSize: "1rem" }}>Go to Contact</button>
        </Link>
      </div>
    </div>
  );
}
