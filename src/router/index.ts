import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/series/:tconst',
            name: 'about',
            component: () => import('../views/SeriesView.vue')
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'Not Found',
            component: () => import('../views/NotFound.vue')
        }
    ]
})

export default router
