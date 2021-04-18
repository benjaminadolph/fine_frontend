import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';

// Makes Axios available for the whole vue app
window.axios = require('axios');

const token = localStorage.getItem('user-token');
if (token) {
  axios.defaults.headers.common.Authorization = token;
}

createApp(App).use(router).use(store).mount('#app');
