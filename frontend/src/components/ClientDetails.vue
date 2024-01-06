<template>
  <div v-if="clients.length > 0">
    <h2>
      {{ clients[0].clientname }}
    </h2>
    <div class="stats">
      <div class="info">Internt kundid: {{ clientid }}</div>
      <div class="info" data-cy="shortname">
        Kortnamn: {{ clients[0].shortname }}
      </div>
      <div class="info" data-cy="corporateform">
        Bolagsform: {{ clients[0].corporateform }}
      </div>
      <div class="info" data-cy="endofyear">
        Bokslut slutar i månad: {{ clients[0].endofyear }}
      </div>
      <div class="info" data-cy="bank">Bank: {{ clients[0].bank }}</div>
      <div class="info" data-cy="booksfrequency">
        Bokförs varje
        {{ clients[0].booksfrequency === 1 ? "månad" : "kvartal" }}
      </div>
      <div class="info" data-cy="vatfrequency">
        Moms redovisas varje
        {{
          clients[0].vatfrequency === 1
            ? "månad"
            : clients[0].vatfrequency === 3
            ? "kvartal"
            : "år"
        }}
      </div>
      <button class="remove" @click="removeClient">Ta bort kund</button>
    </div>

    <div class="placeholder-todo">
      <ClientBookkeeping :clients="clients" />
      <ClientVAT :clients="clients" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, computed, watch } from "vue";
import ClientBookkeeping from "./ClientBookkeeping.vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import ClientVAT from "./ClientVAT.vue";
const clients: Ref<Client[]> = ref([]);

interface Client {
  clientname: string;
  clientid: number;
  shortname: string;
  endofyear: string;
  corporateform: string;
  booksfrequency: number;
  vatfrequency: number;
  bank: string;
  name: string;
  monthname: string;
  monthid: number;
  year: string;
  isbookkeepingdone: boolean;
}

const route = useRoute();
const router = useRouter();

const clientid = computed<number>(() => {
  return Number(route.params.id);
});

axios.get(`/api/client/${clientid.value}`).then((res) => {
  clients.value = res.data;
});

watch(
  () => route.params.id,
  async (newID) => {
    axios.get(`/api/client/${newID}`).then((res) => (clients.value = res.data));
  }
);

function removeClient() {
  console.log("removing", clientid.value);
  confirm("Är du säker? Detta går inte att ångra!");
  axios
    .delete(`/api/delete/${clientid.value}`, {
      data: {
        id: clientid.value,
      },
    })
    .then(() => {
      router.push("/");
    });
}
</script>

<style scoped>
h2 {
  font-size: 32px;
}
.placeholder-todo {
  width: 80vw;
  height: 70vh;
  background-color: #eee;
  display: flex;
  justify-content: space-around;
}

.stats {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.stats div {
  margin: 4px;
  background-color: #ccc;
  padding: 10px;
  font-size: 20px;
  border-radius: 30px;
}

.remove {
  margin: 4px;
  background-color: #ccc;
  padding: 10px;
  font-size: 20px;
  border-radius: 30px;
  background-color: darkred;
  color: #ccc;
}
</style>
