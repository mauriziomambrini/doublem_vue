<script setup>
import useGQL from '@composable/useGQL.js';
import What from '@gql/what.gql';
import Markdown from '@components/typography/Markdown.vue';
import Hero from '@components/layout/Hero.vue';
const { data } = useGQL(What);
</script>

<template>
  <Hero v-if="data && data.what && data.what.text" :title="data?.what.title" />
  <Markdown
    v-if="data?.what && data.what.text"
    class="pageContent"
    :text="data?.what.text"
  />
</template>

<style scoped lang="scss"></style>
