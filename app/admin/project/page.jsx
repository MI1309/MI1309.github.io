import AdminProjectEditor from "./editor";

export const metadata = {
  title: "Project Manager | MI1309",
  robots: { index: false, follow: false },
};

export default function AdminProjectPage() {
  return (
    <main className="admin-page admin-page-wide">
      <section className="admin-panel" aria-labelledby="admin-project-title">
        <p className="mi-kicker">MI1309 · Admin</p>
        <div className="admin-heading-row">
          <div>
            <h1 id="admin-project-title">Project Manager</h1>
            <p className="admin-description">
              Tambah, edit, atau hapus proyek yang tampil di All Projects.
            </p>
          </div>
        </div>
        <AdminProjectEditor />
      </section>
    </main>
  );
}
