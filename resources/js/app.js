import { createApp } from "vue";
import router from './router'

import App from "./App.vue";
import 'v-tooltip/dist/v-tooltip.css'

createApp(App).use(router).mount("#app");

require('./bootstrap');
