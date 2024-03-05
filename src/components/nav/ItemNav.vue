<script setup>
import { defineProps } from 'vue';
import { useI18n } from 'vue-i18n';
const { locale } = useI18n();
import Icon from '@components/utils/Icon.vue';
import Typo from '@components/typography/Typo.vue';
import { ItemNavTheme } from '@components/types.js';

const props = defineProps({
  theme: { type: String, default: 'desktop', validator: ItemNavTheme },
  to: { type: String, required: true },
  target: { type: String },
  icon: String,
  label: String,
});
</script>

<template>
  <RouterLink
    :to="`/${locale + props.to}`"
    :class="[s.wrapper, { [s[theme]]: true }]"
    :target="props.target"
  >
    <Icon v-if="icon" :class="s.icon" :src="props.icon" />
    <Typo v-if="label" :class="s.label" :text="props.label" />
  </RouterLink>
</template>

<style module="s" lang="scss">
@import '@styles/mixins';
.wrapper {
  --lw-icon: var(--s-xl);
  --lfs-label: var(--fs-xs);
  display: flex;
  position: relative;

  transition: var(--transition-025);
  cursor: pointer;
}

.icon,
.label {
  position: relative;
  z-index: var(--z-index-2);
}

.icon {
  width: var(--lw-icon);
  min-width: var(--lw-icon);
  height: var(--lw-icon);
}

.label {
  font-size: var(--lfs-label);
  text-align: center;
}

// Mobile and Desktop theme
.mobile,
.desktop {
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--s-us);
}

// Desktop theme
.desktop {
  --lw-icon: var(--s-xxl);
  --lfs-label: var(--fs-sm);

  width: 5rem;
  height: 4rem;
}

.desktop::after {
  content: '';
  display: block;
  position: absolute;
  inset: 0;
  z-index: var(--z-index-1);
  border-radius: var(--s-xxs);
  scale: 0;
  opacity: 0;
  transition: var(--transition-025);
}

.desktop:active::after,
.desktop:hover::after {
  background: var(--c-bg-d2);
  animation: click 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes click {
  to {
    scale: 1;
    opacity: 1;
  }
}

// Page theme
.page {
  --lw-icon: var(--s-xxl);
  --lfs-label: var(--fs-xl);
}
</style>
