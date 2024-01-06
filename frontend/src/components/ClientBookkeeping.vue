<template>
  <div class="bookkeeping">
    <h3>Bokföring</h3>
    <div v-if="clients.clients[0].booksfrequency === 1">
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

    <div v-else-if="clients.clients[0].booksfrequency === 3">
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
import { ref, computed } from "vue";
import axios from "axios";

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
    .then((res) => {
      console.log(res);
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
  background-color: cadetblue;
}

@keyframes done {
  from {
    text-decoration-color: transparent;
    background-color: cadetblue;
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
