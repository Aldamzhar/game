import { createRouter, createWebHistory } from 'vue-router';
import Register from './components/Register.vue';
import Login from './components/Login.vue';
import Game from './components/Game.vue';
import Leaderboard from './components/Leaderboard.vue';
import UserResults from './components/UserResults.vue';

function isAuthenticated() {
    return !!localStorage.getItem("token");
}

const routes = [
    {
        path: '/register',
        component: Register,
    },
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/game',
        component: Game,
        beforeEnter: (to, from, next) => {
            if (isAuthenticated()) {
                next();
            } else {
                next('/login');
            }
        },
    },
    {
        path: '/leaderboard',
        component: Leaderboard,
        beforeEnter: (to, from, next) => {
            if (isAuthenticated()) {
                next();
            } else {
                next('/login');
            }
        },
    },
    {
        path: '/user-results',
        component: UserResults,
        beforeEnter: (to, from, next) => {
            if (isAuthenticated()) {
                next();
            } else {
                next('/login');
            }
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
