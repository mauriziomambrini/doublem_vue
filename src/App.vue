<script setup>
import { watch, ref } from 'vue';
import { useRoute } from 'vue-router';
import Layout from '@components/layout/Layout.vue';

const route = useRoute();
const currentRouteName = ref(route.name);

watch(
  route,
  (to) => {
    // Aggiorna `currentRouteName` con il nome della nuova rotta
    currentRouteName.value = to.name;
  },
  { immediate: true },
);
</script>

<template>
  <Layout :routeName="currentRouteName">
    <RouterView />
  </Layout>
</template>

<style></style>
