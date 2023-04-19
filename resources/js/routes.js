// resources/js/routes.js
import Game from './components/Game.vue';
import UserResults from './components/UserResults.vue';
import Leaderboard from './components/Leaderboard.vue';
import Login from './components/Login.vue';

export default [
    { path: '/', component: Game, name: 'game' },
    { path: '/user-results', component: UserResults, name: 'user-results' },
    { path: '/leaderboard', component: Leaderboard, name: 'leaderboard' },
    { path: '/login', component: Login, name: 'login' },
];
