import { loadContent } from "./loadContent";

async function fetchLocations(cityId) {
  try {
    const content = await loadContent();
    return content.locations.filter(
      (location) => location.city_id === Number(cityId),
    );
  } catch (error) {
    console.error("Error loading locations:", error);
    return [];
  }
}

export { fetchLocations };
