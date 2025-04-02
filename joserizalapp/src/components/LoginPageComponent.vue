<template>
    <div id="login" class="loginPageContent">
        <div class="loginContainer">
            <h1>Login</h1>
            <div v-if="errorMessage" class="error-message">
                {{ errorMessage }}
            </div>
            <!-- <div v-if="successMessage" class="success-message">
                {{ successMessage }}
            </div> -->
            <form @submit.prevent="handleLogin" v-if="!isLoggedIn">
                <div class="formGroup">
                    <label for="name">Name</label>
                    <input type="text" id="name" v-model="username" required placeholder="Enter your name">
                </div>
                <div class="formGroup">
                    <label for="password">Password</label>
                    <input type="password" id="password" v-model="password" required placeholder="Enter your password">
                </div>
                <div class="loginActions">
                    <button type="submit" class="loginButton">Login</button>
                </div>
            </form>
            <div v-else class="logoutAction">
                <p>You are logged in as {{ loggedInUser }}</p>
                <button @click="handleLogout" class="logoutButton">Logout</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LoginPageComponent',
    data() {
        return {
            username: '',
            password: '',
            errorMessage: '',
            successMessage: '',
            isLoggedIn: false,
            loggedInUser: null
        }
    },
    methods: {
        async handleLogin() {
            this.errorMessage = '';
            this.successMessage = '';
            try {
                const response = await fetch('http://127.0.0.1:8000/auth/token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams({
                        username: this.username,
                        password: this.password
                    })
                });

                const data = await response.json();

                if (response.ok) {
                    localStorage.setItem('token', data.access_token);
                    this.$router.push('/admin');
                    return;
                } else {
                    this.errorMessage = data.detail || 'Login failed. Please try again.';
                }
            } catch (error) {
                console.error('Error during login:', error);
                this.errorMessage = 'An error occurred. Please try again later.';
            }
        },

        // handleLogout() {
        //     localStorage.removeItem('token');
        //     localStorage.removeItem('username');
        //     this.isLoggedIn = false;
        //     this.loggedInUser = null;
        //     this.$emit('logout');

        //     this.successMessage = 'You have been logged out.';

        //     if (this.$parent) {
        //         this.$parent.isLoggedIn = false;
        //     }
        // }
    }
}

</script>

<style>

</style>