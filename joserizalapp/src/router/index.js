import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import AboutPage from '@/views/AboutPage.vue'
import LoginPage from '@/views/LoginPage.vue'

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
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router