Admin server for MI1309.github.io

Quick start (local):

1. Copy `.env.example` to `.env` and fill values. Generate a bcrypt hash for your password:

```bash
node -e "const bcrypt=require('bcrypt'); console.log(bcrypt.hashSync(process.argv[1],10));" your-password
```

2. Install dependencies and start server:

```bash
npm install
npm start
```

3. Open the hidden admin route shown in the server output, e.g. `http://localhost:3000/admin/super-secret-route-123/login`.

Notes and security:
- The admin UI and API are served from a small Express server. Do not host the admin server publicly without TLS.
- Set `SESSION_SECRET` to a strong secret in production and enable `cookie.secure` (HTTPS).
- The front page loads `/api/archive` to render archive items. Updating archive is done via the admin UI.

Deploying frontend to GitHub Pages
- GitHub Pages is static-only — server code (Express) cannot run there. You can deploy the site (HTML/CSS/JS and `data/archive.json`) to GitHub Pages as usual (branch `gh-pages` or `main`/`docs/` depending on your settings).

Recommended setup to keep admin private while hosting frontend on GitHub Pages
1. Host the static site on GitHub Pages (push repository). `data/archive.json` will be served statically by Pages.
2. Run the admin Express server on a separate machine (local/VPS). Configure the server with a GitHub Personal Access Token (PAT) and `GITHUB_REPO` in the `.env`:

```
GITHUB_REPO=youruser/yourrepo
GITHUB_PAT=ghp_... (PAT with `repo` scope to trigger dispatch)
```

3. The admin server will call the GitHub API to `repository_dispatch` an `update-archive` event. A GitHub Actions workflow (`.github/workflows/update-archive.yml`) listens for this dispatch, writes `data/archive.json`, commits and pushes the change — which updates GitHub Pages content.

Security notes for this flow:
- Keep `GITHUB_PAT` secret and only on the admin server (do NOT put it in client-side code or commit it).
- Use a minimal-scope PAT (repo) and rotate if leaked.
- Ensure admin server uses HTTPS and strong session secret.

If you prefer a purely local workflow (no Actions): the admin server can write `data/archive.json` locally and you can push the change manually from the machine where the server runs.

Deploying on Vercel (recommended static + serverless)
- You can deploy the site to Vercel: static files will be served, and the `api/*.js` serverless functions handle login and archive update dispatch.
- Steps:
	1. Push repo to GitHub.
	2. On Vercel dashboard, import the GitHub repo and deploy.
	3. In Vercel Project Settings → Environment Variables, set:
		 - `ADMIN_PASSWORD_HASH` (bcrypt hash of your admin password)
		 - `JWT_SECRET` (random secret for signing tokens)
		 - `GITHUB_REPO` (owner/repo) and `GITHUB_PAT` (PAT with `repo` scope) if you want auto-commit via Actions
		 - Optional: `ADMIN_ROUTE` to define your hidden path (client-side only; the files will still be public if committed)
	4. The admin pages remain at `/admin/login.html` and `/admin/project/index.html` (or at `/admin/<ADMIN_ROUTE>/...` if you rewrite routes). The serverless endpoints are at `/api/login`, `/api/archive`, `/api/admin-archive`.

Security notes for Vercel:
- Static admin HTML in the repo is publicly accessible; to keep admin private, deploy admin UI in a separate private project or remove admin folder from public repo and host admin UI privately.
- The serverless endpoints are protected by JWT cookie; callers cannot update archive without the token.
- Keep `GITHUB_PAT` secret and configured only in Vercel env (or use GitHub Actions with repository dispatch as already provided).


