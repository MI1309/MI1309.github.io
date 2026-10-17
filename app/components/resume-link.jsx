"use client";

import { useEffect, useState } from "react";

export default function ResumeLink() {
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    let active = true;

    fetch("/api/resume", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((result) => {
        if (active) setAvailable(Boolean(result?.available));
      })
      .catch(() => {
        if (active) setAvailable(false);
      });

    return () => {
      active = false;
    };
  }, []);

  if (!available) return null;

  return (
    <a className="mi-text-link" href="/api/resume/file" target="_blank" rel="noreferrer">
      Lihat resume <span aria-hidden="true">↗</span>
    </a>
  );
}