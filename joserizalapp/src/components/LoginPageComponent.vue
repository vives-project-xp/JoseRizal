<template>
    <div id="login" class="loginPageContent">
        <div class="loginContainer">
            <h1>Login</h1>
            <div v-if="errorMessage" class="error-message">
                {{ errorMessage }}
            </div>
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
import axios from 'axios';

export default {
    name: 'LoginPageComponent',
    data() {
        return {
            email: '',
            password: '',
            errorMessage: ''
        }
    },
    methods: {
        async handleLogin() {
            try {
                const response = await fetch('http://localhost:8000/auth/token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams({
                        username: this.email,
                        password: this.password
                    })
                });
                
                const data = await response.json();
                
                if (!response.ok) {
                    this.errorMessage = data.detail || 'Login failed. Please check your credentials.';
                    return;
                }
                
                localStorage.setItem('token', data.access_token);
                localStorage.setItem('user', JSON.stringify(data.user));
                
                this.$emit('login-success');
                
                this.email = '';
                this.password = '';
                this.errorMessage = '';
                
                this.$emit('changePage', 'addEdit');
            } catch (error) {
                console.error('Login error:', error);
                this.errorMessage = 'An error occurred during login. Please try again.';
            }
        }
    }
}

</script>

<style></style>