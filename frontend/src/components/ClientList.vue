<template>
  <h1>Kunder</h1>
  <ul>
    <li v-for="client in clients" :key="client.id">
      <router-link to="/clients/">
        {{ client.shortname }}
      </router-link>
    </li>
  </ul>
  <router-link to="/">Lägg till en ny kund</router-link>
</template>

<script setup lang="ts">
import { ref, Ref } from "vue";
import axios from "axios";
const clients: Ref<Client[]> = ref([]);

interface Client {
  id: number;
  shortname: string;
  name: string;
}

axios.get("/api/clients").then((res) => (clients.value = res.data));
</script>

<style scoped>
h1 {
  font-size: 32px;
  font-weight: 200;
}
ul {
  padding: 0;
}

li {
  list-style-type: none;
  text-align: left;
  padding-left: 40px;
}
</style>
