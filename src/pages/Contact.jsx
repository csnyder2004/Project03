// src/pages/Contact.jsx
import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    first: "",
    last: "",
    email: "",
    comments: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { first, last, email, comments } = form;
    if (!first || !last || !email || !comments) {
      alert("Please fill out all fields before submitting.");
      return;
    }
    console.log("Contact form submitted:", form);
    setSubmitted(true);
    setForm({ first: "", last: "", email: "", comments: "" });
  };

  return (
    <div className="contact-wrap container">
      <div className="contact-card">
        <h2>Contact Us</h2>
        <p className="desc">
          We’d love to hear from you. Fill out the form below and we’ll get back
          to you soon.
        </p>

        <form onSubmit={handleSubmit} className="grid" style={{ gap: "1rem" }}>
          <div className="two-col">
            <label>
              First Name
              <input
                type="text"
                name="first"
                value={form.first}
                onChange={handleChange}
                placeholder="John"
              />
            </label>

            <label>
              Last Name
              <input
                type="text"
                name="last"
                value={form.last}
                onChange={handleChange}
                placeholder="Doe"
              />
            </label>
          </div>

          <label>
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="john@example.com"
            />
          </label>

          <label>
            Comments
            <textarea
              name="comments"
              rows="4"
              value={form.comments}
              onChange={handleChange}
              placeholder="Your message..."
            ></textarea>
          </label>

          <div className="row" style={{ justifyContent: "flex-end" }}>
            <button type="submit">Send Message</button>
          </div>
        </form>

        {submitted && (
          <p className="success">
            ✅ Thank you! Your message has been sent successfully.
          </p>
        )}
      </div>
    </div>
  );
}
