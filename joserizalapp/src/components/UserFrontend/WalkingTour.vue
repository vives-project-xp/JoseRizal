<template>
    <div>
        <h1>Walking Tour</h1>
        <p>Discover more about Jose Rizal's historical whereabouts...</p>
        <div class="article-list-wrapper">
            <div class="article-list">
                <CityCard
                v-for="city in cities"
                :key="city.id"
                :image-url="city.imageUrl"
                :title="city.title"
                :city-id="city.id"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import CityCard from './CityCard.vue'
import { fetchCities } from '@/services/fetchCities'

const cities = ref([])

onMounted(async () => {
    const fetchedCities = await fetchCities();
    cities.value = fetchedCities.map(city => ({
        id: city.id,
        imageUrl: city.image_url,
        title: city.name
    }));
});
</script>
    
<style scoped>
p {
    text-align: center;
}

.article-list-wrapper {
    width: 100%;
    max-width: 1200px;  /* Controls the maximum width */
    margin: 0 auto;     /* Centers the container horizontally */
    padding: 0 2rem;    /* Add padding on the sides */
    box-sizing: border-box;
}

.article-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

/*Medium size*/ 
@media (max-width: 768px) {
    .article-list {
        grid-template-columns: repeat(2, 1fr); /* 2 articles per row on mobile */
        gap: 1rem;
        padding: 1rem;
    }
}

/*Mobile size*/
/*Mobile size*/
@media (max-width: 480px) {
    .article-list {
        grid-template-columns: 1fr; /* Single column */
        gap: 1rem;
        padding: 1rem;
    }

    .article-list > * {
        width: 100%; /* Make sure children fill the column */
    }
}
</style>