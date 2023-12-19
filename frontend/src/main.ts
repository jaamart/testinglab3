import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'

import AddClient from "./components/AddClient.vue";
import ClientDetailsVue from './components/ClientDetails.vue';

const routes = [
  { path: '/', name:'addClient', component: AddClient },
  { path: '/clients/:id', name:'client', component: ClientDetailsVue }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

createApp(App).use(router).mount('#app')
