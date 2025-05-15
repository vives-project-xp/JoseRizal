<template>
    <div class="dev-card">
        <div class="card-image">
            <img :src="imageUrl" :alt="name" class="image">
        </div>

        <div class="card-content">
            <div class="card-content-text">
                <h3 class="name">{{ name }}</h3>
                <p class="description">{{ description }}</p>
                <a v-if="linkedinUrl" :href="linkedinUrl" target="_blank" class="linkedin-link">
                    <span class="linkedin-text">LinkedIn</span>
                </a>
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
    },
    linkedinUrl: {
        type: String,
        default: ''
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

.linkedin-link {
    display: inline-block;
    margin-top: 8px;
    text-decoration: none;
    color: #0077b5;
    font-weight: 500;
    font-size: 0.9rem;
    transition: color 0.2s;
}

.linkedin-link:hover {
    color: #004471;
    text-decoration: underline;
}

.linkedin-text {
    display: inline-flex;
    align-items: center;
}

.linkedin-text::before {
    content: "";
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-right: 5px;
    background-image: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%230077b5"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>');
    background-size: contain;
}
</style>