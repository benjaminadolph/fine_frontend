import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

//Makes Axios available for the whole vue app
window.axios = require('axios')

createApp(App).use(store).mount('#app')
