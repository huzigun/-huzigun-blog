import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import axios from 'axios';

import '@/assets/common.scss';

axios.defaults.baseURL = 'http://localhost:9700';
axios.defaults.withCredentials = true;

createApp(App).use(store).use(router).mount('#app');
