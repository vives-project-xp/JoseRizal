# Editing site content

Content changes are reviewed through pull requests and deployed from the
`main` branch by Cloudflare Pages.

## Add or edit an article

Articles live in [`articles/`](articles/). Each Markdown file starts with a
small YAML header:

```markdown
---
id: 6
order: 6
title: A new article
preview: A short description shown on the home page.
locations: []
---

Write the article in Markdown here.
```

Use a new, unique positive `id`. `order` is the unique positive position on
the home page. `locations` can contain location IDs from
[`cities.yaml`](cities.yaml), for example `[4, 5]`.

## Add or edit a city or location

Cities and their walking-tour locations live in
[`cities.yaml`](cities.yaml). Keep every city and location ID unique. Store
coordinates as decimal latitude and longitude.

Put images under [`../public/static/uploads/`](../public/static/uploads/) and
reference them with an absolute site path, for example
`/static/uploads/file-name.webp`. Prefer compressed WebP images with lower-case,
descriptive file names without spaces.

## Check a change

From `joserizalapp/`, run:

```bash
npm ci
npm run check
```

The build fails for duplicate IDs or ordering values, invalid references or
coordinates, missing required text, and missing image files. A successful
build produces the site in `dist/`, ready for Cloudflare Pages.
