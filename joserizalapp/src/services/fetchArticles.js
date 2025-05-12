async function fetchArticles() {
  try {
    const response = await fetch("http://localhost:8000/articles", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log("Articles fetched successfully:", data);
      return data;
    } else {
      console.error("Failed to fetch articles:", response.statusText);
      return [];
    }
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
}

async function fetchArticleById(id) {
  try {
    const response = await fetch(`http://localhost:8000/articles/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log("Article fetched successfully:", data);
      return data;
    } else {
      console.error("Failed to fetch article:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
}

export { fetchArticles, fetchArticleById };
