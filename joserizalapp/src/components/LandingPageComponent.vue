<template>
    <div class="LandingPage"> 
        <div class="overlay">
            <h1 class="title">JOSE RIZAL</h1>
            <img src= "@/assets/jose_rizal_clipping.png" alt="Jose Rizal Portrait" class="logo" />
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
    background-image: url("@/assets/background.png");
    background-size: cover;
    background-position: center;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: relative;
}

.overlay {
    padding: 20px;
    border-radius: 10px
}

.title {
    font-family: "Pompiere", sans-serif;
    font-weight: 400;
    font-style: normal;
    color: black;
    font-size: 5rem;
    margin-top: 50px;
    margin-bottom: -150px;
}

.logo {
    width: 460px;
    height: auto;
}
</style>