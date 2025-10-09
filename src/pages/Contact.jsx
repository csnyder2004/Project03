// src/pages/Contact.jsx
import React, { useState } from "react";

// Replace with your Formspree form ID
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
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          first,
          last,
          email,
          comments,
          _subject: `New message from ${first} ${last}`,
          _replyto: email,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setSubmitted(true);
        setForm({ first: "", last: "", email: "", comments: "" });
      } else {
        const friendly =
          (data && data.errors && data.errors.map((er) => er.message).join("; ")) ||
          "Something went wrong. Please try again.";
        setErrorMsg(friendly);
      }
    } catch {
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

        {/* We keep action/method for no-JS fallback, but preventDefault + fetch handles the JS path */}
        <form
          onSubmit={handleSubmit}
          action={FORMSPREE_ENDPOINT}
          method="POST"
          className="grid"
          style={{ gap: "1rem" }}
          noValidate
        >
          {/* Honeypot (non-tabbable, hidden from AT) */}
          <input
            type="text"
            name="_gotcha"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ position: "absolute", left: "-10000px", width: "1px", height: "1px", overflow: "hidden" }}
          />

          <div className="two-col">
            <label htmlFor="first">
              First Name
              <input
                id="first"
                type="text"
                name="first"
                value={form.first}
                onChange={handleChange}
                placeholder="John"
                autoComplete="given-name"
                disabled={sending}
                required
              />
            </label>

            <label htmlFor="last">
              Last Name
              <input
                id="last"
                type="text"
                name="last"
                value={form.last}
                onChange={handleChange}
                placeholder="Doe"
                autoComplete="family-name"
                disabled={sending}
                required
              />
            </label>
          </div>

          <label htmlFor="email">
            Email
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="john@example.com"
              autoComplete="email"
              inputMode="email"
              disabled={sending}
              required
            />
          </label>

          <label htmlFor="comments">
            Comments
            <textarea
              id="comments"
              name="comments"
              rows={4}
              value={form.comments}
              onChange={handleChange}
              placeholder="Your message..."
              autoComplete="off"
              disabled={sending}
              required
            />
          </label>

          {/* Live region for errors/success (accessibility) */}
          <div className="row" style={{ justifyContent: "space-between", alignItems: "center" }}>
            <span
              className="muted"
              style={{ color: "#fca5a5", minHeight: 20 }}
              aria-live="polite"
              role="status"
            >
              {errorMsg}
            </span>

            <button type="submit" disabled={sending} aria-busy={sending} aria-live="off">
              {sending ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>

        {/* Success message in a live region */}
        <p
          className="success"
          style={{ marginTop: "0.75rem", minHeight: 20 }}
          aria-live="polite"
          role="status"
        >
          {submitted ? "✅ Thank you! Your message has been sent successfully." : ""}
        </p>
      </div>
    </div>
  );
}
