<template>
    <div class="article-list-container">
        <h1>Article List</h1>
        <div class="article-list">
        <div class="article-item" v-for="article in articles" :key="article.id">
            <h2>{{ article.title }}</h2>
            <p>{{ article.content }}</p>
            <img :src="article.image" alt="Article Image" v-if="article.image" />
        </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            articles: [],
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
    },

}
</script>

<style>

</style>