<template>
    <div class="pageContent">
        <div class="city-card">
            <div class="card-content">
                <h1 class="title">Cities</h1>
                <div v-if="cities.length > 0" class="cities-container">
                    <div v-for="city in cities" :key="city.id" class="city-item">
                        <button type="button" class="collapsible" :class="{ 'active': city.showLocations }"
                            @click="toggleLocations(city.id)">
                            {{ city.name }}
                        </button>
                        <div class="content" :style="{ display: city.showLocations ? 'block' : 'none' }">
                            <div class="city-image" v-if="city.image_url">
                                <img :src="city.image_url" alt="City Image" class="city-image" />
                            </div>
                            <div class="city-actions">
                                <button class="action-button" @click="editCity(city.id)">Edit City</button>
                                <button class="action-button" @click="deleteCity(city.id)">Delete City</button>
                            </div>
                            <div v-if="locations.length === 0" class="no-locations">
                                <p>No locations available for this city.</p>
                            </div>
                            <div>
                                <div class="location-item" v-for="location in locations" :key="location.id">
                                    <h5 class="location-name">{{ location.name }}</h5>
                                    <p class="location-coordinates">
                                        Coordinates: {{ location.latitude }}, {{ location.longitude }}
                                    </p>
                                    <div class="location-image" v-if="location.image_url">
                                        <img :src="location.image_url" alt="Location Image" class="location-image" />
                                    </div>
                                    <div class="location-actions">
                                        <button class="action-button" @click="editLocation(location.id)">
                                            Edit Location
                                        </button>
                                        <button class="action-button" @click="deleteLocation(location.id)">
                                            Delete Location
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="no-cities">
                    <p>No cities available.</p>
                </div>
            </div>
        </div>
        <div v-if="showEditCityModal" class="modal">
            <EditCityComponent :city="selectedCity" @close="closeEditCityModal" @city-updated="onCityUpdated" />
        </div>
        <div v-if="showEditLocationModal" class="modal">
            <EditLocationComponent :locationId="selectedLocation.id" @close="closeEditLocationModal"
                @location-updated="() => fetchLocation(selectedCityId)" />
        </div>
    </div>
</template>

<script>
import EditCityComponent from './EditCityComponent.vue';
import EditLocationComponent from './EditLocationComponent.vue';

export default {
    name: "CityListComponent",
    components: { EditCityComponent, EditLocationComponent },
    data() {
        return {
            cities: [],
            selectedCityId: null,
            locations: [],
            message: "",
            showEditCityModal: false,
            selectedCity: null,
            showEditLocationModal: false,
            selectedLocation: null,
        };
    },
    mounted() {
        this.fetchCities();
    },
    methods: {
        getCookie(name) {
            const nameEQ = name + '=';
            const ca = document.cookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) === ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        },
        async fetchCities() {
            const token = this.getCookie("access_token");
            try {
                const response = await fetch("http://127.0.0.1:8000/cities", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log("Cities fetched successfully:", data);
                    this.cities = data.map(city => ({
                        ...city,
                        image_url: city.image_url ? `http://127.0.0.1:8000${city.image_url}` : null,
                        showLocations: false,
                    }));
                } else {
                    console.error("Failed to fetch cities:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching cities:", error);
            }
        },
        async fetchLocation(cityId) {
            const token = this.getCookie("access_token");
            try {
                const response = await fetch(`http://127.0.0.1:8000/city/${cityId}/locations`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (!response.ok) {
                    console.error("Failed to fetch locations:", response.statusText);
                    return;
                }
                const data = await response.json();
                console.log("Locations fetched successfully:", data);
                this.locations = data.map(loc => {
                    let coords = { latitude: null, longitude: null };
                    try {
                        coords = JSON.parse(loc.location_data);
                    } catch (e) {
                        console.error("Invalid JSON in location_data for id", loc.id, e);
                    }
                    return {
                        ...loc,
                        latitude: coords.latitude,
                        longitude: coords.longitude,
                        image_url: loc.image_url ? `http://127.0.1:8000${loc.image_url}` : null,
                    };
                });
            } catch (error) {
                console.error("Error fetching locations:", error);
            }
        },
        toggleLocations(cityId) {
            this.cities.forEach(city => {
                if (city.id === cityId) {
                    city.showLocations = !city.showLocations;
                    if (city.showLocations) {
                        this.selectedCityId = cityId;
                        this.fetchLocation(cityId);
                    } else {
                        this.selectedCityId = null;
                        this.locations = [];
                    }
                } else {
                    city.showLocations = false;
                }
            });
        },
        editLocation(locationId) {
            const location = this.locations.find(location => location.id === locationId);
            if (!location) {
                console.error("Location not found:", locationId);
                return;
            }
            this.selectedLocation = location;
            this.showEditLocationModal = true;
            console.log("Edit location with ID:", locationId);
        },
        async deleteLocation(locationId) {
            console.log("Delete location with ID:", locationId);
            const token = this.getCookie("access_token");
            const confirmDelete = confirm("Are you sure you want to delete this location?");

            try {
                const response = await fetch(`http://127.0.0.1:8000/delete_location/${locationId}`, {
                    method: "DELETE",
                    headers: { "Authorization": "Bearer " + token },
                });
                const data = await response.json();
                if (response.ok) {
                    console.log("Location deleted successfully:", data);
                    this.message = "Location deleted successfully.";
                    if (this.selectedCityId) {
                        this.fetchLocation(this.selectedCityId);
                    }
                } else {
                    console.error("Failed to delete location:", response.statusText);
                    this.message = "Failed to delete location.";
                }
            } catch (error) {
                console.error("Error deleting location:", error);
            }
        },
        editCity(cityId) {
            const city = this.cities.find(city => city.id === cityId);
            if (!city) {
                console.error("City not found:", cityId);
                return;
            }
            this.selectedCity = city;
            this.showEditCityModal = true;
            console.log("Edit city with ID:", cityId);
        },
        async deleteCity(cityId) {
            console.log("Delete city with ID:", cityId);
            const token = this.getCookie("access_token");
            const confirmDelete = confirm("Are you sure you want to delete this city and all its locations?");

            if (!confirmDelete) return;

            try {
                const responseLocations = await fetch(`http://127.0.0.1:8000/city/${cityId}/locations`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token,
                    },
                });

                if (responseLocations.ok) {
                    const locations = await responseLocations.json();

                    for (const location of locations) {
                        await fetch(`http://127.0.0.1:8000/delete_location/${location.id}`, {
                            method: "DELETE",
                            headers: { "Authorization": "Bearer " + token },
                        });
                    }
                    console.log("All locations deleted successfully.");
                } else {
                    console.error("Failed to fetch locations for city:", responseLocations.statusText);
                    this.message = "Failed to delete city locations.";
                    return;
                }

                const responseCity = await fetch(`http://127.0.0.1:8000/delete_city/${cityId}`, {
                    method: "DELETE",
                    headers: { "Authorization": "Bearer " + token },
                });

                if (responseCity.ok) {
                    console.log("City deleted successfully.");
                    this.message = "City deleted successfully.";
                    this.fetchCities();
                } else {
                    console.error("Failed to delete city:", responseCity.statusText);
                    this.message = "Failed to delete city.";
                }
            } catch (error) {
                console.error("Error deleting city or its locations:", error);
            }
        },
        closeEditCityModal() {
            this.showEditCityModal = false;
            this.selectedCity = null;
        },
        closeEditLocationModal() {
            this.showEditLocationModal = false;
            this.selectedLocation = null;
        },
    },
};
</script>

<style scoped>
.pageContent {
    display: flex;
    justify-content: center;
    padding: 16px;
}

.city-card {
    width: 100%;
    max-width: 100%;
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.3s, box-shadow 0.3s;
}

.card-content {
    padding: 16px;
}

.cities-container {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.collapsible {
    background-color: #999999;
    color: white;
    cursor: pointer;
    padding: 12px;
    width: 100%;
    border: none;
    text-align: left;
    font-size: 16px;
    font-weight: 500;
    border-radius: 8px;
    transition: background-color 0.3s;
}

.collapsible:after {
    content: '\002B';
    color: white;
    float: right;
}

.active:after {
    content: "\2212";
}

.active,
.collapsible:hover {
    background-color: #666666;
}

.content {
    padding: 0;
    overflow: hidden;
    background-color: #f5f5f5;
    border-radius: 0 0 8px 8px;
    margin-bottom: 8px;
}

.no-locations,
.no-cities {
    text-align: center;
    padding: 16px;
    color: #666;
}

.location-item {
    padding: 16px;
    margin: 12px;
    border: 1px solid #eee;
    border-radius: 6px;
    background-color: white;
}

.location-name {
    font-size: 1rem;
    font-weight: 500;
    color: #444;
}

.location-description {
    font-size: 0.9rem;
    color: #666;
}

.location-coordinates {
    font-size: 0.8rem;
    color: #888;
}

.location-actions,
.city-actions {
    display: flex;
    gap: 8px;
    margin-top: 12px;
}

.action-button {
    background-color: #999999;
    color: white;
    border: none;
    padding: 10px 16px;
    margin-left: 16px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background-color 0.3s;
}

.action-button:hover {
    background-color: #666666;
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 90%;
    max-width: 500px;
    position: relative;
}

.close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 1.5rem;
    cursor: pointer;
    color: #666;
}

@media screen and (min-width: 768px) {
    .city-card {
        max-width: 600px;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    }

    .card-content {
        padding: 24px;
    }

    .city-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);
    }
}
</style>