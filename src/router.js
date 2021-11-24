import { createRouter, createWebHistory } from "vue-router";
import Home from './pages/home.vue';

const Artists = () => import('./pages/artists.vue');

const routes = [
    { path: '/', name: "home", component: Home },
    { path: '/artists', name: "artists", component: Artists }
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;