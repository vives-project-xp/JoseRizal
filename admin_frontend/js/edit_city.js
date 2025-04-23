document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const cityId = params.get("id");

    if (!cityId) {
        alert("No city ID provided!");
        return;
    }

    const token = localStorage.getItem("access_token");

    loadCityData(cityId);

    async function loadCityData(id) {
        try {
            const res = await fetch(`http://100.107.144.48:8000/city/${cityId}`);
            if (!res.ok) throw new Error("Failed to fetch city");
            const city = await res.json();

            document.getElementById("cityName").value = city.name;
            document.getElementById("cityDescription").value = city.description || "";

            if (city.image_url) {
                const img = document.createElement("img");
                img.src = city.image_url;
                img.style.maxWidth = "400px";
                img.style.borderRadius = "10px";
                document.getElementById("cityImagePreview").appendChild(img);
            }

            // 你可以在这里加载并展示该 city 对应的 locations
            loadLocationsForCity(id);

        } catch (error) {
            console.error("Error loading city:", error);
            alert("Failed to load city.");
        }
    }

    async function loadLocationsForCity(cityId) {
        try {
            const res = await fetch(`http://100.107.144.48:8000/locations?city_id=${cityId}`);
            const locations = await res.json();

            const list = document.getElementById("location-list");
            locations.forEach(loc => {
                const li = document.createElement("li");
                li.textContent = loc.name;
                list.appendChild(li);
            });
        } catch (err) {
            console.error("Failed to load locations");
        }
    }

    // 处理保存更新城市
    document.getElementById("edit-city-form").addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", document.getElementById("cityName").value);
        formData.append("description", document.getElementById("cityDescription").value);

        const fileInput = document.getElementById("cityImage");
        if (fileInput && fileInput.files.length > 0) {
            formData.append("file", fileInput.files[0]);
        }

        try {
            const res = await fetch(`http://100.107.144.48:8000/update_city/${cityId}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData
            });

            const result = await res.json();
            alert(result.message || "✅ City updated!");
            window.location.href = "cities.html";
        } catch (err) {
            console.error("Error updating city", err);
            alert("Failed to update city.");
        }
    });
});
