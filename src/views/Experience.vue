<script setup>
import useGQL from '@composable/useGQL.js';
import Experience from '@gql/experience.gql';
import Markdown from '@components/typography/Markdown.vue';
import Hero from '@components/layout/Hero.vue';
import TimelineItem from '@components/items/TimelineItem.vue';
const { data } = useGQL(Experience);
</script>

<template>
  <Hero
    v-if="data && data.experience && data.experience.text"
    :title="data?.experience.title"
  />
  <Markdown
    v-if="data && data.experience && data.experience.text"
    class="pageContent"
    :text="data?.experience.text"
  />
  <template v-if="data && data.experience">
    <TimelineItem
      v-for="item in data.experience.timeline"
      :key="item.title"
      :start="item.startDate"
      :end="item.endDate"
      :title="item.title"
      :subtitle="item.subtitle"
      :text="item.fullDescription"
    />
  </template>
</template>

<style scoped lang="scss"></style>
