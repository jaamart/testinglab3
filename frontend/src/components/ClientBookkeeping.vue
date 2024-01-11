<template>
  <div class="bookkeeping">
    <h3>Bokföring</h3>
    <div v-if="activeClient.booksfrequency === 1">
      <div
        data-cy="test-div"
        v-for="client in clientsOrderedByMonths"
        :class="{ booksdone: client.isbookkeepingdone }"
        :key="client.monthid"
      >
        {{ client.year }}
        {{ client.monthname }}
        <button @click="markBookkeeping(client)">
          {{ !client.isbookkeepingdone ? "Färdig" : "Ångra" }}
        </button>
      </div>
    </div>

    <div v-else-if="activeClient.booksfrequency === 3">
      <div
        v-for="(client, index) in clientsWithQuarterlyBooks"
        :class="{ booksdone: client.isbookkeepingdone }"
        :key="client.monthid"
      >
        {{ client.year }}
        Kvartal {{ index + 1 }}
        <button @click="markBookkeeping(client)">
          {{ !client.isbookkeepingdone ? "Färdig" : "Ångra" }}
        </button>
      </div>
    </div>
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
  booksfrequency: number;
  monthid: number;
  isbookkeepingdone: boolean;
}

function markBookkeeping(client: Client) {
  client.isbookkeepingdone = !client.isbookkeepingdone;
  axios
    .put("/api/client/books", {
      id: client.clientid,
      monthId: client.monthid,
      done: client.isbookkeepingdone,
      booksfreq: client.booksfrequency,
    })
    .catch((error) => {
      console.error(error);
    });
}

const clientsOrderedByMonths = computed(() => {
  return clientsQuarterly.value.clients.sort(
    (a: Client, b: Client) => a.monthid - b.monthid
  );
});

const clientsWithQuarterlyBooks = computed(() => {
  return clientsQuarterly.value.clients
    .sort((a: Client, b: Client) => a.monthid - b.monthid)
    .filter((_: Client, i: number) => i % 3 === 0);
});
</script>

<style scoped>
button {
  padding: 2px 10px;
}
.bookkeeping {
  width: 30%;
  background-color: #619b8a;
}

@keyframes done {
  from {
    text-decoration-color: transparent;
    background-color: #619b8a;
  }
  to {
    text-decoration-color: auto;
    background-color: rgb(128, 128, 128);
  }
}
.booksdone {
  text-decoration: line-through;
  background-color: rgb(128, 128, 128);
  animation: done 2s;
}
h3 {
  font-size: 26px;
}
</style>
