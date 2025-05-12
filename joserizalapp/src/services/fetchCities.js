import generic_city from "../assets/generic_city.jpg";

async function fetchCities() {
  try {
    const response = await fetch("http://127.0.0.1:8000/cities", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Cities data fetched successfully:", data);

      return data.map((city) => ({
        ...city,
        image_url: city.image_url
          ? `http://127.0.0.1:8000${city.image_url}`
          : generic_city,
      }));
    } else {
      console.error("Error fetching cities data:", response.statusText);
      return [];
    }
  } catch (error) {
    console.error("Error fetching cities data:", error);
    return [];
  }
}

async function fetchCityById(id) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/city/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log("City data fetched successfully:", data);
      return {
        ...data,
        image_url: data.image_url ? `http://127.0.0.1:8000${data.image_url}` : null,
        locations: data.locations || [],
      };
    }
    console.error("Error fetching city data:", response.statusText);
    return null;
  } catch (error) {
    console.error("Error fetching city data:", error);
    return null;
  }
}

async function fetchLocations(cityId) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/city/${cityId}/locations`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log("Locations data fetched successfully:", data);
      return data.map((location) => ({
        ...location,
        location_data: JSON.parse(location.location_data),
        image_url: location.image_url
          ? `http://127.0.0.1:8000${location.image_url}`
          : null,
      }));
    }
    console.error("Error fetching locations data:", response.statusText);
    return null;
  } catch (error) {
    console.error("Error fetching locations data:", error);
    return null;
  }
}

export { fetchCities, fetchCityById, fetchLocations };
