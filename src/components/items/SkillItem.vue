<script setup>
import { defineProps } from 'vue';
import { SkillClasses } from '@components/types.js';
import Typo from '@components/typography/Typo.vue';

const props = defineProps({
  icon: { type: String, required: true },
  label: { type: String, required: true },
  classes: { type: Object, default: () => ({}), validator: SkillClasses },
});
</script>

<template>
  <div :class="[s.wrapper, props.classes.wrapper]">
    <img
      :class="[s.icon, props.classes.icon]"
      :src="props.icon"
      :alt="props.label"
    />
    <Typo
      :class="[s.label, props.classes.label]"
      :text="props.label"
      tag="h2"
      size="md"
      weight="regular"
      color="text"
    />
  </div>
</template>

<style module="s" lang="scss">
@import '@styles/mixins';

.wrapper {
  --icon-size: clamp(3rem, 5cqw, 5rem);

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: var(--s-df);
}

.icon {
  width: var(--icon-size);
  height: var(--icon-size);
  min-height: var(--icon-size);
}

.label {
  white-space: nowrap;

  @include media(lg) {
    font-size: clamp(var(--fs-md), 90cqw, var(--fs-xl));
  }
}
</style>
