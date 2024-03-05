<script setup>
import useGQL from '@composable/useGQL.js';
import Education from '@gql/education.gql';
import Markdown from '@components/typography/Markdown.vue';
import Hero from '@components/layout/Hero.vue';
const { data } = useGQL(Education);
</script>

<template>
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
