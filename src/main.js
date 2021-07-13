import { createApp } from 'vue';
import panZoom from 'vue-panzoom';
import Vue3TouchEvents from 'vue3-touch-events';
import axios from 'axios';
import mitt from 'mitt';
import App from './App.vue';
import store from './store';
import router from './router';

const emitter = mitt();

// Makes Axios available for the whole vue app
window.axios = require('axios');

// Use for local development
axios.defaults.baseURL = 'http://localhost:3000/';
// axios.defaults.baseURL = 'http://192.168.188.44:8081/';
// Use for Server
// axios.defaults.baseURL = 'https://fine-app.multimedia.hs-augsburg.de/';

// Set Authorization header when page is reloaded and user logged in
const token = localStorage.getItem('user-token');
if (token) {
  axios.defaults.headers.common.Authorization = token;
}

console.log(axios.defaults.baseURL);

const app = createApp(App);
app
  .use(router)
  .use(store)
  .use(panZoom)
  .use(Vue3TouchEvents);
app.config.globalProperties.emitter = emitter;
app.mount('#app');
