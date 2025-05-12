<template>
    <div class="city-card">
        <div class="card-image">
            <img :src="imageUrl" :alt="title" class="image">
        </div>

        <div class="card-content">
            <div class="card-content-text">
                <h3 class="title">{{ title }} Complete Tour</h3>
            </div>
            <button class="view-tour" @click="startTour">
                Start Tour
            </button>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        imageUrl: {
        type: String,
    required: true
    },
    title: {
        type: String,
    required: true
    },

    cityId: {
        type: [Number, String],
    required: true
    },
    locations: {
        type: Array,
    required: true
    }
});

const startTour = () => {
    if (props.locations.length < 2) {
        alert("Not enough locations to start a tour!");
    return;
    }

    const baseUrl = 'https://www.google.com/maps/dir/?api=1';

    // Set the starting point
    const origin = `${props.locations[0].location_data.latitude},${props.locations[0].location_data.longitude}`;
    console.log("latitude: ", props.locations[0].location_data.latitude);
    console.log("longitude: ", props.locations[0].location_data.longitude);

    // Set the destination
    const destination = `${props.locations[props.locations.length - 1].location_data.latitude},${props.locations[props.locations.length - 1].location_data.longitude}`;

    // Waypoints are all the locations except the first and last
    const waypoints = props.locations.slice(1, -1)
        .map(location => `${location.location_data.latitude},${location.location_data.longitude}`)
    .join('|');

    // Build the full URL
    const url = `${baseUrl}&origin=${origin}&destination=${destination}&waypoints=${waypoints}`;

    // Open the tour in a new tab
    window.open(url, '_blank');
};
</script>

<style scoped>
.city-card {
    max-width: 400px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    background: rgb(221, 221, 221);
    transition: transform 0.2s ease;
    display: flex;
    flex-direction: column;
}

.city-card:hover {
    transform: translateY(-2px);
}

.card-image {
    width: 100%;
    height: 200px;
    overflow: hidden;
}

.image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.card-content {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex-grow: 1;
}

.title {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
    color: #333;
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
</style>