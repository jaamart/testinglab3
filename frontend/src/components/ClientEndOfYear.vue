<template>
  <div class="endofyear">
    <h3>Bokslut</h3>
    <div v-if="clients.clients[0].corporateform === 'AB'">
      <ul>
        <li :class="{ done: clients.clients[0].isstartdone }">
          Påbörjat
          <button>
            {{ !clients.clients[0].isstartdone ? "Färdig" : "Ångra" }}
          </button>
        </li>
        <li :class="{ done: clients.clients[0].isbooksdone }">
          Bokslut
          <button>
            {{ !clients.clients[0].isbooksdone ? "Färdig" : "Ångra" }}
          </button>
        </li>
        <li :class="{ done: clients.clients[0].isreportdone }">
          Årsredovisning
          <button>
            {{ !clients.clients[0].isreportdone ? "Färdig" : "Ångra" }}
          </button>
        </li>
        <li :class="{ done: clients.clients[0].istaxdone }">
          INK2
          <button>
            {{ !clients.clients[0].istaxdone ? "Färdig" : "Ångra" }}
          </button>
        </li>
        <li>Revision</li>
        <li :class="{ done: clients.clients[0].isreportfiled }">
          Inl. INK2
          <button>
            {{ !clients.clients[0].isreportfiled ? "Färdig" : "Ångra" }}
          </button>
        </li>
        <li :class="{ done: clients.clients[0].istaxfiled }">
          Inl. ÅRS
          <button>
            {{ !clients.clients[0].istaxfiled ? "Färdig" : "Ångra" }}
          </button>
        </li>
      </ul>
    </div>
    <div v-else-if="clients.clients[0].corporateform === 'EF'">
      <ul>
        <li>Påbörjat</li>
        <li>Bokslut</li>
        <li>Deklaration</li>
        <li v-if="clients.clients[0].vatfrequency === 12">Moms</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const clients = defineProps(["clients"]);
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
