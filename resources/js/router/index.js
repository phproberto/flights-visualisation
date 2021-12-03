import { createRouter, createWebHistory } from 'vue-router'

import FlightsView from '../Views/FlightsView.vue'

const routes = [
    {
        path: '/',
        name: 'flights.index',
        component: FlightsView
    }
];

export default createRouter({
    history: createWebHistory(),
    routes
});
