<script setup lang="ts">
import ClientList from "./components/ClientList.vue";

// -[] inlogg
// -[] årsmoms
// -[] lägg till ett år
// -[] översiktssidor
</script>

<template>
  <div class="wrapper">
    <div class="clientlist">
      <ClientList />
    </div>
    <div class="maincontent">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.clientlist {
  width: 250px;
  position: absolute;
  left: 0;
  top: 0;
  height: 100vh;
  background-color: #f4b942;
}
.maincontent {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 250px;
}
</style>
