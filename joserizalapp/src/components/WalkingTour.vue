<template>
    <div>
        <h1>Walking Tour</h1>
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
</template>

<script setup>
import { ref, onMounted } from 'vue'

import CityCard from './CityCard.vue'
import fetchCities from '@/services/fetchCities'

const cities = ref([])

onMounted(() => {
    cities.value = fetchCities()
})
</script>
    
<style scoped>
.article-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

@media (max-width: 768px) {
    .article-list {
        grid-template-columns: 1fr;
        padding: 1rem;
    }
}
</style>