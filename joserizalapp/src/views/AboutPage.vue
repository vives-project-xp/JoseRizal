<template>
    <div class="article-page">
        <div v-if="isLoading">Loading article...</div>
        <div v-else-if="error">{{ error }}</div>
        <div v-else>
        <h1>{{ article.title }}</h1>
        <img :src="article.imageUrl" :alt="article.title" class="article-image">
        <div class="content" v-html="parsedContent"></div>
        </div>
    </div>  
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
// import { Marked } from 'marked'

import fetchArticles from '@/services/fetchArticles'

const route = useRoute()
const mockArticles = ref([])
const article = ref({})
const isLoading = ref(true)
const error = ref(null)

const marked = new Marked({
  breaks: true,
  gfm: true
})

const parsedContent = computed(() => {
  return article.value.content ? marked.parse(article.value.content) : ''
})

// Mock fetch function
const fetchArticle = async (id) => {
    await new Promise(resolve => setTimeout(resolve, 500)) // Simulate delay

    mockArticles.value = fetchArticles()

    return mockArticles.value[id-1] || null
}

onMounted(async () => {
    try {
        const result = await fetchArticle(route.params.id)
        if (result) {
            article.value = result
        } else {
            error.value = 'Article not found'
        }
    } catch (err) {
        console.log(err)
        error.value = 'Failed to load article'
    } finally {
        isLoading.value = false
    }
})
</script>

<style scoped>
    .article-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
}

.article-image {
    width: 100%;
    height: 400px;
    object-fit: cover;
    border-radius: 8px;
    margin: 1rem 0;
}

.content {
    line-height: 1.6;
    font-size: 1.1rem;
    color: #333;
}
</style>