<script setup>
import useGQL from '@composable/useGQL.js';
import About from '@gql/about.gql';
import Markdown from '@components/typography/Markdown.vue';
import Hero from '@components/layout/Hero.vue';
const { data } = useGQL(About);
</script>

<template>
  <Hero
    v-if="data && data.about && data.about.text"
    :title="data?.about.title"
  />
  <Markdown
    v-if="data && data.about && data.about.text"
    class="pageContent"
    :text="data?.about.text"
  />
</template>

<style scoped lang="scss"></style>
