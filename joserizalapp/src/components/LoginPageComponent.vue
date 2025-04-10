<template>
    <div id="login" class="loginPageContent">
        <div class="loginContainer">
            <h1>Login</h1>
            <div v-if="errorMessage" class="error-message">
                {{ errorMessage }}
            </div>
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
                    this.isLoggedIn = true;
                    this.loggedInUser = this.username;
                    this.$router.push('/admin'); 
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
        //     this.isLoggedIn = false;
        //     this.loggedInUser = null;
        //     this.$router.push('/login'); // Redirect to login page
        // }
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Pompiere&display=swap');

.loginPageContent {
    font-family: 'Pompiere', sans-serif;
    font-style: normal;
    color: #333;
    background-image: url("@/assets/background.png");
    background-size: cover;
    background-attachment: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
    padding: 2rem;
}

h1 {
    margin-top: 0;
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
    text-align: center;
}

label {
    display: block;
    margin: 0.5rem 0;
    color: #555;
}

input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    transition: border-color 0.2s ease;
}

input:focus {
    outline: none;
    border-color: #666;
}

.loginActions {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1.5rem;
}

.login-button {
    padding: 0.75rem 1.5rem;
    background: #666666;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.2s ease;
}

.login-button:hover,
.logout-button:hover {
    background: rgb(140, 140, 140);
}

.error-message {
    padding: 0.75rem;
    background-color: #ffebee;
    color: #c62828;
    border-radius: 4px;
    margin-bottom: 1.5rem;
}

@media (max-width: 480px) {
    .login-container {
        padding: 1.5rem;
    }
}
</style>