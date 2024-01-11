<template>
  <div v-if="clients.length > 0">
    <h2>
      {{ clients[0].clientname }}
    </h2>
    <div class="stats">
      <div class="info">
        Internt kundid: <strong>{{ clientid }} </strong>
      </div>
      <div class="info" data-cy="shortname">
        Kortnamn: <strong> {{ clients[0].shortname }}</strong>
      </div>
      <div class="info" data-cy="corporateform">
        Bolagsform: <strong> {{ clients[0].corporateform }} </strong>
      </div>
      <div class="info" data-cy="endofyear">
        Bokslut slutar i månad: <strong> {{ clients[0].endofyear }} </strong>
      </div>
      <div class="info" data-cy="bank">
        Bank: <strong> {{ clients[0].bank }} </strong>
      </div>
      <div class="info" data-cy="booksfrequency">
        Bokförs varje
        <strong>
          {{ clients[0].booksfrequency === 1 ? "månad" : "kvartal" }}
        </strong>
      </div>
      <div class="info" data-cy="vatfrequency">
        Moms redovisas varje
        <strong>
          {{
            clients[0].vatfrequency === 1
              ? "månad"
              : clients[0].vatfrequency === 3
              ? "kvartal"
              : "år"
          }}
        </strong>
      </div>
      <button data-cy="delete" class="remove" @click="removeClient">
        Ta bort kund
      </button>
    </div>

    <div class="todo">
      <ClientTodoBookkeeping :clients="clients" />
      <ClientTodoVAT :clients="clients" />
      <ClientTodoEndOfYear :clients="clients" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import ClientTodoBookkeeping from "./ClientTodoBookkeeping.vue";
import ClientTodoVAT from "./ClientTodoVAT.vue";
import ClientTodoEndOfYear from "./ClientTodoEndOfYear.vue";
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

<style>
.donebtn {
  background-color: #eee;
  padding: 2px 10px;
  margin-bottom: 4px;
}
h2 {
  font-size: 32px;
}
h3 {
  font-size: 26px;
}
.info {
  margin: 4px;
  background-color: #ddd;
  padding: 5px 10px;
  font-size: 20px;
  border-radius: 30px;
}
.remove {
  margin: 4px;
  background-color: #ccc;
  padding: 5px 10px;
  font-size: 20px;
  border-radius: 30px;
  background-color: darkred;
  color: #ccc;
}
.stats {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.todo {
  width: 100%;
  height: 70vh;
  background-color: #ddd;
  display: flex;
  justify-content: space-around;
  border-radius: 10px;
}
</style>
