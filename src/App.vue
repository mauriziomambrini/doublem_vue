<script setup>
import { watch, ref } from 'vue';
import { useRoute } from 'vue-router';
import { SpeedInsights } from '@vercel/speed-insights/vue';
import Layout from '@components/layout/Layout.vue';

const route = useRoute();
const currentRouteName = ref(route.name);

watch(
  route,
  (to) => {
    currentRouteName.value = to.name;
  },
  { immediate: true },
);
</script>

<template>
  <SpeedInsights />
  <Layout :routeName="currentRouteName">
    <RouterView />
  </Layout>
</template>

<style></style>
