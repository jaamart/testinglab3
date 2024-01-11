<template>
  <h2>Kunder</h2>
  <ul data-cy="clientlist">
    <li data v-for="client in clients" :key="client.clientid">
      <router-link :to="`/client/${client.clientid}`">
        {{ client.shortname }}
      </router-link>
    </li>
  </ul>
  <router-link class="btn-style" to="/">Lägg till en ny kund</router-link>
</template>

<script setup lang="ts">
import { ref, Ref } from "vue";
import axios from "axios";
const clients: Ref<Client[]> = ref([]);

interface Client {
  clientid: number;
  shortname: string;
  name: string;
}

axios.get("/api/clients").then((res) => (clients.value = res.data));
</script>

<style scoped>
.btn-style {
  background-color: #333;
  color: #ddd;
  padding: 15px;
  border-radius: 30px;
}
h2 {
  font-size: 32px;
  font-weight: 400;
}
ul {
  padding: 0;
}

li {
  list-style-type: none;
  text-align: left;
  padding-left: 40px;
  font-size: 22px;
}

a {
  color: #333;
  font-weight: 400;
}
</style>
