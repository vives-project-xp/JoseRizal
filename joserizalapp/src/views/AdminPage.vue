<template>
    <div id="adminPage" class="pageContent">
        <h1>Admin Page</h1>
        <div class="addContent">
            <AddLocationComponent />
            <AddArticleComponent />
        </div>
        <div class="displayContent">
            <h2>City List</h2>
            <CityListComponent />
        </div>
    </div>
</template>

<script setup>
import AddLocationComponent from '@/components/AddLocationComponent.vue'
import AddArticleComponent from '@/components/AddArticleComponent.vue'
import CityListComponent from '@/components/CityListComponent.vue'
</script>

<script>
export default {

}
</script>

<style>
.pageContent {
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