<template>
    <div class="footer-parent">    
        <PageBreakComponent visibility="top"/>
        <div class="footer-container">
            <div class="footer-content">
                Footer test
            </div>
        </div>  
    </div>
</template>

<script setup>
import PageBreakComponent from './PageBreakComponent.vue';
</script>

<style scoped>
.footer-parent {
    margin-top: 4rem;
}

.footer-container {
    background-image: url("@/assets/footer.png");
    min-height: 20vh;
}
</style>