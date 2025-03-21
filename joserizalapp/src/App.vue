<template>
  <div class="app-container">
    <div class="page-container">
      <div class="page-header">
        <AppHeaderComponent @changePage="scrollToComponent" />
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
.pageContent {
  margin: 5px;
}
</style>