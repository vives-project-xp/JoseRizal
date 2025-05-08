<template>
    <div class="pageContent">
        <div class="article-card">
            <div class="card-content">
                <h1 class="title">Article List</h1>
                <div v-if="articles.length > 0" class="article-list">
                    <div class="article-item" v-for="article in articles" :key="article.id">
                        <button class="collapsible" :class="{ 'active': expandedArticleId === article.id }"
                            @click="toggleArticle(article.id)">
                            {{ article.title }}
                        </button>
                        <div class="content" :style="{ display: expandedArticleId === article.id ? 'block' : 'none' }">
                            <div class="article-description" v-html="formatMarkdown(article.content_html)"></div>
                            <img :src="article.image" alt="Article Image" class="article-image" v-if="article.image" />
                            <div class="article-actions">
                                <button class="action-button" @click="editArticle(article.id)">Edit Article</button>
                                <button class="action-button" @click="deleteArticle(article.id)">Delete Article</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="no-articles">
                    <p>No articles available.</p>
                </div>
            </div>
        </div>
        <div v-if="showEditArticleModal" class="modal">
            <div class="modal-content">
                <span class="close-button" @click="closeEditArticleModal">&times;</span>
                <EditArticleComponent :articleId="selectedArticle.id" @close="closeEditArticleModal"
                    @article-updated="fetchArticles" />
            </div>
        </div>
    </div>
</template>

<script>
import { marked } from "marked";
import EditArticleComponent from "./EditArticleComponent.vue";

export default {
    components: {
        EditArticleComponent,
    },
    data() {
        return {
            articles: [],
            expandedArticleId: null,
            showEditArticleModal: false,
            selectedArticle: null,
        };
    },
    mounted() {
        this.fetchArticles();
    },
    methods: {
        async fetchArticles() {
            try {
                const response = await fetch("http://localhost:8000/articles", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    this.articles = data;
                    console.log("Articles fetched successfully:", this.articles);
                } else {
                    console.error("Failed to fetch articles:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching articles:", error);
            }
        },
        formatMarkdown(content) {
            return marked(content);
        },
        toggleArticle(articleId) {
            this.expandedArticleId = this.expandedArticleId === articleId ? null : articleId;
        },
        editArticle(articleId) {
            const article = this.articles.find(article => article.id === articleId);
            if (!article) {
                console.error("Article not found:", articleId);
                return;
            }
            this.selectedArticle = article;
            this.showEditArticleModal = true;
            console.log("Edit article with ID:", articleId);
        },
        async deleteArticle(articleId) {
            console.log("Delete article with ID:", articleId);
            const confirmDelete = confirm("Are you sure you want to delete this article?");
            if (!confirmDelete) return;

            try {
                const response = await fetch(`http://localhost:8000/articles/${articleId}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (response.ok) {
                    console.log("Article deleted successfully.");
                    this.articles = this.articles.filter(article => article.id !== articleId);
                } else {
                    console.error("Failed to delete article:", response.statusText);
                }
            } catch (error) {
                console.error("Error deleting article:", error);
            }
        },
        closeEditArticleModal() {
            this.showEditArticleModal = false;
            this.selectedArticle = null;
        },
    },
};
</script>

<style scoped>
.pageContent {
    display: flex;
    justify-content: center;
    padding: 16px;
}

.article-card {
    width: 100%;
    max-width: 100%;
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.3s, box-shadow 0.3s;
}

.card-content {
    padding: 16px;
}

.article-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.article-item {
    /* Removed padding and border to match CityListComponent.vue */
}

.collapsible {
    background-color: #999999;
    color: white;
    cursor: pointer;
    padding: 12px;
    width: 100%;
    border: none;
    text-align: left;
    font-size: 16px;
    font-weight: 500;
    border-radius: 8px;
    transition: background-color 0.3s;
}

.collapsible:after {
    content: '\002B';
    color: white;
    float: right;
}

.active:after {
    content: "\2212";
}

.active,
.collapsible:hover {
    background-color: #666666;
}

.content {
    padding: 0;
    overflow: hidden;
    background-color: #f5f5f5;
    border-radius: 0 0 8px 8px;
    margin-bottom: 8px;
}

.article-description {
    margin: 8px 0;
    font-size: 0.9rem;
    color: #666;
}

.article-image {
    max-width: 100%;
    height: auto;
    border-radius: 6px;
    margin-top: 8px;
}

.no-articles {
    text-align: center;
    padding: 16px;
    color: #666;
}

.article-actions {
    display: flex;
    gap: 8px;
    margin-top: 12px;
}

.action-button {
    background-color: #999999;
    color: white;
    border: none;
    padding: 10px 16px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background-color 0.3s;
}

.action-button:hover {
    background-color: #666666;
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 90%;
    max-width: 500px;
    position: relative;
}

.close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 1.5rem;
    cursor: pointer;
    color: #666;
}

@media screen and (min-width: 768px) {
    .article-card {
        max-width: 600px;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    }

    .card-content {
        padding: 24px;
    }

    .article-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);
    }
}
</style>