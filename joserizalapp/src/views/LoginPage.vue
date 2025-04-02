<template>
  <div class="pageHeader">
    <div class="pageContent">
      <LoginPageComponent @login="handleLogin" @logout="handleLogout" />
    </div>
  </div>  
</template>

<script setup>
import LoginPageComponent from '@/components/LoginPageComponent.vue';
</script>

<style>

</style>