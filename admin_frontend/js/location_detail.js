// js/location_detail.js
document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const locationId = params.get("id");
  
    if (!locationId) {
      document.getElementById("location-title").textContent = "No location selected";
      return;
    }
  
    try {
      const res = await fetch(`http://100.107.144.48:8000/location/${locationId}`);
      const data = await res.json();
  
      document.getElementById("location-title").textContent = data.name;
      document.getElementById("location-description").textContent = data.description;
  
      
      if (data.lat && data.lng) {
        const mapDiv = document.getElementById("map");
        const map = new google.maps.Map(mapDiv, {
          center: { lat: data.lat, lng: data.lng },
          zoom: 15
        });
      
        new google.maps.Marker({
          position: { lat: data.lat, lng: data.lng },
          map: map,
          title: data.name
        });
      } else {
        document.getElementById("map").textContent = "Coordinates not available";
      }
    } catch (err) {
      console.error("Error loading location:", err);
      document.getElementById("location-title").textContent = "Error loading location";
    }
  });