<template>
	<div class="page-container">
        <div v-if="isLoading">Loading article...</div>
        <div v-else-if="error">{{ error }}</div>
		<div v-else class="city-page">
        	<!-- TOURS -->
        <h1>{{ selectedCity.title }}</h1>
        <p>Explore and discover all of {{selectedCity.title }}'s landmarks related to Jose Rizal...</p>
        <FeaturedTour 
            v-if="selectedCity && selectedCity.id && locations.length > 0" 
            :imageUrl="selectedCity.image_url || cityImage" 
            :title="selectedCity.name" 
            :cityId="selectedCity.id" 
            :locations="locations" 
        />
        
        <PageBreakComponent />
		<h3>Customise Your Tour</h3>
        <p>Alternatively, you can customise your tour of {{ selectedCity.name }} instead...</p>
        <CustomTour v-if="locations.length > 0" :locations="locations" />
    	</div>
	</div>
</template>

<script setup>
import FeaturedTour from '../components/UserFrontend/FeaturedTour.vue';
import CustomTour from '../components/UserFrontend/CustomTour.vue';

import PageBreakComponent from '@/components/UserFrontend/PageBreakComponent.vue';

import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { fetchCityById} from '@/services/fetchCities';
import { fetchLocations } from '@/services/fetchLocations';

const route = useRoute()
const listOfCities = ref([])
const selectedCity = ref({})
const locations = ref([]);

const isLoading = ref(true)
const error = ref(null)

import cityImage  from '../assets/generic_city.jpg';

const fetchCity = async (id) => {
    await new Promise(resolve => setTimeout(resolve, 500));

    console.log("THIS IS THE CITY ID CHOSEN: ", id);

    try {
        const cityResponse = await fetchCityById(id);
        if (cityResponse) {
            selectedCity.value = cityResponse;
            const locationsResponse = await fetchLocations(id);
            if (locationsResponse) {
                locations.value = locationsResponse;
            } else {
                throw new Error('Locations not found');
            }
        } else {
            throw new Error('City not found');
        }
    } catch (error) {
        console.error('Error fetching city or locations:', error);
        throw error;
    }
};

onMounted(async () => {
    try {
        await fetchCity(route.params.id);
    } catch (err) {
        console.log(err);
        error.value = 'Failed to load selected city';
    } finally {
        isLoading.value = false;
    }
});

</script>

<style scoped>
.city-page {
    display: flex;
	flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: relative;
}

p {
    margin-bottom: 2rem;
}
</style>