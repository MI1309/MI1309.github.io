"use client";

import { useEffect, useState } from "react";

export default function AdminArchiveEditor() {
  const [archive, setArchive] = useState("[]");
  const [message, setMessage] = useState("Memuat arsip...");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let active = true;

    fetch("/api/archive")
      .then(async (response) => {
        if (!response.ok) throw new Error("Arsip tidak dapat dimuat.");
        return response.json();
      })
      .then((data) => {
        if (!active) return;
        setArchive(JSON.stringify(data, null, 2));
        setMessage("");
      })
      .catch(() => {
        if (active) setMessage("Arsip tidak dapat dimuat dari server.");
      });

    return () => {
      active = false;
    };
  }, []);

  async function saveArchive() {
    let data;
    try {
      data = JSON.parse(archive);
      if (!Array.isArray(data)) throw new Error("Archive must be an array");
    } catch {
      setMessage("JSON tidak valid. Pastikan isinya berupa array.");
      return;
    }

    setIsSaving(true);
    setMessage("");
    try {
      const response = await fetch("/api/admin-archive", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      setMessage(
        response.ok
          ? "Arsip berhasil disimpan."
          : result.error || "Gagal menyimpan arsip.",
      );
    } catch {
      setMessage("Tidak dapat menghubungi server admin.");
    } finally {
      setIsSaving(false);
    }
  }

  async function logout() {
    await fetch("/api/logout", { method: "POST" });
    window.location.assign(
      window.location.pathname.replace(/\/project\/?$/, "/login"),
    );
  }

  return (
    <div className="admin-editor">
      <div className="admin-toolbar">
        <label htmlFor="archive-json">Current archive · JSON</label>
        <button className="admin-secondary" onClick={logout} type="button">
          Logout
        </button>
      </div>
      <textarea
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        id="archive-json"
        onChange={(event) => setArchive(event.target.value)}
        spellCheck="false"
        value={archive}
      />
      <div className="admin-actions">
        <button
          className="admin-submit"
          disabled={isSaving}
          onClick={saveArchive}
          type="button"
        >
          {isSaving ? "Menyimpan..." : "Simpan arsip"}
        </button>
        <p aria-live="polite" className="admin-message" role="status">
          {message}
        </p>
      </div>
    </div>
  );
}
