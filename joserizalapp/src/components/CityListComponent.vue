<template>
    <div class="pageComponent">
        <div class="location-list">
            <h3 class="title">Cities</h3>
            <div v-if="cities.length > 0" class="city-item">
                <div v-for="city in cities" :key="city.id" class="city-list">
                    <div class="city-header" @click="toggleLocations(city.id)">
                        <h4 class="city-name">{{ city.name }}</h4>
                    </div>
                    <div v-if="city.showLocations" class="locations-list">
                        <h5>Locations:</h5>
                        <ul>
                            <li v-for="location in locations" :key="location.id">
                                <p>{{ location.name }}</p>
                                <p>{{ location.description }}</p>
                                <p>Coordinates: {{ location.location_data.latitude }}, {{ location.location_data.longitude }}</p>
                            </li>
                        </ul>
                        <div v-if="locations.length === 0" class="no-locations">
                            <p>No locations available for this city.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "CityListComponent",
    data() {
        return {
            cities: [],
            selectedCityId: null,
            locations: [],
            message: "",
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
                        "Authorization": "Bearer " + token,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log("Cities fetched successfully:", data);
                    this.cities = data.map(city => ({
                        ...city,
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
                        "Authorization": "Bearer " + token,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log("Locations fetched successfully:", data);
                    this.locations = data;
                } else {
                    console.error("Failed to fetch locations:", response.statusText);
                }

            } catch (error) {
                console.error("Error fetching locations:", error);
            }
        },
        toggleLocations(cityId) {
            const city = this.cities.find(city => city.id === cityId);
            if (city) {
                city.showLocations = !city.showLocations;
                if (city.showLocations) {
                    this.fetchLocation(cityId);
                } else {
                    this.locations = [];
                }
            }
        },
    },
};
</script>

<style></style>