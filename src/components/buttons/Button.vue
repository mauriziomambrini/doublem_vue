<script setup>
import { computed, defineProps } from 'vue';
import Typo from '@components/typography/Typo.vue';
import Icon from '@components/utils/Icon.vue';
import {
  ButtonClasses,
  ButtonIconPosition,
  ButtonSize,
  ButtonTheme,
} from '@components/types.js';

const props = defineProps({
  theme: { type: String, default: 'fill', validator: ButtonTheme },
  size: { type: String, default: 'df', validator: ButtonSize },
  icon: { type: String },
  iconPosition: {
    type: String,
    default: 'before',
    validator: ButtonIconPosition,
  },
  label: { type: String },
  color: { type: String, default: 'var(--c-text)' },
  labelColor: { type: String, default: 'var(--c-white)' },
  click: { type: Function },
  disabled: { type: Boolean },
  classes: { type: Object, default: () => ({}), validator: ButtonClasses },
});

const style = computed(() => ({
  '--color': props.color,
  '--color-label': props.labelColor,
}));
</script>

<template>
  <div
    :class="[
      props.classes.wrapper,
      s.wrapper,
      s[props.theme],
      s[props.size],
      s[props.iconPosition],
      {
        [s.disabled]: props.disabled,
      },
    ]"
    :style="style"
    @click="props.click"
  >
    <Icon
      v-if="props.icon"
      :class="[s.icon, props.classes.icon]"
      :src="props.icon"
    />
    <div v-if="props.label" :class="[props.classes.content, s.content]">
      <Typo :class="[props.classes.label, s.label]" :text="props.label" />
    </div>
  </div>
</template>

<style module="s" lang="scss">
//Not use directly variables that come from props to enabled override
.wrapper {
  --lc-bg: var(--color);
  --lc-label: var(--color-label);
  --lw-icon: 1em;
  --lfs-label: var(--fs-df);
  --lp-content: 0.5em;

  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: var(--label);
  transition: var(--transition-025);
  cursor: pointer;
  appearance: none;

  &:focus {
    outline: none;
  }

  &::-moz-focus-inner {
    border: 0;
  }
}

.icon {
  width: var(--lw-icon);
  min-width: var(--lw-icon);
  height: var(--lw-icon);
  fill: var(--lc-label);
  transition: var(--transition-025);
}

.content {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-inline: var(--lp-content);
}

.label {
  font-size: var(--lfs-label);
  color: var(--lc-label);
  transition: var(--transition-025);
}

// If iconPosition 'before'
.before {
  flex-direction: row;
}

// If iconPosition 'after'
.after {
  flex-direction: row-reverse;
}

// If size 'df'
.df {
  --lp-block: 0.75em;
  --lp-inline: 1em;
}

// If size 'lg'
.lg {
  --lfs-label: var(--fs-lg);
  --lp-block: 1.25em;
  --lp-inline: 1.5em;
}

// If theme 'fill'
.fill {
  padding-block: var(--lp-block);
  padding-inline: var(--lp-inline);
  background-color: var(--lc-bg);
  border-radius: 0.375em;
}

// If theme 'outline'
.outline {
  --lc-label: var(--lc-bg);

  padding-block: var(--lp-block);
  padding-inline: var(--lp-inline);
  border: 1px solid var(--lc-bg);
  border-radius: 0.375em;
}

// If theme 'text'
.text {
  --lc-label: var(--lc-bg);
  --lp-inline: 0;
  --lp-block: 0;
}

// If hover
.fill:active,
.fill:hover {
  --lc-bg: var(--c-black);
  --lc-label: var(--c-white);
}

.outline:active,
.outline:hover {
  --lc-bg: var(--c-black);
  --lc-label: var(--c-white);

  background-color: var(--lc-bg);
}

.text:active,
.text:hover {
  --lc-bg: var(--c-black);
}

// If disabled
.disabled {
  --lc-bg: var(--c-text);

  opacity: 0.5;
  pointer-events: none;
}
</style>
