// src/pages/Contact.jsx
// Contact form page (controlled components for each field)

import React, { useState } from "react";

export default function Contact() {
  // ========== State ==========
  const [form, setForm] = useState({
    first: "",
    last: "",
    email: "",
    comments: "",
  });

  const [submitted, setSubmitted] = useState(false);

  // ========== Handlers ==========
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!form.first || !form.last || !form.email || !form.comments) {
      alert("Please fill out all fields before submitting.");
      return;
    }

    console.log("Form submitted:", form);
    setSubmitted(true);
    setForm({ first: "", last: "", email: "", comments: "" });
  };

  // ========== Render ==========
  return (
    <div style={{ maxWidth: 600, margin: "0 auto", fontFamily: "system-ui" }}>
      <h2>Contact Us</h2>
      <p>We’d love to hear from you. Fill out the form below:</p>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gap: "1rem",
          marginTop: "1.5rem",
          background: "#fff",
          padding: "1.5rem",
          borderRadius: "10px",
          border: "1px solid #e5e7eb",
        }}
      >
        {/* First + Last Name */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <label style={{ display: "flex", flexDirection: "column" }}>
            First Name
            <input
              name="first"
              value={form.first}
              onChange={handleChange}
              placeholder="Jane"
              required
            />
          </label>

          <label style={{ display: "flex", flexDirection: "column" }}>
            Last Name
            <input
              name="last"
              value={form.last}
              onChange={handleChange}
              placeholder="Doe"
              required
            />
          </label>
        </div>

        {/* Email */}
        <label style={{ display: "flex", flexDirection: "column" }}>
          Email
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="jane@example.com"
            required
          />
        </label>

        {/* Comments */}
        <label style={{ display: "flex", flexDirection: "column" }}>
          Comments
          <textarea
            name="comments"
            value={form.comments}
            onChange={handleChange}
            rows="4"
            placeholder="Your message..."
            required
          ></textarea>
        </label>

        {/* Submit */}
        <button
          type="submit"
          style={{
            background: "#3b82f6",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            padding: "0.75rem 1.5rem",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Send Message
        </button>
      </form>

      {/* Confirmation */}
      {submitted && (
        <p
          style={{
            marginTop: "1.5rem",
            background: "#d1fae5",
            color: "#065f46",
            padding: "1rem",
            borderRadius: "6px",
            textAlign: "center",
          }}
        >
          ✅ Thank you! Your message has been sent.
        </p>
      )}
    </div>
  );
}
