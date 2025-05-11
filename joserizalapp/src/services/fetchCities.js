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

export default fetchCities;
