"use client";

import { useState } from "react";

export default function AdminLoginForm() {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: new FormData(event.currentTarget).get("password"),
        }),
      });
      const result = await response.json();

      if (!response.ok) {
        setMessage(result.error || "Login gagal.");
        return;
      }

      window.location.assign(
        window.location.pathname.replace(/\/login\/?$/, "/project"),
      );
    } catch {
      setMessage("Tidak dapat menghubungi server admin.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <label htmlFor="admin-password">Password</label>
      <input
        autoComplete="current-password"
        id="admin-password"
        name="password"
        required
        type="password"
      />
      <button className="admin-submit" disabled={isSubmitting} type="submit">
        {isSubmitting ? "Memeriksa..." : "Masuk"}
      </button>
      <p aria-live="polite" className="admin-message" role="status">
        {message}
      </p>
    </form>
  );
}
