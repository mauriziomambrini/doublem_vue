<script setup>
import useGQL from '@composable/useGQL.js';
import What from '@gql/what.gql';
import Markdown from '@components/typography/Markdown.vue';
import Hero from '@components/layout/Hero.vue';
import MetaTags from '@components/utils/MetaTags.vue';
import WorkItem from '@components/items/WorkItem.vue';
import Divider from '@components/utils/Divider.vue';
const { data } = useGQL(What);
</script>

<template>
  <MetaTags
    :title="data?.what?.seo?.title"
    :description="data?.what?.seo?.description"
  />
  <Hero v-if="data?.what?.title" :title="data.what.title" />
  <Markdown v-if="data?.what?.text" :text="data.what.text" />

  <template v-if="data?.what" v-for="item in data.what.works" :key="item.title">
    <Divider :spacing="[1]" />
    <WorkItem
      :start="item.startDate"
      :end="item.endDate"
      :title="item.title"
      :text="item.fullDescription"
      :gallery="item.gallery"
      :tags="item.tags"
    />
  </template>
</template>

<style scoped lang="scss"></style>
