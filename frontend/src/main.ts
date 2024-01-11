import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'

import AddClient from "./components/AddClient.vue";
import ClientOvervue from './components/ClientOvervue.vue';

const routes = [
  { path: '/', name:'addClient', component: AddClient },
  { path: '/client/:id', name:'client', component: ClientOvervue }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

createApp(App).use(router).mount('#app')
