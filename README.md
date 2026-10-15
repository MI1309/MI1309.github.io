# Muhammad Imron Portfolio

The portfolio is built with Next.js App Router and React. Pages are statically
exported so they can be hosted on GitHub Pages or another static host.

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Create the production export with `npm run build`;
the generated site is written to `out/`. `npm start` runs the existing Express
admin/API server; `npm run admin:start` is an explicit alias for that service.

## Deployment

The GitHub Actions workflow builds and deploys `out/` to GitHub Pages on pushes
to `main` or `master`. In the repository settings, set Pages' build and
deployment source to **GitHub Actions**. The static output includes the
pre-rendered home and archive pages, `robots.txt`, and `sitemap.xml`.

Update `data/archive.json` to change the project archive. The site metadata,
canonical URLs, and structured profile data are maintained in `app/`.