# José Rizal Walk

![José Rizal Walk banner](joserizalapp/src/assets/jose_rizal_banner.jpg)

José Rizal Walk is an educational website about José Rizal's time in Belgium.
It includes historical articles, city landmarks, custom walking-tour links,
externally hosted games, and a virtual tour.

Cloudflare Pages builds and hosts the Vue single-page application. Site content
is stored in this repository and deployed from the `main` branch, so content
changes follow the same pull-request workflow as code changes.

## How it works

The build runs [`scripts/build-content.mjs`](joserizalapp/scripts/build-content.mjs)
to validate the Markdown and YAML sources and generate `public/content.json`.
Vite then bundles the application into `joserizalapp/dist/`, which Cloudflare
Pages publishes.

## Edit content

- Articles are Markdown files in
  [`joserizalapp/content/articles/`](joserizalapp/content/articles/).
- Cities and walking-tour locations are in
  [`joserizalapp/content/cities.yaml`](joserizalapp/content/cities.yaml).
- Content images are in
  [`joserizalapp/public/static/uploads/`](joserizalapp/public/static/uploads/).

Detailed editing and validation instructions are in
[`joserizalapp/content/README.md`](joserizalapp/content/README.md).

## Develop locally

Node.js 24.21.0 is pinned in `joserizalapp/.node-version`.

```bash
cd joserizalapp
npm ci
npm run dev
```

The development server prints its local URL. Content is validated and compiled
before it starts.

## Validate and build

```bash
cd joserizalapp
npm ci
npm run check
```

The static output is written to `joserizalapp/dist/`.

## Cloudflare Pages

Connect this GitHub repository to a Pages project with:

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Root directory | `joserizalapp` |
| Build command | `npm run build` |
| Build output directory | `dist` |

Add `joserizal.devbitapp.be` through the Pages project's **Custom domains**
screen. Direct routes such as `/articles/1` and `/cities/1` are handled by the
Vue single-page application.

## Contributors

This project was created during an Erasmus+ Blended Intensive Program by an
international group of students working with VIVES, José Rizal University, and
the Philippine diplomatic community in Belgium. The website's About Us page
contains the complete contributor list.
