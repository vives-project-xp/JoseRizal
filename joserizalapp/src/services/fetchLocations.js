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

export { fetchLocations };