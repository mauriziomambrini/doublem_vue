<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  class: { type: [String, Array] },
});
</script>

<template>
  <div :class="s.wrapper"></div>
</template>

<style module="s" lang="scss">
.wrapper {
}
</style>
