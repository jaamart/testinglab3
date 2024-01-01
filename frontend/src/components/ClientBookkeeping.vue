<template>
  <div class="bookkeeping">
    <h3>Bokföring</h3>
    <div v-if="booksfrequency === 1">
      <div
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

    <div v-else-if="booksfrequency === 3">
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
import { ref, Ref, computed } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
const clients: Ref<Client[]> = ref([]);

defineProps({
  booksfrequency: Number,
});

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

const route = useRoute();

const clientid = computed<number>(() => {
  return Number(route.params.id);
});

axios.get(`/api/client/${clientid.value}`).then((res) => {
  clients.value = res.data;
});

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
  axios.get(`/api/client/${clientid.value}`).then((res) => {
    clients.value = res.data;
  });
}

const clientsOrderedByMonths = computed(() => {
  return clients.value.sort((a, b) => a.monthid - b.monthid);
});

const clientsWithQuarterlyBooks = computed(() => {
  return clients.value
    .sort((a, b) => a.monthid - b.monthid)
    .filter((_, i) => i % 3 === 0);
});
</script>

<style scoped>
button {
  padding: 2px 10px;
  margin-bottom: 10px;
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
    background-color: grey;
  }
}
.booksdone {
  text-decoration: line-through;
  background-color: grey;
  animation: done 2s;
}
h3 {
  font-size: 26px;
}
</style>
