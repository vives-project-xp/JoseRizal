# José Rizal Walk

![José Rizal Walk banner](joserizalapp/src/assets/jose_rizal_banner.jpg)

José Rizal Walk is an educational website about José Rizal's time in Belgium.
It includes historical articles, city landmarks, custom walking-tour links,
externally hosted games, and a virtual tour.

The website is fully static and is intended to run on Cloudflare Pages. It has
no application server, database, administrator account, or runtime API.
Content changes are made through Git and reviewed like code changes.

## Edit content

- Articles are Markdown files in
  [`joserizalapp/content/articles/`](joserizalapp/content/articles/).
- Cities and walking-tour locations are in
  [`joserizalapp/content/cities.yaml`](joserizalapp/content/cities.yaml).
- Content images are in
  [`joserizalapp/public/content/images/`](joserizalapp/public/content/images/).

Detailed editing and validation instructions are in
[`joserizalapp/content/README.md`](joserizalapp/content/README.md).

## Develop locally

Node.js is pinned in `joserizalapp/.node-version`.

```bash
cd joserizalapp
npm ci
npm run dev
```

The development server prints its local URL. Content is validated and compiled
before the server starts.

## Validate and build

```bash
cd joserizalapp
npm ci
npm run check
```

The static output is written to `joserizalapp/dist/`.

## Cloudflare Pages

Connect this GitHub repository to a dedicated Pages project with:

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Root directory | `joserizalapp` |
| Build command | `npm run build` |
| Build output directory | `dist` |

Use `joserizal.devbitapp.be` as the custom domain. Cloudflare Pages treats the
build as a Vue single-page application, so direct links such as `/articles/1`
and `/cities/1` continue to work.

## Contributors

This project was created during an Erasmus+ Blended Intensive Program by an
international group of students working with VIVES, José Rizal University, and
the Philippine diplomatic community in Belgium. The website's About Us page
contains the complete contributor list.
