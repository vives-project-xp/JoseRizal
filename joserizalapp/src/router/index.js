import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import ArticlePage from '@/views/ArticlePage.vue'
import CityPage from '@/views/CityPage.vue'
import LoginPage from '@/views/LoginPage.vue'
import AdminPage from '@/views/AdminPage.vue'
import { getCookie } from '@/utils/cookieUtils';

const isAuthenticated = () => {
    const token = getCookie('access_token');
    return token !== null && token !== undefined && token !== '';
}

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