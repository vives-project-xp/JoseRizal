<template>
    <div class="dev-card">
        <div class="card-image">
        <img 
            :src="imageUrl" 
            :alt="name"
            class="image"
        >
        </div>

        <div class="card-content">
        <div class="card-content-text">
            <h3 class="name">{{ name }}</h3>
			<p class="description">{{ description }}</p>
        </div>
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    imageUrl: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    }
})

</script>

<style scoped>
.dev-card {
    max-width: 280px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    background: rgb(221, 221, 221);
    transition: transform 0.2s ease;
    display: flex;
    flex-direction: column;
	margin: 0px;
	margin-bottom: 15px;
}

.dev-card:hover {
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
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex-grow: 1;
}

.name {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
    color: #333;
}

.description {
	margin: 0;
  	padding: 0;
  	font-size: 1rem;
  	color: #666;
  	line-height: 1.5;
  	display: flex;
  	overflow: hidden;
	white-space: pre-line;
}

</style>