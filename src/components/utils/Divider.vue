<script setup>
import { computed, defineProps } from 'vue';
import { DividerTheme } from '@components/types.js';

const props = defineProps({
  theme: { type: String, default: 'lineH', validator: DividerTheme },
  spacing: { type: Array, default: [1.5] },
  color: { type: String, default: 'var(--c-bg-d2)' },
});

const style = computed(() => ({
  '--lm-top': props.spacing[0] + 'rem',
  '--lm-bottom': props.spacing[1] ?? props.spacing[0] + 'rem',
  '--lc-border': props.color,
}));
</script>

<template>
  <div :class="[s.wrapper, { [s[theme]]: true }]" :style="style">
    <div v-if="theme !== 'space'" :class="s.border" />
  </div>
</template>

<style module="s" lang="scss">
.wrapper {
  --lw-border: 100%;
  --lh-border: 1px;

  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.border {
  width: var(--lw-border);
  height: var(--lh-border);
  background: var(--lc-border);
}

// SpaceH or LineH theme
.spaceH,
.lineH {
  width: 100%;
  margin-top: var(--lm-top);
  margin-bottom: var(--lm-bottom);

  .border {
    flex: 1;
  }
}

// SpaceV or LineV theme
.spaceV,
.lineV {
  --lw-border: 1px;
  --lh-border: 100%;

  width: fit-content;
  align-self: stretch;
  margin-left: var(--lm-top);
  margin-right: var(--lm-bottom);
}
</style>
