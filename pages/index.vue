<script setup lang="ts">
const cookie = useCookie("user");
if (!cookie.value) {
  navigateTo("/login");
}
</script>
<template>Logged in sucessfully!</template>
