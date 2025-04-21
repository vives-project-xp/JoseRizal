<template>
    <div class="city-page">
        <!-- TOURS -->
        <h1>City</h1>

        <FeaturedTour 
            imageUrl="../assets/generic_city.jpg"
            title="Type shit"
            :cityId="1238"
        />
        
        <CustomTour />
    </div>
</template>

<script>
import FeaturedTour from '../components/UserFrontend/FeaturedTour.vue';
import CustomTour from '../components/UserFrontend/CustomTour.vue';
</script>