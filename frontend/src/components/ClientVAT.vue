<template>
  <div class="vat">
    <h3>Moms</h3>

    <div v-if="clients.clients[0].vatfrequency === 1">
      <div
        data-cy="test-div"
        v-for="client in clients.clients"
        :class="{ vatdone: client.isvatdone }"
        :key="client.monthid"
      >
        {{ client.year }}
        {{ client.monthname }}
        <button @click="markVAT(client)">
          {{ !client.isvatdone ? "Färdig" : "Ångra" }}
        </button>
      </div>
    </div>

    <div v-else-if="clients.clients[0].vatfrequency === 3">
      <div
        v-for="(client, index) in clientsWithQuarterlyVAT"
        :class="{ vatdone: client.isvatdone }"
        :key="client.monthid"
      >
        {{ client.year }}
        Kvartal {{ index + 1 }}
        <button @click="markVAT(client)">
          {{ !client.isvatdone ? "Färdig" : "Ångra" }}
        </button>
      </div>
    </div>
    <div v-if="clients.clients[0].vatfrequency === 12"></div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { computed, ref } from "vue";

const clients = defineProps(["clients"]);
const clientsQuarterly = ref(clients);

interface Client {
  clientname: string;
  clientid: number;
  shortname: string;
  endofyear: string;
  corporateform: string;
  booksfrequency: number;
  bank: string;
  name: string;
  monthname: string;
  monthid: number;
  year: string;
  isbookkeepingdone: boolean;
  isvatdone: boolean;
}

function markVAT(client: Client) {
  client.isvatdone = !client.isvatdone;
  axios
    .put("/api/client/vat", {
      id: client.clientid,
      monthId: client.monthid,
      done: client.isvatdone,
      vatfreq: client.booksfrequency,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.error(error);
    });
}

const clientsWithQuarterlyVAT = computed(() => {
  return clientsQuarterly.value.clients
    .sort((a: Client, b: Client) => a.monthid - b.monthid)
    .filter((_: Client, i: number) => i % 3 === 0);
});
</script>

<style scope>
button {
  padding: 2px 10px;
  margin-bottom: 10px;
}
.vat {
  width: 30%;
  background-color: #f4b942;
}

@keyframes done {
  from {
    text-decoration-color: transparent;
    background-color: #f4b942;
  }
  to {
    text-decoration-color: auto;
    background-color: rgb(128, 128, 128);
  }
}
.vatdone {
  text-decoration: line-through;
  background-color: rgb(128, 128, 128);
  animation: done 2s;
}
h3 {
  font-size: 26px;
}
</style>
