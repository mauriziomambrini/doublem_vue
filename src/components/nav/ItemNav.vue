<script setup>
import { defineProps } from 'vue';
import { useI18n } from 'vue-i18n';
const { locale } = useI18n();
import * as ICONS from '@icons';
import Icon from '@components/utils/Icon.vue';
import Typo from '@components/typography/Typo.vue';
import { ItemNavClasses, ItemNavTheme } from '@components/types.js';

const props = defineProps({
  theme: { type: String, default: 'desktop', validator: ItemNavTheme },
  to: { type: String, required: true },
  target: { type: String },
  icon: { type: String },
  label: { type: String },
  active: { type: Boolean },
  classes: { type: Object, default: () => ({}), validator: ItemNavClasses },
});
</script>

<template>
  <RouterLink
    :to="`/${locale + props.to}`"
    :class="[
      props.classes.wrapper,
      s.wrapper,
      s[props.theme],
      { [s.active]: props.active },
    ]"
    :target="props.target"
  >
    <Icon v-if="icon" :class="[props.classes.icon, s.icon]" :src="props.icon" />
    <Typo
      v-if="label"
      :class="[props.classes.label, s.label]"
      :text="props.label"
    />
    <Icon
      v-if="theme === 'page'"
      :class="s.arrow"
      :src="ICONS.arrowAngleRight"
    />
  </RouterLink>
</template>

<style module="s" lang="scss">
@import '@styles/mixins';
.wrapper {
  --lc-item: var(--c-text);
  --lw-icon: var(--s-xl);
  --lfs-label: var(--fs-xs);
  --lw-arrow: var(--s-sm);
  display: flex;
  position: relative;

  transition: var(--transition-025);
  cursor: pointer;
}

.wrapper:focus:not(:focus-visible) {
  outline: 0;
  outline-offset: 0.25rem;
}

.icon,
.label {
  position: relative;
  z-index: var(--z-index-2);
  transition: var(--transition-025);
}

.icon {
  width: var(--lw-icon);
  min-width: var(--lw-icon);
  height: var(--lw-icon);
  fill: var(--lc-item);
}

.label {
  font-size: var(--lfs-label);
  color: var(--lc-item);
  text-align: center;
}

.arrow {
  width: var(--lw-arrow);
  min-width: var(--lw-arrow);
  height: var(--lw-arrow);
  fill: var(--c-text);

  @include media(noTouch) {
    display: none;
  }
}

// Active
.active {
  --lc-item: var(--c-primary);

  .label {
    text-shadow:
      0 0 0.05em var(--c-primary),
      0 0 0.05em var(--c-primary);
  }
}

// Mobile and Desktop theme
.mobile,
.desktop {
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--s-us);
}

// Mobile theme
.mobile {
  width: 100%;
  height: 100%;
}

// Desktop theme
.desktop {
  --lw-icon: var(--s-xxl);
  --lfs-label: var(--fs-sm);

  width: 5rem;
  height: 4rem;
}

.desktop::before {
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

@include media(noTouch) {
  .desktop:active::before,
  .desktop:hover::before {
    background: var(--c-bg-d);
    animation: click 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }
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

  align-items: center;
  column-gap: 1rem;
  padding: 1em 0;
  box-shadow: var(--sw-inset-bottom);
  transition: var(--transition-025);

  .label {
    margin-right: auto;
  }
}

.page::before {
  content: '';
  display: block;
  position: absolute;
  left: -0.5rem;
  right: -0.5rem;
  top: 0;
  bottom: 0;
  z-index: var(--z-index-0);
  border-radius: var(--s-xxs);
  transition: var(--transition-025);
}

.page:active::before,
.page:hover::before {
  background: var(--c-bg-d);
}

// Tab focus
.desktop:focus-visible,
.page:focus-visible {
  outline: 0.125em solid var(--c-primary);
  border-radius: var(--s-xxs);
  box-shadow: none;
}

.desktop:focus-visible {
  outline-offset: 0.125rem;
}

.page:focus-visible {
  outline-offset: 0.25rem;
}
</style>
