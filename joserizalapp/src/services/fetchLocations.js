import { API_URL, apiRequest, getImageUrl } from "../utils/apiConfig";

async function fetchLocations(cityId) {
  try {
    const response = await apiRequest(`/city/${cityId}/locations`);

    if (response.ok) {
      const data = await response.json();
      console.log("Locations data fetched successfully:", data);
      return data.map((location) => ({
        ...location,
        location_data: JSON.parse(location.location_data),
        image_url: getImageUrl(location.image_url),
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
