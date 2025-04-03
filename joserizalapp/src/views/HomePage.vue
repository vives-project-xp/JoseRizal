<template>
  <div class="appContainer">
    <div class="pageContainer">
      <div class="pageHeader">
        <AppHeaderComponent @changePage="scrollToComponent" />
          <div class="pageContent">
            <LandingPageComponent />
          </div>
          <div class="pageContent" id="introduction">
            <IntoductionPageComponent />
          </div>
          <div class="pageContent" id="walkingTour">
            <WalkingTour />
          </div>
          <div class="pageContent" id="customTour">
            <CustomTour />
          </div>
          <div class="pageContent" id="articleList">
            <ArticleList />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppHeaderComponent from '../components/AppHeaderComponent.vue';
import IntoductionPageComponent from '../components/IntroductionPageComponent.vue';
import LandingPageComponent from '../components/LandingPageComponent.vue'
import ArticleList from '../components/ArticleList.vue';
import WalkingTour from '@/components/WalkingTour.vue';
import CustomTour from '@/components/CustomTour.vue';
</script>

<script>
export default {
  data() {
    return {
      selectedComponent: 'introduction',
    }
  },
  methods: {
    scrollToComponent(componentId) {
      this.selectedComponent = componentId;
      this.$nextTick(() => {
        const element = document.getElementById(componentId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          console.error(`Element with ID '${componentId}' not found`);
        }
      });
    }
  }
}
</script>

<style scoped>
.appContainer {
  background-image: url("@/assets/background.png");
  background-size: cover;
  background-attachment: fixed;
}

.pageContainer {
  padding: 5px;
}
</style>