<template>
  <div class="appContainer">
      <div class="page-container">
        <div class="page-header">
          <AppHeaderComponent @changePage="scrollToComponent" />
          <div class="pageContent">
            <LandingPageComponent />
          </div>
          <div id="introduction" class="pageContent">
            <IntoductionPageComponent />
          </div>
          <div id="test" class="pageContent">
            <test />
          </div>
        </div>
      </div>
  </div>
</template>

<script setup>
import AppHeaderComponent from './components/AppHeaderComponent.vue';
import IntoductionPageComponent from './components/IntroductionPageComponent.vue';
import test from './components/AddEditComponent.vue';
import LandingPageComponent from './components/LandingPageComponent.vue'
</script>

<script>
export default {
  data() {
    return {
      selectedComponent: 'introduction'
    }
  },
  methods: {
    scrollToComponent(componentId) {
      this.selectedComponent = componentId;
      this.$nextTick(() => {
        const element = document.getElementById(componentId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  },
  components: {
    IntoductionPageComponent,
    test,
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Pompiere&display=swap');
</style>

<style scoped>
.appContainer {
  font-family: 'Pompiere', sans-serif;
  font-style: normal;
  color: black;
  background-image: url("@/assets/background.png");
  background-size: cover;
  background-repeat:inherit;
  background-attachment: fixed;
}

.pageContent {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>