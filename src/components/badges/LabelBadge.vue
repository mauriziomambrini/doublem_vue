<script setup>
import { defineProps } from 'vue';
import { LabelBadgeTheme } from '@components/types.js';
import Typo from '@components/typography/Typo.vue';

const props = defineProps({
  theme: { type: String, default: 'default', validator: LabelBadgeTheme },
  label: { type: String },
  class: { type: [String, Array] },
});

const label =
  props.theme === 'tag' ? ['#', props.label].join(' ') : props.label;
</script>

<template>
  <div :class="[props.class, s.wrapper, s[theme]]">
    <Typo :class="s.label" :text="label" tag="span" color="var(--c-text)" />
  </div>
</template>

<style module="s" lang="scss">
.wrapper {
  --lw-icon: var(--s-df);

  width: fit-content;
  min-width: fit-content;
  display: flex;
  gap: 0.25rem;
  justify-content: center;
  align-items: center;
  padding-inline: 0.5rem;
  border-radius: 0.25em;
  background-color: var(--c-bg-d2);
  cursor: inherit;
}

.label {
  font-size: clamp(var(--fs-sm), 15vw, var(--fs-df));
  line-height: 1.5;
}

// Tag theme
.tag {
  padding: 0.125em 0.75em;
  border-radius: var(--s-df);
  background-color: var(--c-primary-l);

  .label {
    color: var(--c-primary);
    font-size: clamp(var(--fs-md), 4.5vw, var(--fs-lg));
  }
}
</style>
