<template>
  <div v-if="clients.length > 0">
    <h2>
      {{ clients[0].clientname }}
    </h2>
    <div class="stats">
      <p>Intern kundid: {{ clientid }}</p>
      <p data-cy="shortname">Kortnamn: {{ clients[0].shortname }}</p>
      <p>Bolagsform: {{ clients[0].corporateform }}</p>
      <p>Bokslut slutar i månad: {{ clients[0].endofyear }}</p>
      <p>Bank: {{ clients[0].bank }}</p>
    </div>
    <div>
      <p class="placeholder-todo">Todo-List</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
const clients: Ref<Client[]> = ref([]);

interface Client {
  clientname: string;
  clientid: number;
  shortname: string;
  endofyear: string;
  corporateform: string;
  bank: string;
  name: string;
}

const route = useRoute();

const clientid = computed<number>(() => {
  return Number(route.params.id);
});

axios
  .get(`/api/client/${clientid.value}`)
  .then((res) => (clients.value = res.data));

watch(
  () => route.params.id,
  async (newID) => {
    axios.get(`/api/client/${newID}`).then((res) => (clients.value = res.data));
  }
);
</script>

<style scoped>
.placeholder-todo {
  width: 80vw;
  height: 70vh;
  background-color: #eee;
}
.stats {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.stats p {
  background-color: #ccc;
  padding: 10px;
  font-size: 20px;
  border-radius: 30px;
}

h2 {
  font-size: 32px;
}

p {
  margin: 4px;
  font-size: 24px;
}
</style>
