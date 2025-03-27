<template>
    <div class="article-card">
      <div class="card-image">
        <img 
          :src="imageUrl" 
          :alt="title"
          class="image"
        >
      </div>
  
      <div class="card-content">
        <h3 class="title">{{ title }}</h3>
        <p class="preview">{{ previewText }}</p>
        <button 
          class="read-more"
          @click="navigateToArticle"
        >
          Read More
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  
  const props = defineProps({
    imageUrl: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    previewText: {
      type: String,
      required: true
    },
    articleId: {
      type: [Number, String],
      required: true
    }
  })
  
  const router = useRouter()

    const navigateToArticle = () => {
    router.push({
        name: 'AboutPage', // Using named route
        params: { id: props.articleId }
    })
    }
  </script>
  
  <style scoped>
  .article-card {
    max-width: 400px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    background: white;
    transition: transform 0.2s ease;
    display: flex;
    flex-direction: column;
  }
  
  .article-card:hover {
    transform: translateY(-2px);
  }
  
  .card-image {
    width: 100%;
    height: 200px;
    overflow: hidden;
  }
  
  .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .card-content {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex-grow: 1;
  }
  
  .title {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
    color: #333;
  }
  
  .preview {
    margin: 0;
    font-size: 0.9rem;
    color: #666;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .read-more {
    align-self: flex-start;
    padding: 0.5rem 1.5rem;
    background: #666666;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s ease;
  }
  
  .read-more:hover {
    background: rgb(140, 140, 140);
  }
  </style>