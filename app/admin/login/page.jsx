import AdminLoginForm from "./form";

export const metadata = {
  title: "Admin Login | MI1309",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main className="admin-page">
      <section className="admin-panel" aria-labelledby="admin-login-title">
        <p className="mi-kicker">MI1309 · Admin</p>
        <h1 id="admin-login-title">Masuk</h1>
        <p className="admin-description">
          Masukkan password untuk membuka pengelolaan arsip.
        </p>
        <AdminLoginForm />
      </section>
    </main>
  );
}
