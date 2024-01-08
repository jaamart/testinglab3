<template>
  <div class="endofyear">
    <h3>Bokslut</h3>
    <div v-if="clients.clients[0].corporateform === 'AB'">
      <ul>
        <li>Bokslut</li>
        <li>Årsredovisning</li>
        <li>INK2</li>
        <li></li>
      </ul>
    </div>
    <div v-else-if="clients.clients[0].corporateform === 'EF'">
      <ul>
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
.endofyear {
  width: 30%;
  background-color: #62b6cb;
}
</style>
