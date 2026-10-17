import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminProjectEditor from "./editor";
import ResumeManager from "./resume-manager";

export const metadata = {
  title: "Pengelola Proyek | MI1309",
  robots: { index: false, follow: false },
};

export default async function AdminProjectPage() {
  const token = (await cookies()).get("mi_auth")?.value;
  try {
    if (!token || !process.env.JWT_SECRET) throw new Error("Unauthorized");
    jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    redirect("/admin/login");
  }

  return (
    <main className="admin-page admin-page-wide">
      <section className="admin-panel" aria-labelledby="admin-project-title">
        <p className="mi-kicker">MI1309 · Administrasi</p>
        <div className="admin-heading-row">
          <div>
            <h1 id="admin-project-title">Pengelola Proyek</h1>
            <p className="admin-description">
              Tambahkan, ubah, atau hapus proyek yang tampil di halaman Semua Proyek.
            </p>
          </div>
        </div>
        <ResumeManager />
        <AdminProjectEditor />
      </section>
    </main>
  );
}
