import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import AboutPage from '@/views/AboutPage.vue'
import LoginPage from '@/views/LoginPage.vue'
import AdminPage from '@/views/AdminPage.vue'

const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return token !== null && token !== undefined && token !== '';
}

const routes = [
    {
        path: '/',
        component: HomePage
    },
    {
        path: '/articles/:id',
        name: 'AboutPage',
        component: AboutPage,
        props: true
    },
    {
        path: '/login',
        name: 'LoginPage',
        component: LoginPage,
    },
    {
        path: '/admin',
        name: 'AdminPage',
        component: AdminPage,
        beforeEnter: (to, from, next) => {
            if (isAuthenticated()) {
                next();
            } else {
                alert('You must be logged in to access this page.');
                next('/login');
            }
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router