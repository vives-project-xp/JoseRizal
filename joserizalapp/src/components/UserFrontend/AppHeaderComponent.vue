<template>
    <div class="header">
      <button @click="toggleMenu">
        <img src="../../assets/list.svg" alt="Menu">
      </button>
      <div v-if="showMenu" class="menu">
        <a href="#" @click.prevent="navigate('introduction')">Introduction</a>
        <a href="#" @click.prevent="navigate('articleList')">Articles</a>
        <a href="#" @click.prevent="navigate('walkingTour')">Walking Tour</a>
		<a href="#" @click.prevent="navigate('AboutUs')">About Us</a>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const showMenu = ref(false);
  const router = useRouter();

  const toggleMenu = () => {
    showMenu.value = !showMenu.value;
  };
  
  const navigate = (componentId) => {
	//routes to about us
	if (componentId === 'AboutUs') {
    router.push({ name: 'AboutUs' });
    return;
  	}
  	//otherwise
    // Navigate to HomePage first, then scroll to component
    // Give a little delay to wait for that page to load
    router.push({ name: 'HomePage' }).then(() => {
      setTimeout(() => {
        const section = document.getElementById(componentId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); 
    });
  
    // Close the menu after navigation
    showMenu.value = false;
  };
  </script>
  
  <style scoped>
  .header {
    position: fixed;
    right: 25px;
    top: 20px;
    z-index: 1000;
  }
  
  .header button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
  
  .header button img {
    width: 25px;
    height: 25px;
  }
  
  .menu {
    display: flex;
    flex-direction: column;
    background-color: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    position: absolute;
    right: 10px;
    margin: 10px;
    top: 20px;
  }
  
  .menu a {
    padding: 10px;
    text-decoration: none;
    color: black;
    cursor: pointer;
  }
  
  .menu a:hover {
    background-color: #f0f0f0;
  }
  
  /*mobile */
  </style>
  