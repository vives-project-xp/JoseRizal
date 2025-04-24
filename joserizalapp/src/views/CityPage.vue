<template>
	<div class="page-container">
        <div v-if="isLoading">Loading article...</div>
        <div v-else-if="error">{{ error }}</div>
		<div v-else class="city-page">
        	<!-- TOURS -->
        <h1>{{ selectedCity.title }}</h1>
        <p>Explore and discover all of {{selectedCity.title }}'s landmarks related to Jose Rizal...</p>
        <FeaturedTour 
            :imageUrl='selectedCity.imageUrl'
            :title='selectedCity.title'
            :cityId='selectedCity.id'
        />
        
        <PageBreakComponent />
		<h3>Customise Your Tour</h3>
        <p>Alternatively, you can customise your tour of {{ selectedCity.title }} instead...</p>
        <CustomTour />
    	</div>
	</div>
</template>

<script setup>
import FeaturedTour from '../components/UserFrontend/FeaturedTour.vue';
import CustomTour from '../components/UserFrontend/CustomTour.vue';

import PageBreakComponent from '@/components/UserFrontend/PageBreakComponent.vue';

import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import fetchCities from '@/services/fetchCities';

const route = useRoute()
const listOfCities = ref([])
const selectedCity = ref({})

const isLoading = ref(true)
const error = ref(null)

import cityImage  from '../assets/generic_city.jpg';

const fetchCity = async(id) => {
    await new Promise(resolve => setTimeout(resolve, 500))

    console.log("THIS IS THE CITY ID CHOSEN: ", id)

    listOfCities.value = fetchCities()

    return listOfCities.value[id-1] || null
}

onMounted(async () => {
    try {
        const result = await fetchCity(route.params.id)
        if (result) {
        selectedCity.value = result
        } else {
        error.value = 'City not found'
        }
    } catch (err) {
        console.log(err)
        error.value = 'Failed to load selected city'
    } finally {
        isLoading.value = false
    }
})

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