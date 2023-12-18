<script setup lang="ts">
import { ref } from "vue";

defineProps<{ msg: string }>();

const test = ref([]);

fetch("/api")
  .then((res) => res.json())
  .then((res) => {
    test.value = res;
  });
</script>

<template>
  <h1>{{ msg }}</h1>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
