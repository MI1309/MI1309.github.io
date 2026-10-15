"use client";

import { useEffect, useState } from "react";

const emptyProject = {
  title: "",
  year: "",
  madeAt: "",
  description: "",
  technologies: "",
  url: "",
  slug: "",
};

function createDraft(project = {}) {
  return {
    title: project.title || "",
    year: project.year || "",
    madeAt: project.madeAt || project.company || "",
    description: project.description || "",
    technologies: Array.isArray(project.technologies)
      ? project.technologies.join(", ")
      : "",
    url: project.url || "",
    slug: project.slug || "",
  };
}

export default function AdminProjectEditor() {
  const [projects, setProjects] = useState([]);
  const [draft, setDraft] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [message, setMessage] = useState("Memuat arsip...");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    let active = true;

    fetch("/api/archive")
      .then(async (response) => {
        if (!response.ok) throw new Error("Arsip tidak dapat dimuat.");
        return response.json();
      })
      .then((data) => {
        if (!active) return;
        if (!Array.isArray(data)) throw new Error("Format arsip tidak valid.");
        setProjects(data);
        setMessage("");
      })
      .catch(() => {
        if (active) {
          setLoadFailed(true);
          setMessage("Proyek gagal dimuat. Muat ulang halaman sebelum mengubah data.");
        }
      })
      .finally(() => {
        if (active) setIsLoaded(true);
      });

    return () => {
      active = false;
    };
  }, []);

  function startNewProject() {
    setEditingIndex(null);
    setDraft({ ...emptyProject });
    setMessage("");
  }

  function startEditing(project, index) {
    setEditingIndex(index);
    setDraft(createDraft(project));
    setMessage("");
  }

  function updateDraft(field, value) {
    setDraft((current) => ({ ...current, [field]: value }));
  }

  function applyDraft(event) {
    event.preventDefault();
    const title = draft.title.trim();
    if (!title) {
      setMessage("Nama proyek wajib diisi.");
      return;
    }

    const project = {
      ...(editingIndex === null ? {} : projects[editingIndex]),
      title,
      description: draft.description.trim(),
      technologies: draft.technologies
        .split(",")
        .map((technology) => technology.trim())
        .filter(Boolean),
      url: draft.url.trim(),
    };

    for (const [field, value] of [
      ["year", draft.year],
      ["madeAt", draft.madeAt],
      ["slug", draft.slug],
    ]) {
      if (value.trim()) project[field] = value.trim();
      else delete project[field];
    }

    setProjects((current) => {
      if (editingIndex === null) return [...current, project];
      return current.map((item, index) =>
        index === editingIndex ? project : item,
      );
    });
    setDraft(null);
    setEditingIndex(null);
    setMessage("Perubahan belum dikirim. Klik Simpan semua perubahan.");
  }

  function deleteProject(index) {
    if (!window.confirm(`Hapus proyek “${projects[index].title}”?`)) return;
    setProjects((current) =>
      current.filter((_, itemIndex) => itemIndex !== index),
    );
    if (editingIndex === index) {
      setDraft(null);
      setEditingIndex(null);
    }
    setMessage("Perubahan belum dikirim. Klik Simpan semua perubahan.");
  }

  async function saveProjects() {
    setIsSaving(true);
    setMessage("");
    try {
      const response = await fetch("/api/admin-archive", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projects),
      });
      const result = await response.json();
      setMessage(
        response.ok
          ? result.dispatched
            ? "Perubahan terkirim. Situs diperbarui setelah workflow GitHub selesai."
            : "Semua proyek berhasil disimpan."
          : result.error || "Gagal menyimpan proyek.",
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
        <p className="admin-project-count">
          {projects.length} proyek
        </p>
        <div className="admin-toolbar-actions">
          <button
            className="admin-secondary"
            disabled={!isLoaded || loadFailed || isSaving || draft !== null}
            onClick={startNewProject}
            type="button"
          >
            Tambah proyek
          </button>
          <button className="admin-secondary" onClick={logout} type="button">
            Logout
          </button>
        </div>
      </div>
      {draft ? (
        <form className="admin-project-form" onSubmit={applyDraft}>
          <h2>{editingIndex === null ? "Tambah proyek" : "Edit proyek"}</h2>
          <div className="admin-project-fields">
            <label>
              Nama proyek
              <input
                autoFocus
                onChange={(event) => updateDraft("title", event.target.value)}
                required
                value={draft.title}
              />
            </label>
            <label>
              Tahun
              <input
                onChange={(event) => updateDraft("year", event.target.value)}
                placeholder="2026"
                value={draft.year}
              />
            </label>
            <label>
              Made at
              <input
                onChange={(event) => updateDraft("madeAt", event.target.value)}
                placeholder="Personal project"
                value={draft.madeAt}
              />
            </label>
            <label className="admin-project-field-wide">
              Deskripsi
              <textarea
                onChange={(event) =>
                  updateDraft("description", event.target.value)
                }
                rows="3"
                value={draft.description}
              />
            </label>
            <label className="admin-project-field-wide">
              Teknologi, pisahkan dengan koma
              <input
                onChange={(event) =>
                  updateDraft("technologies", event.target.value)
                }
                placeholder="React, Next.js, PostgreSQL"
                value={draft.technologies}
              />
            </label>
            <label className="admin-project-field-wide">
              URL proyek
              <input
                onChange={(event) => updateDraft("url", event.target.value)}
                placeholder="https://example.com"
                type="url"
                value={draft.url}
              />
            </label>
            <label className="admin-project-field-wide">
              Slug studi kasus (opsional)
              <input
                onChange={(event) => updateDraft("slug", event.target.value)}
                placeholder="jbook"
                value={draft.slug}
              />
            </label>
          </div>
          <div className="admin-project-form-actions">
            <button className="admin-submit" type="submit">
              Terapkan
            </button>
            <button
              className="admin-secondary"
              onClick={() => {
                setDraft(null);
                setEditingIndex(null);
              }}
              type="button"
            >
              Batal
            </button>
          </div>
        </form>
      ) : null}
      <div className="admin-project-list">
        {!projects.length && isLoaded ? (
          <p className="mi-empty">Belum ada proyek. Tambahkan proyek pertama.</p>
        ) : null}
        {projects.map((project, index) => (
          <article
            className="admin-project-row"
            key={project.id || `${project.title}-${index}`}
          >
            <div className="admin-project-row-copy">
              <h2>{project.title}</h2>
              <p>
                {[project.year, project.madeAt, project.url]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            </div>
            <div className="admin-project-row-actions">
              <button
                className="admin-secondary"
                disabled={loadFailed || isSaving || draft !== null}
                onClick={() => startEditing(project, index)}
                type="button"
              >
                Edit
              </button>
              <button
                className="admin-secondary admin-danger"
                disabled={loadFailed || isSaving || draft !== null}
                onClick={() => deleteProject(index)}
                type="button"
              >
                Hapus
              </button>
            </div>
          </article>
        ))}
      </div>
      <div className="admin-actions">
        <button
          className="admin-submit"
          disabled={isSaving || !isLoaded || loadFailed || draft !== null}
          onClick={saveProjects}
          type="button"
        >
          {isSaving ? "Menyimpan..." : "Simpan semua perubahan"}
        </button>
        <p aria-live="polite" className="admin-message" role="status">
          {message}
        </p>
      </div>
    </div>
  );
}
