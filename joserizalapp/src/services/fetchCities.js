import genericCity from "../assets/generic_city.jpg";
import { loadContent } from "./loadContent";

async function fetchCities() {
  try {
    const content = await loadContent();
    return content.cities.map((city) => ({
      ...city,
      image_url: city.image_url || genericCity,
    }));
  } catch (error) {
    console.error("Error loading cities:", error);
    return [];
  }
}

async function fetchCityById(id) {
  try {
    const content = await loadContent();
    const city = content.cities.find((candidate) => candidate.id === Number(id));
    return city ? { ...city, locations: city.locations || [] } : null;
  } catch (error) {
    console.error("Error loading city:", error);
    return null;
  }
}

export { fetchCities, fetchCityById };
