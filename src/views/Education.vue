<script setup>
import useGQL from '@composable/useGQL.js';
import Education from '@gql/education.gql';
import Markdown from '@components/typography/Markdown.vue';
import Hero from '@components/layout/Hero.vue';
import MetaTags from '@components/utils/MetaTags.vue';
const { data } = useGQL(Education);
</script>

<template>
  <MetaTags
    :title="data?.education?.seo?.title"
    :description="data?.education?.seo?.description"
  />
  <Hero
    v-if="data && data.education && data.education.text"
    :title="data?.education.title"
  />
  <Markdown
    v-if="data && data.education && data.education.text"
    class="pageContent"
    :text="data?.education.text"
  />
</template>

<style scoped lang="scss"></style>
