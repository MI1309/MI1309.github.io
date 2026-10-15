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
- `/archive/` — archive table backed by the same admin-managed `data/archive.json` source as `/projects/`

Project-list metadata is managed through the Project Manager at `data/archive.json`; the JBook case-study content remains in `app/data/projects.js`. Security Lab sections are intentionally marked unpublished until reproducible, authorized material is available.

The active home route is `app/page.jsx`. Next.js generates the static HTML under `out/` during the build; no hand-authored root `index.html` is used.

## Environment and Admin Service

The static portfolio does not require environment variables. The separate Express admin service reads values from `.env`; see `.env.example` and `README_ADMIN.md` for setup. Keep `ADMIN_PASSWORD_HASH`, `SESSION_SECRET`, `GITHUB_PAT`, and other credentials server-side and out of Git. `.env.example` contains placeholders only.

## Deployment

### First-time Vercel setup

The repository deploys to Vercel through the GitHub Actions workflow in `.github/workflows/deploy-vercel.yml`. The workflow uses the Vercel CLI to build and publish a production deployment.

1. Push this repository to GitHub, with the production branch named `main` or `master`.
2. In the Vercel dashboard, create a project for this repository. Use the repository root as the Root Directory and keep the detected Next.js build settings. The workflow reads the project settings from Vercel, so the project must exist before the first Actions run.
3. Create a Vercel access token in **Account Settings → Tokens**. Make sure the token has access to the account or team that owns the project.
4. Get the Vercel organization and project IDs. From the repository root, run `npx vercel link` and select the same account/team and project. The generated `.vercel/project.json` contains `orgId` and `projectId`; `.vercel` is ignored by Git. Alternatively, find the project ID in the Vercel project settings and the organization ID in the linked project metadata.
5. In the GitHub repository, open **Settings → Secrets and variables → Actions → New repository secret**. Add these three secrets:
	- `VERCEL_TOKEN`: the token created in step 3
	- `VERCEL_ORG_ID`: the `orgId` from the linked Vercel project
	- `VERCEL_PROJECT_ID`: the `projectId` from the linked Vercel project

6. Run the first deployment from GitHub: open **Actions → Deploy to Vercel → Run workflow**, select the production branch, then start the workflow. Open the successful run to find the deployment result and URL.
7. After the first successful run, every push to `main` or `master` automatically starts a new production deployment. A local commit does not deploy until it is pushed to GitHub.

For this guide, GitHub Actions is the deployment trigger. If Vercel's Git integration is also set to deploy this branch, pushes may create an additional deployment outside this workflow; use only one automatic deployment path to avoid duplicate builds. The static portfolio does not need environment variables by default. Configure server-side variables in Vercel only if enabling the admin/API features; see [README_ADMIN.md](README_ADMIN.md).

GitHub Pages has a separate workflow and also deploys on pushes to `main` or `master`. That deployment is independent of Vercel.

## Checks

`npm run build` runs the production static export. This repository currently defines no dedicated lint or test script.