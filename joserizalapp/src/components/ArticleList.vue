<template>
    <div>
        <h1>Articles</h1>
        <!-- Wrapper container -->
        <div class="article-list-wrapper">
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

@media (max-width: 768px) {
    .article-list {
        grid-template-columns: repeat(2, 1fr); /* 2 articles per row on mobile */
        gap: 1rem;
        padding: 1rem;
    }
}
</style>
