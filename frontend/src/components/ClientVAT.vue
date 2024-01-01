<template>
  <div class="vat">
    <h3>Moms</h3>
    <div v-if="vatfrequency === 1">
      <p>månad</p>
      <div v-for="client in clients">
        {{ client.year }}
        {{ client.monthname }}
        {{ client.isvatdone }}
      </div>
    </div>
    <div v-else-if="vatfrequency === 3">
      <p>kvartal</p>
    </div>
    <div v-else>
      <p>År</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, computed } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
const clients: Ref<Client[]> = ref([]);

defineProps({
  vatfrequency: Number,
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
  isvatdone: boolean;
}

const route = useRoute();

const clientid = computed<number>(() => {
  return Number(route.params.id);
});

axios.get(`/api/client/${clientid.value}`).then((res) => {
  clients.value = res.data;
});
</script>

<style scope>
button {
  padding: 5px 10px;
  margin-bottom: 10px;
}
.vat {
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
.vatdone {
  text-decoration: line-through;
  background-color: grey;
  animation: done 2s;
}
h3 {
  font-size: 26px;
}
</style>
