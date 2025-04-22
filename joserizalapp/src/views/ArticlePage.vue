<template>
    <div class="article-page">
        <div v-if="isLoading">Loading article...</div>
        <div v-else-if="error">{{ error }}</div>
        <div v-else>
            <!-- ARTICLE TITLE,IMAGE,CONTENT -->
            <div class="article-image-wrapper">
                <img :src="article.imageUrl" :alt="article.title" class="article-image">
            </div>


            <h1 class="article-title">{{ article.title }}</h1>
            <div class="article-content-container">
                <div class="article-content" v-html="parsedContent"></div>
            </div>
        </div>
    </div>  
</template>

<script setup>
import { ref, onMounted, computed, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { Marked } from 'marked'

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

    // STYLING THE ARTICLES:
    // After we fetch the markdown article, it is parsed into HTML
    // and inserted into the DOM directly using v-html
    
    // Since it's inserted into the DOM it won't be affected by the scoped styles in this vue file
    // If we want to style the articles in a different way
    // We need to do this with jaavascript
     
    // (We do this on the next tick, since the article
    // finished rendering after the DOM has been mounted)
    nextTick(() => {
        const articleContent = document.querySelector('.article-content')

        if (articleContent) {
            // Headers
            const headings = articleContent.querySelectorAll('h1, h2, h3, h4, h5, h6')

            console.log(headings)

            headings.forEach(heading => {
                if (heading.tagName == 'H1') {
                    heading.style.fontSize = '2rem';
                }
                // Continue for the other headings
            })

            // Paragraphs
            const paragraphs = articleContent.querySelectorAll('p')
            paragraphs.forEach(paragraph => {
                paragraph.style.marginBottom = '1rem'; 
            })

            // Links
            const links = articleContent.querySelectorAll('a')
            links.forEach(link => {
                link.style.color = '#424242'; 
            })

            // Images
            const images = articleContent.querySelectorAll('img')
            images.forEach(img => {
                img.style.maxWidth = '100%'; 
                img.style.height = 'auto'; 
            })

            // Unordered lists
            const unorderedLists = articleContent.querySelectorAll('ul')
            unorderedLists.forEach(ul => {
                ul.style.marginLeft = '2rem'; 
            })

            // Ordered lists
            const orderedLists = articleContent.querySelectorAll('ol')
            orderedLists.forEach(ol => {
                ol.style.marginLeft = '2rem'; 
            })

            // List items
            const listItems = articleContent.querySelectorAll('li')
            listItems.forEach(li => {
                li.style.marginBottom = '0.5rem'; 
            })
        }
    })
})
</script>

<style scoped>
.article-page {
    min-height: 100vh;
    background-image: url("@/assets/background.png");
    background-size: cover;
    background-attachment: fixed;
    display: flex;
    flex-direction: column;
}

.article-image-wrapper {
    position: relative;
    overflow: hidden;
}

.article-image {
    position: relative;
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
    background-color: transparent;
    display: block;

}

.article-image-wrapper::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100px; /* Adjust for how tall you want the fade */
    background: linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%);
    pointer-events: none;
}

.article-title {
    margin-top: 0;
    padding-top: 3rem;
    font-size: 3rem;
}

.article-content-container {
    display: flex;
    flex-direction: column;
    align-items: center; 
    justify-content: center; 
    text-align: justify; 
    width: 50%; 
    padding: 1rem;
}

.article-content {
    color: #333;
    padding: 2rem;
    text-align: justify;
}

@media (max-width: 768px) {
    .article-content {
        width: 100%;
    }

    .article-image {
        height: 100px;
    }

    .article-title {
        font-size: 2rem;
    }
}
</style>