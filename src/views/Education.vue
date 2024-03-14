<script setup>
import useGQL from '@composable/useGQL.js';
import Education from '@gql/education.gql';
import Markdown from '@components/typography/Markdown.vue';
import Hero from '@components/layout/Hero.vue';
import MetaTags from '@components/utils/MetaTags.vue';
import TimelineItem from '@components/items/TimelineItem.vue';
const { data } = useGQL(Education);
</script>

<template>
  <MetaTags
    :title="data?.education?.seo?.title"
    :description="data?.education?.seo?.description"
  />
  <Hero v-if="data?.education?.text" :title="data.education.title" />
  <Markdown v-if="data?.education?.text" :text="data?.education.text" />
  <div v-if="data?.education">
    <TimelineItem
      v-for="item in data.education.timeline"
      :key="item.title"
      :start="item.startDate"
      :end="item.endDate"
      :title="item.title"
      :subtitle="item.subtitle"
      :text="item.fullDescription"
    />
  </div>
</template>

<style scoped lang="scss"></style>
