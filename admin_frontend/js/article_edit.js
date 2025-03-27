//Author: YIBO LIANG 

//obtain article_id from URL parameter
    const params = new URLSearchParams(window.location.search);
    const articleId = params.get("id");
    if (!articleId) {
        alert("No article ID provided!");
        return;
    }

    let editorInstance;
    let allLocations = []; 
    let selectedLocationIds = []; 

    // 1. inicia CKEditor
    ClassicEditor
        .create(document.querySelector('#editor'))
        .then(editor => {
            editorInstance = editor;
           
            loadArticle(articleId);
            loadLocations();
        })
        .catch(error => {
            console.error("Error initializing CKEditor:", error);
        });

    
    async function loadArticle(id) {
        try {
            const res = await fetch(`http://100.107.144.48:8000/articles/${id}`);
            if (!res.ok) {
                throw new Error("Failed to fetch article");
            }
            const article = await res.json();
            
            document.getElementById("articleTitle").value = article.title || "";
            
            editorInstance.setData(article.content_html || "");
           
            if (article.locations && Array.isArray(article.locations)) {
                selectedLocationIds = article.locations.map(loc => loc.id);
            } else {
                selectedLocationIds = [];
            }
            
            updateLocationCheckboxes();
        } catch (error) {
            console.error("Error loading article:", error);
            alert("Failed to load article data.");
        }
    }

    
    async function loadLocations() {
        try {
            const res = await fetch("http://100.107.144.48:8000/locations");
            if (!res.ok) {
                throw new Error("Failed to fetch locations");
            }
            allLocations = await res.json();
            // 生成复选框
            renderLocationCheckboxes(allLocations);
            // 根据已选地点更新复选框状态
            updateLocationCheckboxes();
        } catch (error) {
            console.error("Error loading locations:", error);
            alert("Failed to load locations.");
        }
    }

    // 4. 生成地点复选框
    function renderLocationCheckboxes(locations) {
        const container = document.getElementById("locationContainer");
        container.innerHTML = "";
        locations.forEach(location => {
            const label = document.createElement("label");
            label.style.display = "block";
            
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.value = location.id;
            checkbox.addEventListener("change", (e) => {
                const locId = parseInt(e.target.value, 10);
                if (e.target.checked) {
                    
                    if (!selectedLocationIds.includes(locId)) {
                        selectedLocationIds.push(locId);
                    }
                } else {
                    
                    selectedLocationIds = selectedLocationIds.filter(id => id !== locId);
                }
            });

            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(" " + location.name));
            container.appendChild(label);
        });
    }

    
    function updateLocationCheckboxes() {
        const checkboxes = document.querySelectorAll("#locationContainer input[type='checkbox']");
        checkboxes.forEach(checkbox => {
            const locId = parseInt(checkbox.value, 10);
            checkbox.checked = selectedLocationIds.includes(locId);
        });
    }

    
    document.getElementById("edit-article-form").addEventListener("submit", async (e) => {
        e.preventDefault(); 

        
        const updatedTitle = document.getElementById("articleTitle").value;
        const updatedContent = editorInstance.getData();

        
        const updatedData = {
            title: updatedTitle,
            content_html: updatedContent,
            location_ids: selectedLocationIds
        };

        try {
            const res = await fetch(`http://100.107.144.48:8000/articles/${articleId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedData)
            });

            if (!res.ok) {
                throw new Error("Failed to update article");
            }

            const result = await res.json();
            alert(result.message || "Article updated successfully!");
           
            window.location.href = "cities.html";
        } catch (error) {
            console.error("Error updating article:", error);
            alert("Failed to update article.");
        }
    });
});
