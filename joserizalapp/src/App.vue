<template>
  <AppHeaderComponent @changePage="scrollToComponent" />
  <router-view />
</template>

<script setup>
import AppHeaderComponent from './components/UserFrontend/AppHeaderComponent.vue';
</script>

<style scoped>
</style>