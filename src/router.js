import { createRouter, createWebHistory } from "vue-router";
import Home from './pages/home.vue';

const Artists = () => import('./pages/artists.vue');
const Groups = () => import('./pages/groups.vue');
const Artist = () => import('./pages/artist.vue');
const Search = () => import('./pages/search.vue');

const routes = [
    { path: '/', name: "home", component: Home },
    { path: '/artists', name: "artists", component: Artists },
    { path: '/groups', name: 'groups', component: Groups },
    { path: '/artist/:id', name: 'artist', component: Artist, props: true },
    { path: '/search', name: 'search', component: Search}
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;