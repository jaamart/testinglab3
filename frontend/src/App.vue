<script setup lang="ts">
import ClientList from "./components/ClientList.vue";
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
}

.clientlist {
  width: 250px;
  position: absolute;
  left: 0;
  top: 0;
  height: 100vh;
  background-color: goldenrod;
}
.maincontent {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 250px;
}
</style>
