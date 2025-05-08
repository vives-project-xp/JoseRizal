<template>
    <div id="adminPage" class="pageContent">
        <h1>Admin Page</h1>
        <div class="addContent">
            <AddCityComponent />
            <AddLocationComponent />
            <AddArticleComponent />
        </div>
        <div class="displayContent">
            <CityListComponent />
            <ArticleListComponent />
        </div>
    </div>
</template>

<script setup>
import AddCityComponent from '@/components/AdminFrontend/AddCityComponent.vue'
import AddLocationComponent from '@/components/AdminFrontend/AddLocationComponent.vue'
import CityListComponent from '@/components/AdminFrontend/CityListComponent.vue'
import AddArticleComponent from '@/components/AdminFrontend/AddArticleComponent.vue'
import ArticleListComponent from '@/components/AdminFrontend/ArticleListComponent.vue'
</script>

<script>
export default {

}
</script>

<style>
.pageContent {
    background-image: url("@/assets/background.png");
    background-size: cover;
    background-attachment: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
}

.addContent {
    display: flex;
    flex-direction: row;
    gap: 20px;
    margin-bottom: 20px;
}

.addContent>* {
    flex: 1;
}

@media (max-width: 768px) {
    .addContent {
        flex-direction: column;
    }
}
</style>