<script setup>
import useGQL from '@composable/useGQL.js';
import Privacy from '@gql/privacy.gql';
import Markdown from '@components/typography/Markdown.vue';
import Hero from '@components/layout/Hero.vue';
const { data } = useGQL(Privacy);
</script>

<template>
  <Hero
    v-if="data && data.privacy && data.privacy.text"
    :title="data?.privacy.title"
    theme="page"
  />
  <Markdown
    v-if="data && data.privacy && data.privacy.text"
    class="pageContent"
    :text="data?.privacy.text"
  />
</template>

<style scoped lang="scss"></style>
