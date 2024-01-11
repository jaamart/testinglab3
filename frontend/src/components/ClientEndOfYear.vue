<template>
  <div class="endofyear">
    <h3>Bokslut</h3>
    <div v-if="activeClient.corporateform === 'AB'">
      <ul>
        <li :class="{ done: activeClient.isstartdone }">
          Påbörjat
          <button @click="markEoyStep()">
            {{ !activeClient.isstartdone ? "Färdig" : "Ångra" }}
          </button>
        </li>
        <li :class="{ done: activeClient.isbooksdone }">
          Bokslut
          <button>
            {{ !activeClient.isbooksdone ? "Färdig" : "Ångra" }}
          </button>
        </li>
        <li :class="{ done: activeClient.isreportdone }">
          Årsredovisning
          <button>
            {{ !activeClient.isreportdone ? "Färdig" : "Ångra" }}
          </button>
        </li>
        <li :class="{ done: activeClient.istaxdone }">
          INK2
          <button>
            {{ !activeClient.istaxdone ? "Färdig" : "Ångra" }}
          </button>
        </li>
        <li v-if="activeClient.hasauditor">
          Revision
          <button>
            {{ !activeClient.istaxdone ? "Färdig" : "Ångra" }}
          </button>
        </li>
        <li :class="{ done: activeClient.isreportfiled }">
          Inl. INK2
          <button>
            {{ !activeClient.isreportfiled ? "Färdig" : "Ångra" }}
          </button>
        </li>
        <li :class="{ done: activeClient.istaxfiled }">
          Inl. ÅRS
          <button>
            {{ !activeClient.istaxfiled ? "Färdig" : "Ångra" }}
          </button>
        </li>
      </ul>
    </div>
    <div v-else-if="activeClient.corporateform === 'EF'">
      <ul>
        <li>Påbörjat</li>
        <li>Bokslut</li>
        <li>Deklaration</li>
        <li v-if="activeClient.vatfrequency === 12">Moms</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
const clients = defineProps(["clients"]);
const activeClient = ref(clients.clients[0]);

watch(
  () => clients.clients[0],
  (newVal) => {
    activeClient.value = newVal;
  }
);

function markEoyStep() {
  console.log(activeClient.value);
}
</script>

<style scoped>
@keyframes done {
  from {
    text-decoration-color: transparent;
    background-color: #62b6cb;
  }
  to {
    text-decoration-color: auto;
    background-color: rgb(128, 128, 128);
  }
}
.done {
  text-decoration: line-through;
  background-color: rgb(128, 128, 128);
  animation: done 2s;
}
.endofyear {
  width: 30%;
  background-color: #62b6cb;
}
li {
  list-style: none;
}
ul {
  padding: 0;
}
</style>
