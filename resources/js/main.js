// resources/js/main.js
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { createInertiaApp } from '@inertiajs/inertia-vue3';
import routes from './routes';

const router = createRouter({
    history: createWebHistory(),
    routes,
});

createInertiaApp({
    resolve: (name) => require(`./Pages/${name}`),
    setup({ el, app, props, plugin }) {
        createApp({ render: () => app(props) })
            .use(plugin)
            .use(router)
            .mount(el);
    },
});

