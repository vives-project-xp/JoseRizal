import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parse as parseYaml } from "yaml";

const appRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const contentRoot = join(appRoot, "content");
const publicRoot = join(appRoot, "public");

function fail(message) {
  throw new Error(`Content validation failed: ${message}`);
}

function requireText(value, field) {
  if (typeof value !== "string" || value.trim() === "") {
    fail(`${field} must be a non-empty string`);
  }
  return value.trim();
}

function requireId(value, field) {
  if (!Number.isInteger(value) || value < 1) {
    fail(`${field} must be a positive integer`);
  }
  return value;
}

function requireImage(image, field) {
  const path = requireText(image, field);
  if (!path.startsWith("/content/images/")) {
    fail(`${field} must start with /content/images/`);
  }
  if (!existsSync(join(publicRoot, path.slice(1)))) {
    fail(`${field} refers to missing file ${path}`);
  }
  return path;
}

function parseArticle(fileName) {
  const source = readFileSync(join(contentRoot, "articles", fileName), "utf8");
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    fail(`articles/${fileName} needs YAML front matter between --- markers`);
  }

  const metadata = parseYaml(match[1]);
  const body = match[2].trim();
  if (!metadata || typeof metadata !== "object" || Array.isArray(metadata)) {
    fail(`articles/${fileName} has invalid front matter`);
  }
  if (!body) {
    fail(`articles/${fileName} has no article text`);
  }

  return {
    id: requireId(metadata.id, `articles/${fileName}: id`),
    title: requireText(metadata.title, `articles/${fileName}: title`),
    preview_text: requireText(metadata.preview, `articles/${fileName}: preview`),
    location_ids: metadata.locations ?? [],
    content_html: body,
  };
}

const cityDocument = parseYaml(readFileSync(join(contentRoot, "cities.yaml"), "utf8"));
if (!Array.isArray(cityDocument?.cities) || cityDocument.cities.length === 0) {
  fail("cities.yaml must contain a non-empty cities list");
}

const ids = {
  cities: new Set(),
  locations: new Set(),
  articles: new Set(),
};
const cities = [];
const locations = [];

for (const city of cityDocument.cities) {
  const cityId = requireId(city.id, "city id");
  if (ids.cities.has(cityId)) fail(`duplicate city id ${cityId}`);
  ids.cities.add(cityId);

  const cityLocations = Array.isArray(city.locations) ? city.locations : [];
  cities.push({
    id: cityId,
    name: requireText(city.name, `city ${cityId}: name`),
    description: requireText(city.description, `city ${cityId}: description`),
    image_url: requireImage(city.image, `city ${cityId}: image`),
    locations: cityLocations.map((location) => location.id),
  });

  for (const location of cityLocations) {
    const locationId = requireId(location.id, `city ${cityId}: location id`);
    if (ids.locations.has(locationId)) fail(`duplicate location id ${locationId}`);
    ids.locations.add(locationId);

    const latitude = Number(location.latitude);
    const longitude = Number(location.longitude);
    if (!Number.isFinite(latitude) || latitude < -90 || latitude > 90) {
      fail(`location ${locationId}: latitude must be between -90 and 90`);
    }
    if (!Number.isFinite(longitude) || longitude < -180 || longitude > 180) {
      fail(`location ${locationId}: longitude must be between -180 and 180`);
    }

    locations.push({
      id: locationId,
      city_id: cityId,
      name: requireText(location.name, `location ${locationId}: name`),
      description: requireText(location.description, `location ${locationId}: description`),
      location_data: { latitude, longitude },
      image_url: requireImage(location.image, `location ${locationId}: image`),
    });
  }
}

const articleFiles = readdirSync(join(contentRoot, "articles"))
  .filter((fileName) => fileName.endsWith(".md"))
  .sort();
if (articleFiles.length === 0) fail("content/articles must contain at least one Markdown file");

const articles = articleFiles.map(parseArticle);
for (const article of articles) {
  if (ids.articles.has(article.id)) fail(`duplicate article id ${article.id}`);
  ids.articles.add(article.id);
  if (!Array.isArray(article.location_ids)) {
    fail(`article ${article.id}: locations must be a list`);
  }
  for (const locationId of article.location_ids) {
    if (!ids.locations.has(locationId)) {
      fail(`article ${article.id}: unknown location id ${locationId}`);
    }
  }
  article.locations = article.location_ids.map((locationId) => {
    const location = locations.find((candidate) => candidate.id === locationId);
    return { id: location.id, name: location.name };
  });
  delete article.location_ids;
}

cities.sort((a, b) => a.id - b.id);
locations.sort((a, b) => a.id - b.id);
articles.sort((a, b) => a.id - b.id);

mkdirSync(publicRoot, { recursive: true });
writeFileSync(
  join(publicRoot, "content.json"),
  `${JSON.stringify({ cities, locations, articles }, null, 2)}\n`,
);

console.log(
  `Validated ${cities.length} cities, ${locations.length} locations and ${articles.length} articles.`,
);
