// src/pages/Contact.jsx
import React, { useState } from "react";

// 👇 Replace with your Formspree form ID from the dashboard
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xpwyjyjd";

export default function Contact() {
  const [form, setForm] = useState({
    first: "",
    last: "",
    email: "",
    comments: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const { first, last, email, comments } = form;
    if (!first || !last || !email || !comments) {
      setErrorMsg("Please fill out all fields before submitting.");
      return;
    }

    setSending(true);
    try {
      // You can send JSON to Formspree:
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          first,
          last,
          email,
          comments,
          // Optional metadata fields:
          _subject: `New message from ${first} ${last}`,
          _replyto: email,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSubmitted(true);
        setForm({ first: "", last: "", email: "", comments: "" });
      } else {
        // Formspree will include errors array when something’s wrong
        const friendly =
          (data && data.errors && data.errors.map((e) => e.message).join("; ")) ||
          "Something went wrong. Please try again.";
        setErrorMsg(friendly);
      }
    } catch (err) {
      setErrorMsg("Network error. Please check your internet connection and try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="contact-wrap container">
      <div className="contact-card">
        <h2>Contact Us</h2>
        <p className="desc">
          We’d love to hear from you. Fill out the form below and we’ll get back to you soon.
        </p>

        {/* Progressive enhancement fallback:
            If JS fails, this plain HTML form posts to Formspree. */}
        <form
          onSubmit={handleSubmit}
          action={FORMSPREE_ENDPOINT}
          method="POST"
          className="grid"
          style={{ gap: "1rem" }}
        >
          {/* Honeypot for spam (Formspree ignores any field named _gotcha) */}
          <input type="text" name="_gotcha" style={{ display: "none" }} tabIndex="-1" autoComplete="off" />

          <div className="two-col">
            <label>
              First Name
              <input
                type="text"
                name="first"
                value={form.first}
                onChange={handleChange}
                placeholder="John"
                disabled={sending}
                required
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
                disabled={sending}
                required
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
              disabled={sending}
              required
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
              disabled={sending}
              required
            ></textarea>
          </label>

          <div className="row" style={{ justifyContent: "space-between", alignItems: "center" }}>
            {/* Inline error */}
            {errorMsg && <span className="muted" style={{ color: "#fca5a5" }}>{errorMsg}</span>}

            <button type="submit" disabled={sending} aria-busy={sending}>
              {sending ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>

        {submitted && (
          <p className="success" style={{ marginTop: "0.75rem" }}>
            ✅ Thank you! Your message has been sent successfully.
          </p>
        )}
      </div>
    </div>
  );
}
