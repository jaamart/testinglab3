<template>
  <div class="card">
    <h2>Lägg till kund eller klicka på en i listan till vänster</h2>
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
        Bolagsform
        <input
          data-cy="client-form"
          type="text"
          v-model="clientCorpForm"
          placeholder="AB"
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
      <label>
        Bokföringsintervall
        <input
          data-cy="client-booksfreq"
          type="text"
          v-model="clientbooksfreq"
          placeholder="1 för månad, 3 för kvartal"
        />
      </label>
      <label>
        Momsredovisningsperiod
        <input
          data-cy="client-vatfreq"
          type="text"
          v-model="clientvatfreq"
          placeholder="1 för månad, 3 för kvartal, 12 för år"
        />
      </label>
      <button data-cy="add-client" type="submit">Lägg till i databasen</button>
    </form>

    <div v-if="addedClient">
      <h2>Inlagd kund</h2>
      <div data-cy="incoming-client-name">
        {{ addedClient.newClient.clientname }}
      </div>
      <div data-cy="incoming-client-shortname">
        {{ addedClient.newClient.shortname }}
      </div>
      <div data-cy="incoming-client-id">
        {{ addedClient.newClient.clientid }}
      </div>
      <div data-cy="incoming-client-corpform">
        {{ addedClient.newClient.corporateform }}
      </div>
      <div data-cy="incoming-client-bank">{{ addedClient.newClient.bank }}</div>
      <div data-cy="incoming-client-endofyear">
        {{ addedClient.newClient.endofyear }}
      </div>
      <div data-cy="incoming-client-booksfreq">
        {{ addedClient.newClient.booksfrequency }}
      </div>
      <div data-cy="incoming-client-vatfreq">
        {{ addedClient.newClient.vatfrequency }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";

const clientname = ref("");
const clientshortname = ref("");
const clientid = ref(0);
const clientCorpForm = ref("");
const clientbank = ref("");
const clienteoy = ref(0);
const clientbooksfreq = ref("");
const clientvatfreq = ref("");
const addedClient = ref();
const clients = ref([]);

axios.get("/api/clients").then((res) => (clients.value = res.data));

function addClient() {
  axios
    .post("/api/clients", {
      id: clientid.value,
      name: clientname.value,
      shortname: clientshortname.value,
      corpform: clientCorpForm.value,
      bank: clientbank.value,
      endofyear: clienteoy.value,
      booksfrequency: clientbooksfreq.value,
      vatfrequency: clientvatfreq.value,
    })
    .then((res) => {
      console.log(res);
      addedClient.value = res.data;
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
  padding: 40px;
}

.card {
  background-color: #ddd;
  border-radius: 15px;
}

button {
  background-color: olivedrab;
  border: 0;
  margin: 20px;
}

button:hover {
  background-color: olive;
  box-shadow: 5px 5px 15px black;
}

input[type="text"] {
  width: 100%;
}

label {
  text-align: left;
}
</style>
