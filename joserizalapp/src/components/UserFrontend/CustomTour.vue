<template>
  <div>
	<!--landmarks selection list-->
    <div class="landmark-controls">
      <div
        v-for="landmark in allLandmarks"
        :key="landmark.id"
        class="control-item"
      >
        <input
          type="checkbox"
          :id="'landmark-${{landmark.id}}'"
          v-model="selectedLandmarkIds"
          :value="landmark.id"
          @change="handleToggle(landmark.id)"
        />

        <label :for="'landmark-{{landmark.id}}'" class="control-label">
          <img
            :src="landmark.imageUrl"
            :alt="'Thumbnail of {{landmark.name}}'"
            class="thumbnail"
          />
          <p>{{ landmark.title }}</p>
        </label>
      </div>

      <button 
          class="view-tour"
          @click="startTour"
      >
          Start Tour
      </button>
    </div>
  </div>
</template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import fetchArticles from '@/services/fetchArticles'
  
  const allLandmarks = ref([])
  const selectedLandmarkIds = ref([])
  const toggleOrder = ref([]) // Tracks the order of toggles
  
  // Initialise list of articles with default order
  onMounted(() => {
    allLandmarks.value = fetchArticles().filter(item => item.landmark === true);
    selectedLandmarkIds.value = allLandmarks.value.map(a => a.id)
    toggleOrder.value = [...selectedLandmarkIds.value] 
  })
  
  // Handle toggle changes,
  // Selecting and unselecting an article should change it's position in the list
  // Old articles first, and newly selected articles should be last
  const handleToggle = (landmarkId) => {
    if (selectedLandmarkIds.value.includes(landmarkId)) {
      toggleOrder.value.push(landmarkId)
    } else {
      toggleOrder.value = toggleOrder.value.filter(id => id !== landmarkId)
    }
  }
  
  // Get selected articles
  const orderedLandmarks = computed(() => {
    // Create a map for quick lookup
    const map = Object.fromEntries(
      allLandmarks.value.map(a => [a.id, a])
    )
    
    // Return selected articles & in toggled order
    return toggleOrder.value
      .filter(id => selectedLandmarkIds.value.includes(id))
      .map(id => landmarkMap[id])
  })
  </script>
  
<style scoped>
.landmark-controls {
	display: flex;
	flex-direction: column;    /* stack items vertically */
	gap: 1rem;                 /* space between items */
	padding: 1rem;
	max-width: 600px;
	margin: 0 auto;
	background: #f5f5f5;
	border-radius: 8px;
}

.control-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.control-label{
	display: flex;
	align-items: center;
	gap: 0.5rem;
}

.thumbnail {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 4px;
}

.view-tour {
    align-self: flex-start;
    padding: 0.5rem 1.5rem;
    background: #666666;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s ease;
}

.view-tour:hover {
    background: rgb(140, 140, 140);
}

@media (max-width: 480px) {
  .thumbnail {
    width: 32px;
    height: 32px;
  }
}

</style>