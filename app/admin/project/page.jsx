import AdminArchiveEditor from "./editor";

export const metadata = {
  title: "Archive Manager | MI1309",
  robots: { index: false, follow: false },
};

export default function AdminProjectPage() {
  return (
    <main className="admin-page admin-page-wide">
      <section className="admin-panel" aria-labelledby="admin-archive-title">
        <p className="mi-kicker">MI1309 · Admin</p>
        <div className="admin-heading-row">
          <div>
            <h1 id="admin-archive-title">Archive Manager</h1>
            <p className="admin-description">
              Kelola entri arsip portfolio dalam format JSON.
            </p>
          </div>
        </div>
        <AdminArchiveEditor />
      </section>
    </main>
  );
}
