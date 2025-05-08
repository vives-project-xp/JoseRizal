<template>
    <div class="pageContent">
        <div class="article-card">
            <div class="card-content">
                <h3 class="title">Edit Article</h3>
                <p class="subtitle">Article Title</p>
                <input type="text" placeholder="Enter article title" class="input-field" v-model="article.title" />
                <p class="subtitle">Description</p>
                <textarea placeholder="Enter article description in markdown" class="textarea-field"
                    v-model="article.content_html"></textarea>
                <p class="subtitle">Select a city</p>
                <select class="input-field" v-model="article.city_id" @change="fetchLocations">
                    <option value="" disabled>Select a city</option>
                    <option v-for="city in cities" :key="city.id" :value="city.id">{{ city.name }}</option>
                </select>
                <p v-if="locations.length > 0" class="subtitle">Select a location</p>
                <select v-if="locations.length > 0" class="input-field" v-model="article.location_id">
                    <option value="" disabled>Select a location</option>
                    <option v-for="location in locations" :key="location.id" :value="location.id">{{ location.name }}
                    </option>
                </select>
                <button class="action-button" @click="updateArticle">Save</button>
                <button class="action-button" @click="$emit('close')">Cancel</button>
                <p v-if="message" :class="['message', messageType]">{{ message }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        articleId: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            article: {
                title: "",
                content_html: "",
                city_id: null,
                location_id: null,
            },
            cities: [],
            locations: [],
            message: "",
            messageType: "",
        };
    },
    mounted() {
        this.fetchArticleDetails();
        this.fetchCities();
    },
    methods: {
        getCookie(name) {
            const nameEQ = name + "=";
            const ca = document.cookie.split(";");
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) === " ") c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        },
        async fetchArticleDetails() {
            const token = this.getCookie("access_token");
            try {
                const response = await fetch(`http://127.0.0.1:8000/articles/${this.articleId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    this.article = data;
                    if (this.article.city_id) {
                        this.fetchLocations();
                    }
                } else {
                    const errorData = await response.json();
                    this.showMessage(errorData.message || "Failed to fetch article details", "error");
                }
            } catch (error) {
                console.error("Error fetching article details:", error);
                this.showMessage("An error occurred while fetching article details", "error");
            }
        },
        async fetchCities() {
            const token = this.getCookie("access_token");
            try {
                const response = await fetch("http://127.0.0.1:8000/cities", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    this.cities = data;
                } else {
                    console.error("Failed to fetch cities");
                }
            } catch (error) {
                console.error("Error fetching cities:", error);
            }
        },
        async fetchLocations() {
            if (!this.article.city_id) {
                this.locations = [];
                return;
            }
            const token = this.getCookie("access_token");
            try {
                const response = await fetch(`http://127.0.0.1:8000/city/${this.article.city_id}/locations`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    this.locations = data;
                } else {
                    console.error("Failed to fetch locations");
                    this.locations = [];
                }
            } catch (error) {
                console.error("Error fetching locations:", error);
                this.locations = [];
            }
        },
        async updateArticle() {
            const token = this.getCookie("access_token");
            try {
                const response = await fetch(`http://127.0.0.1:8000/articles/${this.articleId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    },
                    body: JSON.stringify(this.article),
                });
                if (response.ok) {
                    this.showMessage("Article updated successfully", "success");
                    this.$emit("article-updated");
                    window.location.reload();
                } else {
                    const errorData = await response.json();
                    this.showMessage(errorData.message || "Failed to update article", "error");
                }
            } catch (error) {
                console.error("Error updating article:", error);
                this.showMessage("An error occurred while updating the article", "error");
            }
        },
        showMessage(text, type) {
            this.message = text;
            this.messageType = type;
            setTimeout(() => {
                this.message = "";
                this.messageType = "";
            }, 5000);
        },
    },
};
</script>

<style scoped>
/* Reuse styles from AddArticleComponent.vue */
.pageContent {
    display: flex;
    padding: 16px;
    background-color: #f5f5f5;
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

.input-field,
.textarea-field {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 14px;
    margin-bottom: 12px;
    box-sizing: border-box;
}

.input-field:focus,
.textarea-field:focus {
    border-color: #666666;
    box-shadow: 0 0 0 3px rgba(140, 140, 140, 0.2);
    outline: none;
}

.action-button {
    width: 100%;
    padding: 12px;
    margin-top: 16px;
    background-color: #999999;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;
    font-size: 16px;
}

.action-button:hover {
    background-color: #666666;
}

.message {
    margin-top: 16px;
    padding: 12px;
    border-radius: 6px;
    font-size: 14px;
    text-align: center;
}

.success {
    background-color: #c6f6d5;
    color: #276749;
}

.error {
    background-color: #fed7d7;
    color: #c53030;
}
</style>
