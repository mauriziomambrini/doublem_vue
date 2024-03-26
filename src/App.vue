<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { SpeedInsights } from '@vercel/speed-insights/vue';
import Layout from '@components/layout/Layout.vue';

const route = useRoute();

const currentRouteName = computed(() => route.name || '');
</script>

<template>
  <SpeedInsights />
  <Layout :routeName="currentRouteName">
    <RouterView />
  </Layout>
</template>

<style></style>
