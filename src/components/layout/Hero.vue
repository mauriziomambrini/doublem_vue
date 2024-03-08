<script setup>
import { defineProps } from 'vue';
import { HeroTheme } from '@components/types.js';
import Typo from '@components/typography/Typo.vue';

const props = defineProps({
  theme: { type: String, default: 'default', validator: HeroTheme },
  title: { type: String, required: true },
});
</script>

<template>
  <div v-if="props.title" :class="[s.wrapper, s[theme]]">
    <Typo
      v-if="props.theme === 'default'"
      :text="props.title"
      :class="s.bgTitle"
      tag="p"
    />
    <Typo :text="props.title" :class="s.title" tag="h1" />
  </div>
</template>

<style module="s" lang="scss">
.wrapper {
  width: 100%;
}

.title {
  font-weight: var(--fw-bold);
  line-height: 1;

  &::after {
    content: var(--unicode-bullet);
    vertical-align: sub;
    color: var(--c-primary);
  }
}

// If theme 'simple'
.simple {
  .title {
    font-size: clamp(3rem, 25vw, 8vw);
  }
}

// If theme 'default'
.default {
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  overflow: hidden;

  .bgTitle {
    place-self: center;
    font-weight: var(--fw-black);
    font-size: clamp(4.5rem, 25vw, 15vw);
    line-height: 1;
    text-align: center;
    text-transform: uppercase;
    white-space: nowrap;
    color: var(--c-bg-d);
    animation: fade-in-title 4s cubic-bezier(0.075, 0.82, 0.165, 1) forwards;
    overflow: hidden;
    opacity: 0;
  }

  .title {
    position: relative;
    z-index: var(--z-index-1);
    font-size: clamp(3rem, 25vw, 10vw);
    text-align: center;
    animation: slide-up-title 1s cubic-bezier(0.075, 0.82, 0.165, 1) 0.25s
      forwards;
    opacity: 0;
  }
}

@keyframes fade-in-title {
  to {
    opacity: 1;
  }
}

@keyframes slide-up-title {
  to {
    transform: translateY(-50%);
    opacity: 1;
  }
}
</style>
