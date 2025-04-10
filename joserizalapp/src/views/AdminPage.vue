<template>
    <div id="adminPage" class="pageContent">
        <h1>Admin Page</h1>
        <div class="adminPageContent">
            <!-- <AddEditPageComponent /> -->
            <h1> Add location </h1>
            <AddLocationComponent />
            <h1> Add article </h1>
            <AddArticleComponent />
        </div>
    </div>
</template>

<script setup>
import AddEditPageComponent from '@/components/EditPageComponent.vue'
import AddLocationComponent from '@/components/AddLocationComponent.vue'
import AddArticleComponent from '@/components/AddArticleComponent.vue'
</script>

<script>
export default {

}
</script>

<style>

</style>