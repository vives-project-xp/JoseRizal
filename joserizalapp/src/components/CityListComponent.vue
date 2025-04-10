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
                    this.cities = data;
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