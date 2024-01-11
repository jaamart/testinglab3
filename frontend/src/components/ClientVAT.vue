<template>
  <div class="vat">
    <h3>Moms</h3>

    <div v-if="activeClient.vatfrequency === 1">
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

    <div v-else-if="activeClient.vatfrequency === 3">
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
    <div v-if="clients.clients[0].vatfrequency === 12">Görs i bokslutet</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import axios from "axios";

const clients = defineProps(["clients"]);
const clientsQuarterly = ref(clients);
const activeClient = ref(clients.clients[0]);

watch(
  () => clientsQuarterly.value.clients[0],
  (newVal) => {
    activeClient.value = newVal;
  }
);

interface Client {
  clientid: number;
  vatfrequency: number;
  monthid: number;
  isvatdone: boolean;
}

function markVAT(client: Client) {
  client.isvatdone = !client.isvatdone;
  axios
    .put("/api/client/vat", {
      id: client.clientid,
      monthId: client.monthid,
      done: client.isvatdone,
      vatfreq: client.vatfrequency,
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
