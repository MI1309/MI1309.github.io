# MI1309 Portfolio

Personal portfolio for Muhammad Imron, focused on web development, cybersecurity learning, and the JBook project. The site uses Next.js App Router and React with JavaScript/JSX, and is exported as static files for GitHub Pages.

## Stack

- Next.js 16.4.1 and React 19 with JavaScript/JSX
- npm with the committed `package-lock.json`
- Plain CSS; portfolio styles live in `css/portfolio.css`
- Static export to `out/`, deployed by `.github/workflows/deploy-pages.yml` and `.github/workflows/deploy-vercel.yml`

## Run Locally

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`. Production static output is generated with `npm run build` and written to `out/`.

`npm start` and `npm run admin:start` run the existing Express admin/API service in `server.js`; they do not start the Next.js site. That service may use port 3000, so configure `PORT` if it conflicts with the development server.

## Routes

- `/` — home, practice areas, and featured projects; the all-projects link scrolls to the project section
- `/projects/` — project list
- `/projects/jbook/` — JBook case study, statically generated from `app/data/projects.js`
- `/about/`, `/contact/`, and `/security-lab/`
- `/archive/` — legacy editable archive; new items are managed through its existing admin workflow and `data/archive.json`

Portfolio project content is maintained in `app/data/projects.js`. The archive starts empty because the entries previously present used `example.com` placeholder links. Security Lab sections are intentionally marked unpublished until reproducible, authorized material is available.

The active home route is `app/page.jsx`. Next.js generates the static HTML under `out/` during the build; no hand-authored root `index.html` is used.

## Environment and Admin Service

The static portfolio does not require environment variables. The separate Express admin service reads values from `.env`; see `.env.example` and `README_ADMIN.md` for setup. Keep `ADMIN_PASSWORD_HASH`, `SESSION_SECRET`, `GITHUB_PAT`, and other credentials server-side and out of Git. `.env.example` contains placeholders only.

## Deployment

GitHub Actions deploys the site to GitHub Pages and Vercel on pushes to `main` or `master`. GitHub Pages uses the static export in `out/`; Vercel uses its CLI prebuilt deployment workflow.

To enable Vercel deployment, create/import the Vercel project once, then add these repository Actions secrets under **Settings → Secrets and variables → Actions**:

- `VERCEL_TOKEN` — a Vercel access token
- `VERCEL_ORG_ID` — the Vercel team or account ID
- `VERCEL_PROJECT_ID` — the linked Vercel project ID

The workflow runs after a commit is pushed to `main` or `master`; a local commit by itself cannot trigger a hosted deployment. It can also be started manually through the Actions tab. No Vercel deployment or remote push was run as part of this work.

## Checks

`npm run build` runs the production static export. This repository currently defines no dedicated lint or test script.