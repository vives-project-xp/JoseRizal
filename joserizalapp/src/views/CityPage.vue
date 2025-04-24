<template>
	<div class="page-container">
		<div class="city-page">
        	<!-- TOURS -->
        <h1>City</h1>
        <FeaturedTour 
            :imageUrl='cityImage'
            title="City"
            :cityId="1238"
        />
        
		<h3>Customise Your tour</h3>
		
        <CustomTour />
    	</div>
	</div>
</template>

<script setup>

import FeaturedTour from '../components/UserFrontend/FeaturedTour.vue';
import CustomTour from '../components/UserFrontend/CustomTour.vue';
import cityImage  from '../assets/generic_city.jpg';

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
</style>