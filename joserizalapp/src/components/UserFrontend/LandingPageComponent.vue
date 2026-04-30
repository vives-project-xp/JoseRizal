<template>
    <div class="LandingPage"> 
        <div class="announcement-banner">
            New Update: Virtual Tour Ghent & Games added!
        </div>
        <div class="overlay">
            <h1 class="title">JOSE RIZAL</h1>
            <img src="@/assets/jose_rizal_clippingv2.png" alt="Jose Rizal Portrait" class="logo" />
        </div>
    </div>
</template>

<script>
export default {
    name: "LandingPage"
};
</script>

<style>
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
    flex-direction: column;
}

.announcement-banner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: linear-gradient(90deg, #b8860b, #ffd700, #b8860b);
    color: #3a2a00;
    font-weight: 700;
    font-size: 1.3rem;
    padding: 1rem 1rem;
    text-align: center;
    z-index: 999;
    letter-spacing: 0.03em;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.title {
    font-family: "Pompiere", sans-serif;
    font-weight: 400;
    font-size: 5rem;
    margin-top: 50px;
    margin-bottom: -150px;
}

.logo {
    width: 460px;
    height: auto;
}

@media (max-width: 480px) {
    .logo {
        width: 350px;
    }
    .title {
        margin-top: 30px;
        margin-bottom: -100px;
        margin-left: 0px;
        font-weight: 400;
        font-size: 4.3rem;
    }
}
</style>