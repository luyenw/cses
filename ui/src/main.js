import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import axios from 'axios'
// axios.defaults.headers.common['X-Requested-With'] ='XMLHttpRequest'
axios.defaults.withCredentials = true
const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
