<script setup>
import useGQL from '@composable/useGQL.js';
import Privacy from '@gql/privacy.gql';
import Markdown from '@components/typography/Markdown.vue';
import Hero from '@components/layout/Hero.vue';
import MetaTags from '@components/utils/MetaTags.vue';
const { data } = useGQL(Privacy);
</script>

<template>
  <MetaTags />
  <Hero
    v-if="data && data.privacy && data.privacy.text"
    :title="data?.privacy.title"
    theme="simple"
  />
  <Markdown
    v-if="data && data.privacy && data.privacy.text"
    :text="data?.privacy.text"
  />
</template>

<style scoped lang="scss"></style>
