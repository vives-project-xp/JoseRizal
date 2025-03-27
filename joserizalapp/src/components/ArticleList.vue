<template>
    <div>
        <h1>Articles</h1>
        <div class="article-list">
            <ArticleCard
            v-for="article in articles"
            :key="article.id"
            :image-url="article.imageUrl"
            :title="article.title"
            :preview-text="article.preview"
            :article-id="article.id"
            />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import ArticleCard from './ArticleCard.vue'
import fetchArticles from '@/services/fetchArticles'


const articles = ref([])

onMounted(() => {
    articles.value = fetchArticles()
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