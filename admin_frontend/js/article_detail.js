//YIBO LIANG

// js/article_detail.js
document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const articleId = params.get("id");
  
    if (!articleId) {
      document.getElementById("article-title").textContent = "No article selected";
      return;
    }
  
    try {
      const res = await fetch(`http://100.107.144.48:8000/articles/${articleId}`);
      const data = await res.json();
  
      document.getElementById("article-title").textContent = data.title;
      document.getElementById("article-content").innerHTML = data.content_html;
  
      const locationList = document.getElementById("location-list");
      data.locations.forEach(loc => {
        const li = document.createElement("li");
        li.style.cursor = "pointer";
        li.textContent = `${loc.name}${loc.description ? " - " + loc.description : ""}`;
        li.addEventListener("click", () => {
          window.location.href = `location_detail.html?id=${loc.id}`;
        });
        locationList.appendChild(li);
      });
    } catch (err) {
      console.error("Error loading article:", err);
      document.getElementById("article-title").textContent = "Error loading article";
    }
  });
  
