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
          <div class="pageContent" id="articleList">
            <ArticleList />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppHeaderComponent from '../components/UserFrontend/AppHeaderComponent.vue';
import IntoductionPageComponent from '../components/UserFrontend/IntroductionPageComponent.vue';
import LandingPageComponent from '../components/UserFrontend/LandingPageComponent.vue'
import ArticleList from '../components/UserFrontend/ArticleList.vue';
import WalkingTour from '@/components/UserFrontend/WalkingTour.vue';
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

/*Mobile */
@media (max-width: 480px) {
  .pageContainer {
    padding: 0px;
}
}
</style>