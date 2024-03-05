<script setup>
import { defineProps } from 'vue';
import Typo from '@components/typography/Typo.vue';
import Markdown from '@components/typography/Markdown.vue';
import DateBadge from '@components/badges/DateBadge.vue';

const props = defineProps({
  start: { type: String },
  end: { type: String },
  title: { type: String, required: true },
  subtitle: { type: String },
  text: { type: String },
  tags: { type: Array },
});
</script>

<template>
  <div :class="s.wrapper">
    <DateBadge :start="props.start" :end="props.end" />
    <Typo :text="props.title" />
    <Typo v-if="props.subtitle" :text="props.subtitle" />
    <Markdown v-if="props.text" :text="props.text" />
  </div>
</template>

<style module="s" lang="scss">
.wrapper {
}
</style>
