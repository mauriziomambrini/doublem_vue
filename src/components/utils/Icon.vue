<script setup>
import { defineProps } from 'vue';
import InlineSvg from 'vue-inline-svg';
const props = defineProps({
  src: { type: String, required: true },
  size: { type: Array, default: [4] },
  color: { type: String, default: 'var(--c-icon)' },
  click: Function,
  class: { type: [String, Array] },
});

const width = props.size[0] + 'rem';
const height = props.size[1] || props.size[0] + 'rem';
</script>

<template>
  <inline-svg
    :src="props.src"
    :class="props.class"
    :width="width"
    :height="height"
    :fill="props.color"
    @click="props.click"
  />
</template>
