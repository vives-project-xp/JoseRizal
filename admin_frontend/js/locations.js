//Author:YIBO LIANG

const token = localStorage.getItem("access_token");
console.log("Token:", token);
if (!token) {
    alert("Please login first!");
    window.location.href = "index.html";
}

// -------------------- Get city information --------------------
async function fetchCityDetails() {
    // Dynamically get the latest selected_city_id each time you call
    const cityId = localStorage.getItem("selected_city_id");
    console.log("Fetching city details for cityId:", cityId);
    if (!cityId) {
        alert("❌ No city selected. Redirecting to city list.");
        window.location.href = "cities.html";
        return;
    }
    try {
        const response = await fetch(`http://100.107.144.48:8000/city/${cityId}`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        if (!response.ok) {
            throw new Error("❌ City not found!");
        }
        const city = await response.json();
        document.getElementById("city-name").innerText = city.name;
        document.getElementById("city-description").innerText = city.description;
        

        const cityImage = document.getElementById("city-image");
        if (city.image_url) {
            cityImage.src = city.image_url;
            cityImage.style.display = "block";
        } else {
            cityImage.style.display = "none";
        }

    } catch (error) {
        console.error("Error fetching city details:", error);
        alert("❌ Failed to load city details.");
    }
}

// -------------------- 获取 Location 列表 --------------------
async function fetchLocations() {
    // 每次调用时动态获取最新的 selected_city_id
    const cityId = localStorage.getItem("selected_city_id");
    console.log("Fetching locations for cityId:", cityId);
    if (!cityId) {
        alert("❌ City ID is missing! Redirecting...");
        window.location.href = "cities.html";
        return;
    }
    try {
        const response = await fetch(`http://100.107.144.48:8000/city/${cityId}/locations`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        const locations = await response.json();
        const locationList = document.getElementById("location-list");
        locationList.innerHTML = ""; 

        locations.forEach(location => {
            const li = document.createElement("li");
            li.innerText = `${location.name} (City ID: ${location.city_id})`;
            li.addEventListener("click", () => {
                localStorage.setItem("selected_location_id", location.id);
                window.location.href = "media.html"; // Jump to Media page
            });
            // delete button
            const deleteBtn = document.createElement("button");
            deleteBtn.innerText = "❌ Delete";
            deleteBtn.style.marginLeft = "10px";
            deleteBtn.addEventListener("click", (event) => {
                event.stopPropagation();
                deleteLocation(location.id);
            });
            li.appendChild(deleteBtn);
            locationList.appendChild(li);
        });
    } catch (error) {
        console.error("Error fetching locations:", error);
        alert("❌ Failed to load locations.");
    }
}

// -------------------- delete Location --------------------
async function deleteLocation(location_id) {
    if (!confirm("Are you sure you want to delete this location?")) return;
    try {
        const response = await fetch(`http://100.107.144.48:8000/delete_location/${location_id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await response.json();
        alert(data.message);
        fetchLocations(); // Reload list after deletion
    } catch (error) {
        alert("❌ Error deleting location: " + error);
    }
}


// -------------------- Add Location --------------------
async function addLocation() {
    
    const cityId = localStorage.getItem("selected_city_id");
    if (!cityId) {
        alert("❌ No city selected! Redirecting to city list.");
        window.location.href = "cities.html";
        return;
    }

    
    const name = document.getElementById("locationName").value;
    const description = document.getElementById("locationDescription").value;
    const latitude = document.getElementById("latitude").value;
    const longitude = document.getElementById("longitude").value;

    
    if (!latitude || !longitude) {
        alert("❌ Please select a location on the map!");
        return;
    }

    
    const locationData = {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude)
    };

    const data = {
        city_id: parseInt(cityId),  
        name: name,
        description: description,
        location_data: locationData
    };

    try {
        const response = await fetch("http://100.107.144.48:8000/add_location/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || "Failed to add location");
        }

        const result = await response.json();
        alert(result.message);
        window.location.href = "locations.html"; // 跳转到地点列表页面
    } catch (error) {
        console.error("Error adding location:", error);
        alert("❌ Error adding location: " + error.message);
    }
}

let map;
let marker;

function initMap() {
    const defaultCenter = { lat: 51.0543, lng: 3.7174 }; // 根特, 比利时

    map = new google.maps.Map(document.getElementById("map"), {
        center: defaultCenter,
        zoom: 12
    });

    
    map.addListener("click", (event) => {
        placeMarker(event.latLng);
    });
}

function placeMarker(location) {
    if (marker) {
        marker.setPosition(location);
    } else {
        marker = new google.maps.Marker({
            position: location,
            map: map,
        });
    }

    
    document.getElementById("latitude").value = location.lat();
    document.getElementById("longitude").value = location.lng();

    
    document.getElementById("selectedCoords").innerText =
        "Selected Coordinates: (" + location.lat().toFixed(6) + ", " + location.lng().toFixed(6) + ")";
}

document.addEventListener("DOMContentLoaded", function() {
    const selectBtn = document.getElementById("selectOnMapBtn");
    if (selectBtn) {
      selectBtn.addEventListener("click", function () {
        const mapDiv = document.getElementById("map");
        
        if (mapDiv.style.display === "none" || mapDiv.style.display === "") {
          mapDiv.style.display = "block";
          
          if (!map) {
            initMap();
          } else {
            google.maps.event.trigger(map, "resize");
          }
        } else {
          mapDiv.style.display = "none";
        }
      });
    } else {
      console.error("Element with id 'selectOnMapBtn' not found.");
    }
  });


// -------------------- Called when the page loads --------------------
const selectedCityId = localStorage.getItem("selected_city_id");
if (selectedCityId) {
    fetchCityDetails();  // Loading city information
    fetchLocations();    // Load locations for this city
} else {
    alert("❌ No city selected. Redirecting to city list.");
    window.location.href = "cities.html";
}
