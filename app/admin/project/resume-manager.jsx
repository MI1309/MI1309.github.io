"use client";

import { useEffect, useState } from "react";

const MAX_RESUME_BYTES = 3 * 1024 * 1024;

async function fileToBase64(file) {
  const bytes = new Uint8Array(await file.arrayBuffer());
  let binary = "";
  for (let offset = 0; offset < bytes.length; offset += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + 0x8000));
  }
  return btoa(binary);
}

export default function ResumeManager() {
  const [resume, setResume] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("Memuat status resume...");
  const [isBusy, setIsBusy] = useState(false);

  useEffect(() => {
    let active = true;
    fetch("/api/resume", { cache: "no-store" })
      .then(async (response) => {
        const contentType = response.headers.get("content-type") || "";
        if (!contentType.includes("application/json")) {
          throw new Error("Status resume gagal dimuat dari server admin.");
        }
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Status resume gagal dimuat.");
        return result;
      })
      .then((result) => {
        if (!active) return;
        setResume(result);
        setMessage("");
      })
      .catch((error) => {
        if (active) setMessage(error.message);
      });

    return () => {
      active = false;
    };
  }, []);

  function handleFileChange(event) {
    const file = event.target.files?.[0] || null;
    if (
      file &&
      (!file.name.toLowerCase().endsWith(".pdf") ||
        (file.type && file.type !== "application/pdf"))
    ) {
      setSelectedFile(null);
      setMessage("Pilih berkas dengan format PDF.");
      event.target.value = "";
      return;
    }
    if (file && file.size > MAX_RESUME_BYTES) {
      setSelectedFile(null);
      setMessage("Ukuran PDF maksimal 3 MB.");
      event.target.value = "";
      return;
    }
    setSelectedFile(file);
    setMessage("");
  }

  async function saveResume(action) {
    if (action === "upload" && !selectedFile) {
      setMessage("Pilih berkas PDF terlebih dahulu.");
      return;
    }
    if (action === "delete" && !window.confirm("Hapus resume PDF dari situs?")) {
      return;
    }

    setIsBusy(true);
    setMessage("");
    try {
      const content =
        action === "upload" ? await fileToBase64(selectedFile) : undefined;
      const response = await fetch("/api/resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, content }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Perubahan resume gagal disimpan.");

      if (result.dispatched) {
        setMessage(
          action === "upload"
            ? "Unggahan dikirim. Resume akan diperbarui setelah proses penerapan selesai."
            : "Penghapusan dikirim. Resume akan dihapus setelah proses penerapan selesai.",
        );
      } else {
        setResume({ available: action === "upload", filename: "resume.pdf" });
        setMessage(action === "upload" ? "Resume berhasil diunggah." : "Resume berhasil dihapus.");
      }
      setSelectedFile(null);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsBusy(false);
    }
  }

  return (
    <section className="admin-resume-manager" aria-labelledby="admin-resume-title">
      <div>
        <h2 id="admin-resume-title">Resume PDF</h2>
        <p className="admin-description">
        {resume === null
          ? "Status resume belum dapat dipastikan."
          : resume.available
            ? "Resume tersedia di situs. Unggah PDF lain untuk menggantinya."
            : "Belum ada resume yang ditampilkan di situs."}
        </p>
      </div>
      <label className="admin-resume-file">
        Pilih berkas PDF (maksimal 3 MB)
        <input
          accept="application/pdf,.pdf"
          disabled={isBusy}
          onChange={handleFileChange}
          type="file"
        />
      </label>
      {selectedFile ? (
        <p className="admin-resume-selected">{selectedFile.name}</p>
      ) : null}
      <div className="admin-project-form-actions">
        <button
          className="admin-submit"
          disabled={isBusy || !selectedFile}
          onClick={() => saveResume("upload")}
          type="button"
        >
          {isBusy ? "Menyimpan..." : resume?.available ? "Ganti resume" : "Unggah resume"}
        </button>
        {resume?.available ? (
          <>
            <a
              className="admin-secondary admin-resume-preview"
              href="/api/resume/file"
              rel="noreferrer"
              target="_blank"
            >
              Lihat resume
            </a>
            <button
              className="admin-secondary admin-danger"
              disabled={isBusy}
              onClick={() => saveResume("delete")}
              type="button"
            >
              Hapus resume
            </button>
          </>
        ) : null}
      </div>
      <p aria-live="polite" className="admin-message" role="status">
        {message}
      </p>
    </section>
  );
}
