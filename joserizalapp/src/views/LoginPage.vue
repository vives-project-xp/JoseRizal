<template>
  <div class="pageHeader">
    <div class="pageContent">
      <LoginPageComponent/>
    </div>
  </div>  
</template>

<script setup>
import LoginPageComponent from '@/components/LoginPageComponent.vue';
</script>

<style>
.pageHeader {
  background-image: url("@/assets/background.png");
  background-size: cover;
  background-attachment: fixed;
}
</style>