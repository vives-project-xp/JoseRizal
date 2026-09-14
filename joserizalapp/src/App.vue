<template>
  <div class="app-container">
    <AppHeaderComponent @changePage="scrollToComponent" />
    <router-view />
  </div>
</template>

<script setup>
import AppHeaderComponent from './components/UserFrontend/AppHeaderComponent.vue';
</script>

<style scoped>
.app-container {
  background-image: url("@/assets/background.webp");
  background-size: cover;
  background-attachment: fixed;
  min-height: 100vh;
}
</style>
