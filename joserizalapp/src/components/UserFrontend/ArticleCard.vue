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
      <div class="card-content-text">
        <h3 class="title">{{ title }}</h3>
        <p class="preview">{{ previewText }}</p>
      </div>
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
      name: 'ArticlePage', // Using named route
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
  background: rgb(221, 221, 221);
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
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
}

.preview {
  margin: 0;
  padding: 0;
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

/* MEDIUM SIZE */
@media (max-width: 768px) {
  .article-card {
    max-width: 200px;
    max-height: 225px;
  }

  .card-image {
    flex: 2;               
  }
  
  .card-content {
    flex: 1;              
    padding: 0.5rem;
  }

  .title {
    font-size: 0.6rem;
    padding: 0;
  }

  .preview {
    font-size: 0.5rem;
  }

  .read-more {
    padding: 0.25rem 2.9rem;
    font-size: 0.5rem;
  }
}

/* MOBILE SIZE */
@media (max-width: 480px) {
  .article-card {
    max-width: 80px;
    max-height: 140px;
  }

  .card-image {
    flex: 2;               
  }
  
  .card-content {
    flex: 1;              
    padding: 0.5rem;
  }

  .title {
    font-size: 0.4rem;
    padding: 0;
  }

  .preview {
    font-size: 0.3rem;
  }

  .read-more {
    padding: 0.1rem 0.5rem;
    font-size: 0.4rem;
  }
}

</style>