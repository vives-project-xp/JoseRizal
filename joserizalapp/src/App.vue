<template>
  <div class="app-container">
    <AppHeaderComponent @changePage="scrollToComponent" />
    <router-view />
    <FooterComponent />
  </div>
</template>

<script setup>
import AppHeaderComponent from './components/UserFrontend/AppHeaderComponent.vue';
import FooterComponent from './components/UserFrontend/FooterComponent.vue';
</script>

<style scoped>
.app-container {
  background-image: url("@/assets/background.png");
  background-size: cover;
  background-attachment: fixed;
  min-height: 100vh;
}
</style>  