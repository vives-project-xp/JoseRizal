import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import ArticlePage from '@/views/ArticlePage.vue'
import CityPage from '@/views/CityPage.vue'
import AboutUs from '@/views/AboutUs.vue'
import GamesPage from '@/views/GamesPage.vue'

const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: HomePage
    },
    {
        path: '/articles/:id',
        name: 'ArticlePage',
        component: ArticlePage,
        props: true
    },
    {
        path: '/cities/:id',
        name: 'CityPage',
        component: CityPage,
        props: true
    },
    {
        path: '/about-us',
        name: 'AboutUs',
        component: AboutUs
    },
    {
        path: '/games',
        name: 'GamesPage',
        component: GamesPage
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
