<template>
    <div class="city-card">
        <div class="card-image">
        <img 
            :src="imageUrl" 
            :alt="title"
            class="image"
        >
        </div>

        <div class="card-content">
        <div class="card-content-text">
            <h3 class="title">{{ title }}</h3>
        </div>
        <button 
            class="view-tour"
            @click="navigateToCity"
        >
            View Tour
        </button>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

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
    }
})

const router = useRouter()

const navigateToCity = () => {
    router.push({
        name: 'CityPage', // Using named route
        params: { id: props.cityId }
    })
}
</script>

<style scoped>
.city-card {
    max-width: 400px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    background: white;
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

/* MEDIUM SIZE */
@media (max-width: 768px) {
    .city-card {
        max-width: 200px;
        max-height: 225px;
    }

    .card-image {
        flex: 2;               
    }

    .card-content {
        flex: 1;              
        padding: 0.5rem;
    }

    .title {
        font-size: 0.6rem;
        padding: 0;
    }

    .view-tour {
        padding: 0.25rem 2.9rem;
        font-size: 0.5rem;
    }
}

/* MOBILE SIZE */
@media (max-width: 480px) {
    .city-card {
        max-width: 80px;
        max-height: 140px;
    }

    .card-image {
        flex: 2;               
    }

    .card-content {
        flex: 1;              
        padding: 0.5rem;
    }

    .title {
        font-size: 0.4rem;
        padding: 0;
    }

    .view-tour {
        padding: 0.1rem 0.5rem;
        font-size: 0.4rem;
    }
}

</style>