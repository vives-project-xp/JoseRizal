<template>
    <div class="LandingPage"> 
        <div class="overlay">
            <h1 class="title">JOSE RIZAL</h1>
            <img src= "@/assets/jose_rizal_clippingv2.png" alt="Jose Rizal Portrait" class="logo" />
        </div>
    </div>
</template>

<script>
export default {
    name: "LandingPage"
};
</script>

<style>
/* Import Google Font */
@import url('https://fonts.googleapis.com/css2?family=Pompiere&display=swap');
</style>

<style scoped>
.LandingPage {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: relative;
}

.title {
    font-weight: 400;
    font-size: 5rem;
    margin-top: 50px;
    margin-bottom: -150px;
}

.logo {
    width: 460px;
    height: auto;
}
</style>