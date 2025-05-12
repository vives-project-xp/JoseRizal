<template>
  <div>
    <!--landmarks selection list-->
    <div class="landmark-controls">
      <div v-for="landmark in allLandmarks" :key="landmark.id" class="control-item">
        <input type="checkbox" :id="'landmark-' + landmark.id" v-model="selectedLandmarkIds" :value="landmark.id"
          @change="handleToggle(landmark.id)" />


        <label :for="'landmark-{{landmark.id}}'" class="control-label">
          <img :src="landmark.imageUrl" :alt="'Thumbnail of {{landmark.name}}'" class="thumbnail" />
          <p>{{ landmark.title }}</p>
        </label>
      </div>

      <button class="view-tour" @click="startTour">
        Start Tour
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const props = defineProps({
  locations: {
    type: Array,
    required: true,
  },
});

const allLandmarks = ref([]);
const selectedLandmarkIds = ref([]);
const toggleOrder = ref([]);

onMounted(() => {
  allLandmarks.value = props.locations
    .filter((landmark) => landmark.location_data && landmark.location_data.latitude && landmark.location_data.longitude)
    .map((landmark) => ({
      id: landmark.id,
      title: landmark.name,
      imageUrl: landmark.image_url,
      latitude: landmark.location_data.latitude,
      longitude: landmark.location_data.longitude
    }));
  console.log('Landmarks:', allLandmarks.value);
});

const handleToggle = (landmarkId) => {
  if (!toggleOrder.value.includes(landmarkId)) {
    toggleOrder.value.push(landmarkId);
  } else {
    toggleOrder.value = toggleOrder.value.filter((id) => id !== landmarkId);
  }
  console.log('Toggle Order:', toggleOrder.value);
};

const selectedLandmarks = computed(() => {
  const map = Object.fromEntries(allLandmarks.value.map((a) => [a.id, a]));
  return toggleOrder.value.map((id) => map[id]);
});


const startTour = () => {
  if (selectedLandmarks.value.length < 2) {
    alert('Please select at least two landmarks to start the tour.');
    return;
  }
  const baseUrl = 'https://www.google.com/maps/dir/?api=1';
  const validLandmarks = selectedLandmarks.value.filter(l => l.latitude && l.longitude);
  if (validLandmarks.length < 2) {
    alert('One or more selected landmarks have missing coordinates.');
    return;
  }
  const origin = `${validLandmarks[0].latitude},${validLandmarks[0].longitude}`;
  const destination = `${validLandmarks[validLandmarks.length - 1].latitude},${validLandmarks[validLandmarks.length - 1].longitude}`;
  const waypoints = validLandmarks
    .slice(1, -1)
    .map((landmark) => `${landmark.latitude},${landmark.longitude}`)
    .join('|');

  const url = `${baseUrl}&origin=${origin}&destination=${destination}&waypoints=${waypoints}`;

  window.open(url, '_blank');
};

</script>

<style scoped>
.landmark-controls {
  display: flex;
  flex-direction: column;
  /* stack items vertically */
  gap: 1rem;
  /* space between items */
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

.control-label {
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