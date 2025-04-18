<script setup>
import { computed, defineProps } from 'vue';
import { LabelBadgeTheme } from '@components/types.js';
import Typo from '@components/typography/Typo.vue';

const props = defineProps({
  theme: { type: String, default: 'default', validator: LabelBadgeTheme },
  label: { type: String },
  class: { type: [String, Array] },
});

const label = computed(() => {
  return props.theme === 'tag' ? `# ${props.label}` : props.label;
});

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
  gap: 0.25em;
  justify-content: center;
  align-items: center;
  padding-inline: 0.75em;
  border-radius: 0.25em;
  background-color: var(--c-bg-d2);
  font-size: var(--fsr-md-lg);
  cursor: inherit;
}

.label {
  font-size: var(--fsr-md-lg);
  line-height: 1.75;
}

// Tag theme
.tag {
  padding: 0.125em 1em;
  border-radius: var(--s-df);
  background-color: var(--c-bg-d);

  .label {
    color: var(--c-text-l);
  }
}
</style>
