import { loadContent } from "./loadContent";

async function fetchArticles() {
  try {
    const content = await loadContent();
    return content.articles;
  } catch (error) {
    console.error("Error loading articles:", error);
    return [];
  }
}

async function fetchArticleById(id) {
  try {
    const content = await loadContent();
    return content.articles.find((article) => article.id === Number(id)) ?? null;
  } catch (error) {
    console.error("Error loading article:", error);
    return null;
  }
}

export { fetchArticles, fetchArticleById };
