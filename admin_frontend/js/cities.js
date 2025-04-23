// Author: YIBO LIANG

document.addEventListener("DOMContentLoaded", function () {
    // If there is a list of cities on the page, call fetchCities()
    if (document.getElementById("city-list")) {
        fetchCities();
    }
    // If there is a form to add a city on the page, the registration form submission event
    if (document.getElementById("add-city-form")) {
        document.getElementById("add-city-form").addEventListener("submit", addCity);
    }
});

// Show all cities
async function fetchCities() {
    const token = localStorage.getItem("access_token");

    try {
        const response = await fetch("http://100.107.144.48:8000/cities", {
            headers: { "Authorization": `Bearer ${token}` }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch cities");
        }

        const cities = await response.json();
        const cityList = document.getElementById("city-list");
        cityList.innerHTML = "";

        cities.forEach(city => {
            const li = document.createElement("li");
            li.style.display = "flex";
            li.style.justifyContent = "space-between";
            li.style.alignItems = "center";

            const cityText = document.createElement("span");
            cityText.textContent = city.name;
            cityText.style.cursor = "pointer";
            cityText.addEventListener("click", () => {
                localStorage.setItem("selected_city_id", city.id);
                window.location.href = "locations.html";
            });

            const btnContainer = document.createElement("div");

            const editBtn = document.createElement("button");
            editBtn.innerText = "edit";
            editBtn.addEventListener("click", (event) => {
                event.stopPropagation();
                window.location.href = `edit_city.html?id=${city.id}`;
            });

            const deleteBtn = document.createElement("button");
            deleteBtn.innerText = "delete";
            deleteBtn.style.marginLeft = "10px";
            deleteBtn.addEventListener("click", async (event) => {
                event.stopPropagation();
            
                if (!confirm(`Are you sure you want to delete "${city.name}" and all its locations?`)) {
                    return;
                }
            
                try {
                    const token = localStorage.getItem("access_token");
            
                    
                    const locRes = await fetch(`http://100.107.144.48:8000/locations?city_id=${city.id}`);
                    const locations = await locRes.json();
            
                    
                    for (const loc of locations) {
                        await fetch(`http://100.107.144.48:8000/delete_location/${loc.id}`, {
                            method: "DELETE",
                            headers: { "Authorization": `Bearer ${token}` }
                        });
                    }
            
                    
                    const cityRes = await fetch(`http://100.107.144.48:8000/delete_city/${city.id}`, {
                        method: "DELETE",
                        headers: { "Authorization": `Bearer ${token}` }
                    });
            
                    const result = await cityRes.json();
                    alert(result.message);
                    li.remove();
            
                } catch (error) {
                    console.error("❌ Failed to delete city with locations:", error);
                    alert("Deletion failed.");
                }
            });
            

            btnContainer.appendChild(editBtn);
            btnContainer.appendChild(deleteBtn);

            li.appendChild(cityText);
            li.appendChild(btnContainer);

            cityList.appendChild(li);
        });

    } catch (error) {
        console.error("Error fetching cities:", error);
        alert("❌ Failed to load cities.");
    }
}


// add a city
async function addCity(event) {
    event.preventDefault(); 

    const token = localStorage.getItem("access_token");
    if (!token) {
        alert("Please login first!");
        window.location.href = "index.html";
        return;
    }

    
    const formData = new FormData();
    formData.append("name", document.getElementById("cityName").value);
    formData.append("description", document.getElementById("cityDescription").value);

    
    const fileInput = document.getElementById("cityImage");
    if (fileInput && fileInput.files.length > 0) {
        formData.append("file", fileInput.files[0]);
    }

    try {
        const response = await fetch("http://100.107.144.48:8000/add_city/", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}` 
            },
            body: formData 
        });

        const data = await response.json();
        document.getElementById("output").innerText = data.message;
        if (data.image_url) {
            console.log("Uploaded image URL:", data.image_url);
        }
        alert("✅ City added successfully!");
        window.location.href = "cities.html"; // After adding successfully, jump back to the city list

    } catch (error) {
        console.error("Error adding city:", error);
        alert("❌ Error adding city: " + error);
    }
}



// Load the article list, display the title and update time of each article,and add delete and edit buttons for each article.
async function loadArticles() {
    try {
        const response = await fetch('http://100.107.144.48:8000/articles');
        const articles = await response.json();
        const articleList = document.getElementById('article-list');
        articleList.innerHTML = '';

        articles.forEach(article => {
            // Create list items and set styles so that information and buttons are distributed appropriately
            const li = document.createElement('li');
            li.style.display = "flex";
            li.style.justifyContent = "space-between";
            li.style.alignItems = "center";
            li.style.padding = "10px";
            li.style.marginBottom = "10px";
            li.style.backgroundColor = "#fff";
            li.style.borderRadius = "5px";

            // Create an information area that jumps to the details page when clicked
            const infoSpan = document.createElement("span");
            infoSpan.style.cursor = "pointer";
            const time = article.updated_at || article.created_at;
            infoSpan.innerHTML = `${article.title} (Updated: ${time})`;
            infoSpan.addEventListener('click', () => {
                window.location.href = `article_detail.html?id=${article.id}`;
            });
            li.appendChild(infoSpan);

            // Creating a Button Container
            const btnContainer = document.createElement("div");

            // delete button
            const deleteBtn = document.createElement("button");
            deleteBtn.innerText = "delete";
            deleteBtn.style.marginRight = "10px";
            deleteBtn.addEventListener("click", async (event) => {
                
                event.stopPropagation();
                if (confirm("Are you sure you want to delete this article?")) {
                    try {
                        const res = await fetch(`http://100.107.144.48:8000/articles/${article.id}`, {
                            method: "DELETE"
                        });
                        const result = await res.json();
                        alert(result.message);
                        // After the deletion is successful, remove the item from the list
                        li.remove();
                    } catch (error) {
                        console.error("Error deleting article", error);
                        alert("Deletion failed");
                    }
                }
            });
            btnContainer.appendChild(deleteBtn);

            
            const editBtn = document.createElement("button");
            editBtn.innerText = "edit";
            editBtn.addEventListener("click", (event) => {
                event.stopPropagation();
                
                window.location.href = `article_edit.html?id=${article.id}`;
            });
            btnContainer.appendChild(editBtn);

            li.appendChild(btnContainer);
            articleList.appendChild(li);
        });
    } catch (error) {
        console.error('Error loading articles:', error);
    }
}

loadArticles();

  