import generic_city from "../assets/generic_city.jpg";
import { API_URL, apiRequest, getImageUrl } from "../utils/apiConfig";

async function fetchCities() {
  try {
    const response = await apiRequest("/cities");

    if (response.ok) {
      const data = await response.json();
      console.log("Cities data fetched successfully:", data);
      return data.map((city) => ({
        ...city,
        image_url: city.image_url ? getImageUrl(city.image_url) : generic_city,
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
    const response = await apiRequest(`/city/${id}`);

    if (response.ok) {
      const data = await response.json();
      console.log("City data fetched successfully:", data);
      return {
        ...data,
        image_url: getImageUrl(data.image_url),
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

export { fetchCities, fetchCityById };
