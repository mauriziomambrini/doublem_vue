<script setup>
import useGQL from '@composable/useGQL.js';
import Why from '@gql/why.gql';
import Markdown from '@components/typography/Markdown.vue';
import Hero from '@components/layout/Hero.vue';
import MetaTags from '@components/utils/MetaTags.vue';
const { data } = useGQL(Why);
</script>

<template>
  <MetaTags
    :title="data?.why?.seo?.title"
    :description="data?.why?.seo?.description"
  />
  <Hero v-if="data?.why?.title" :title="data.why.title" />
  <Markdown v-if="data?.why?.text" :text="data.why.text" />
</template>

<style scoped lang="scss"></style>
