<template>
    <div id="login" class="loginPageContent">
        <div class="loginContainer">
            <h1>Login</h1>
            <form @submit.prevent="handleLogin">
                <div class="formGroup">
                    <label for="email">Email</label>
                    <input type="email" id="email" v-model="email" required placeholder="Enter your email">
                </div>
                <div class="formGroup">
                    <label for="password">Password</label>
                    <input type="password" id="password" v-model="password" required placeholder="Enter your password">
                </div>
                <div class="loginActions">
                    <button type="submit" class="loginButton">Login</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>

</script>

<style></style>