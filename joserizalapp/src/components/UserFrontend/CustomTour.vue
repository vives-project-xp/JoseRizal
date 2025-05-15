<template>
  <div class="landmark-card">
    <!--landmarks selection list-->
    <div class="landmark-controls">
      <div v-for="landmark in allLandmarks" :key="landmark.id" class="control-item">
        <label :for="'landmark-{{landmark.id}}'" class="control-label">
          <img :src="landmark.imageUrl" :alt="'Thumbnail of {{landmark.name}}'" class="thumbnail" />
          <p>{{ landmark.title }}</p> <input type="checkbox" :id="'landmark-' + landmark.id"
            v-model="selectedLandmarkIds" :value="landmark.id" @change="handleToggle(landmark.id)" />
        </label>
      </div>

      <button class="view-tour" @click="startTour">
        Start Tour
      </button>
    </div>
  </div>
</template>

<<<<<<< HEAD
  const startTour = () => {
    // open google maps with the selected landmarks
    const baseUrl = 'https://www.google.com/maps/dir/'
    const urls = orderedLandmarks.value.map(landmark => {
      return `${landmark.latitude},${landmark.longitude}` 
    })
    const url = urls.join('/')
    window.open(baseUrl + url, '_blank')
=======
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
>>>>>>> a7be49128359cdc5a7276f42b6ff52e725b7004f
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
.landmark-card {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  max-width: 400px;
  overflow: hidden;
}

.thumbnail {
  aspect-ratio: 2/1;
  width: 100%;
  max-width: px;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
  display: block;
  background: #e0e0e0;
}

.landmark-controls {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background: rgb(221, 221, 221);
  transition: transform 0.2s ease;
  display: flex;
  flex-direction: column;
}

.control-item {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  max-width: 400px;
  overflow: hidden;
}

.control-label {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.control-label p {
  font-size: 1.3rem;
  font-weight: 600;
  text-align: center;
  padding: 0.5rem;
}

.control-label input[type="checkbox"] {
  width: 20px;
  height: 20px;
  accent-color: #666666;
  margin-top: 0.1rem;
}

.view-tour {
  align-self: center;
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

@media (max-width: 500px) {
  .landmark-controls {
    max-width: 100%;
    padding: 0.5rem;
    border-radius: 8px;
  }

  .thumbnail {
    max-width: 100%;
    aspect-ratio: 2/1;
    height: auto;
  }
}
</style>