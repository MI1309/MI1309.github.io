import Link from "next/link";
import { PageFrame } from "./components/site-chrome";
export default function NotFound() {
  return (
    <PageFrame section="not-found">
      <section className="mi-empty-page">
        <p className="mi-kicker">404 · Not found</p>
        <h1 className="mi-page-title">Halaman ini tidak ditemukan.</h1>
        <Link className="mi-button mi-button-primary" href="/">
          Kembali ke Home
        </Link>
      </section>
    </PageFrame>
  );
}
