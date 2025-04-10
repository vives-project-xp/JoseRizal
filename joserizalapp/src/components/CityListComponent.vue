<template>
    <div class="pageComponent">
        <div class="location-list">
            <h3 class="title">Cities</h3>
            <div v-if="cities.length > 0" class="city-item">
                <div v-for="city in cities" :key="city.id" class="city-list">
                    <h4 class="city-name">{{ city.name }}</h4>                </div>
            </div>
            <div v-else class="no-cities">
                <p>No cities available</p>
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
        };
    },
    mounted() {
        this.fetchCities();
    },
    methods: {
        async fetchCities() {
            try {
                const response = await fetch("http://127.0.0.1:8000/cities", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("access_token"),
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    this.cities.value = data;
                } else {
                    console.error("Failed to fetch cities:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching cities:", error);
            }
        },
    },
};
</script>

<style></style>