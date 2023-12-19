<template>
  <p>{{ client.namn }}</p>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const fakeIds = [
  { namn: "test1", id: 1 },
  { namn: "test2", id: 2 },
  { namn: "test3", id: 3 },
];

const clientid = computed(() => {
  return parseInt(route.params.id);
});

const client = computed(() => {
  return fakeIds.find((client) => client.id === clientid.value);
});

console.log(typeof fakeIds[0].id);
console.log(typeof clientid.value);
console.log(client.value);
</script>
