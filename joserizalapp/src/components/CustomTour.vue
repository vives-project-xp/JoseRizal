<template>
    <h1>Walking tour</h1>

    <div class="article-controls">
      <div v-for="article in allArticles" :key="article.id" class="control-item">
        <input 
          type="checkbox" 
          :id="'article-'+article.id" 
          v-model="selectedArticleIds"
          :value="article.id"
          @change="handleToggle(article.id)"
        >
        <label :for="'article-'+article.id">{{ article.title }}</label>
      </div>
    </div>
  
    <div class="article-list">
      <ArticleCard
        v-for="article in orderedArticles"
        :key="article.id"
        :image-url="article.imageUrl"
        :title="article.title"
        :preview-text="article.preview"
        :article-id="article.id"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import ArticleCard from './ArticleCard.vue'
  import fetchArticles from '@/services/fetchArticles'
  
  const allArticles = ref([])
  const selectedArticleIds = ref([])
  const toggleOrder = ref([]) // Tracks the order of toggles
  
  // Initialise list of articles with default order
  onMounted(() => {
    allArticles.value = fetchArticles()
    selectedArticleIds.value = allArticles.value.map(a => a.id)
    toggleOrder.value = [...selectedArticleIds.value] 
  })
  
  // Handle toggle changes,
  // Selecting and unselecting an article should change it's position in the list
  // Old articles first, and newly selected articles should be last
  const handleToggle = (articleId) => {
    if (selectedArticleIds.value.includes(articleId)) {
      toggleOrder.value.push(articleId)
    } else {
      toggleOrder.value = toggleOrder.value.filter(id => id !== articleId)
    }
  }
  
  // Get selected articles
  const orderedArticles = computed(() => {
    // Create a map for quick lookup
    const articleMap = Object.fromEntries(
      allArticles.value.map(a => [a.id, a])
    )
    
    // Return selected articles & in toggled order
    return toggleOrder.value
      .filter(id => selectedArticleIds.value.includes(id))
      .map(id => articleMap[id])
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

.article-controls {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    padding: 1rem;
    max-width: 1200px;
    margin: 0 auto;
    background: #f5f5f5;
    border-radius: 8px;
}

.control-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

@media (max-width: 768px) {
.article-list {
    grid-template-columns: 1fr;
    padding: 1rem;
}

.article-controls {
        flex-direction: column;
    }
}
</style>