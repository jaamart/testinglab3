<template>
  <h2>Add-a-client-form</h2>
  <form class="form" @submit.prevent="addClient">
    <label>
      Hela namnet
      <input
        data-cy="client-name"
        type="text"
        placeholder="Älvstaden Redovisning AB"
        v-model="clientname"
      />
    </label>
    <label>
      Kortare namn
      <input
        data-cy="client-shortname"
        type="text"
        v-model="clientshortname"
        placeholder="ÄRAB"
      />
    </label>
    <label>
      Internt id-nummer
      <input
        data-cy="client-id"
        type="text"
        v-model="clientid"
        placeholder="135"
      />
    </label>

    <label>
      Kundens bank
      <input
        data-cy="client-bank"
        type="text"
        v-model="clientbank"
        placeholder="Nordea"
      />
    </label>
    <label>
      Bokslutsdatum
      <input
        data-cy="client-endofyear"
        type="text"
        v-model="clienteoy"
        placeholder="12"
      />
    </label>
    <button type="submit">Lägg till i databasen</button>
    {{ clients }}
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";

const clientname = ref("");
const clientshortname = ref("");
const clientid = ref("");
const clientbank = ref("");
const clienteoy = ref("");

const clients = ref({});

axios.get("/api/clients").then((res) => (clients.value = res.data));

function addClient() {
  console.log("skickar data");
  axios
    .post("/api/clients", {
      id: 122,
      name: "test",
      shortname: "test",
      bank: "seb",
      endofyear: 12,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
}
</style>
