<script setup>
import useGQL from '@composable/useGQL.js';
import Experience from '@gql/experience.gql';
import Markdown from '@components/typography/Markdown.vue';
import Hero from '@components/layout/Hero.vue';
import TimelineItem from '@components/items/TimelineItem.vue';
import MetaTags from '@components/utils/MetaTags.vue';
import Divider from '@components/utils/Divider.vue';
const { data } = useGQL(Experience);
</script>

<template>
  <MetaTags
    :title="data?.experience?.seo?.title"
    :description="data?.experience?.seo?.description"
  />
  <Hero v-if="data?.experience?.text" :title="data?.experience.title" />
  <Markdown v-if="data?.experience?.text" :text="data?.experience.text" />
  <Divider :spacing="[1]" />
  <div v-if="data?.experience">
    <TimelineItem
      v-for="item in data.experience.timeline"
      :key="item.title"
      :start="item.startDate"
      :end="item.endDate"
      :title="item.title"
      :subtitle="item.subtitle"
      :text="item.fullDescription"
      :tags="item.tags"
    />
  </div>
</template>

<style scoped lang="scss"></style>
