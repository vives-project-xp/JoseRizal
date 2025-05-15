<template>
    <div id="login" class="loginPageContent">
        <div class="loginContainer">
            <h1>Login</h1>
            <div v-if="errorMessage" class="error-message">
                {{ errorMessage }}
            </div>
            <form @submit.prevent="handleLogin" v-if="!isLoggedIn">
                <label for="name">Name</label>
                <input type="text" id="name" v-model="username" required placeholder="Enter your name">
                <label for="password">Password</label>
                <input type="password" id="password" v-model="password" required placeholder="Enter your password">
                <button type="submit" class="loginButton">Login</button>
            </form>
            <div v-else class="logoutAction">
                <p>You are logged in as {{ loggedInUser }}</p>
                <button @click="handleLogout" class="logoutButton">Logout</button>
            </div>
        </div>
    </div>
</template>

<script>
import { getCookie } from '@/utils/cookieUtils';

import { apiRequest, API_URL } from "../../utils/apiConfig";

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
    mounted() {
        this.checkLoginStatus();
    },
    methods: {
        checkLoginStatus() {
            const token = getCookie('access_token');
            if (token) {
                this.isLoggedIn = true;
                this.loggedInUser = getCookie('username') || this.username;
            }
        },
        setCookie(name, value, days) {
            let expires = '';
            if (days) {
                const date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = '; expires=' + date.toUTCString();
            }
            document.cookie = name + '=' + (value || '') + expires + '; path=/';
        },
        eraseCookie(name) {
            document.cookie = name + '=; Max-Age=-99999999;';
        }, async handleLogin() {
            this.errorMessage = '';
            this.successMessage = ''; try {
                console.log('Attempting to log in with:', this.username, this.password);
                // For login we need to use a special request with form data
                const response = await apiRequest('/auth/token', {
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
                    console.log('Login successful:', data.username);
                    this.setCookie('access_token', data.access_token, 7);
                    this.setCookie('username', this.username, 7);

                    this.isLoggedIn = true;
                    this.loggedInUser = this.username;
                    this.$router.push('/admin');
                }
            } catch (error) {
                console.error('Error during login:', error);
                this.errorMessage = 'An error occurred. Please try again later.';
            }
        },
        handleLogout() {
            this.eraseCookie('access_token');
            this.eraseCookie('username');
            this.isLoggedIn = false;
            this.loggedInUser = null;
            this.username = '';
            this.password = '';
            console.log('Logged out successfully');
            this.$router.push('/login');
        }
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Pompiere&display=swap');

.loginPageContent {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vh;
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

.loginButton,
.logoutButton {
    width: 100%;
    padding: 12px;
    margin-top: 16px;
    background-color: #999999;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;
    font-size: 16px;
}

.loginButton:hover,
.logoutButton:hover {
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