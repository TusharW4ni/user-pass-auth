<script setup lang="ts">
import { ref } from "vue";

const message = ref("Hello, World!");
</script>
<template>
  <h1 class="underline">{{ message }}</h1>
</template>
