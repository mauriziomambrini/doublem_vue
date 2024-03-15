<script setup>
import { defineProps } from 'vue';

import Nav from '@components/nav/Nav.vue';

const props = defineProps({
  routeName: { type: String },
});
</script>

<template>
  <a href="#main" :class="s.skipLink"> Skip to content </a>
  <Nav v-if="props.routeName !== 'not-found'" />
  <main :class="[s.main, s[props.routeName]]" id="main">
    <slot />
  </main>
</template>

<style lang="scss">
@import '@styles/mixins';

div#app {
  height: 100dvh;
  display: flex;
  flex-direction: column;
}

main > *:not(#hero_default) {
  width: 100%;
  max-width: var(--w-max-xs);
  margin-inline: auto;

  @include media(lg) {
    max-width: var(--w-max-sm);
  }

  @include media(xl) {
    max-width: var(--w-max-df);
  }
}

// Visually hidden: Hides content except when viewed by screen readers
.visuallyHidden {
  width: 1px;
  height: 1px;
  position: absolute;
  clip: rect(1px, 1px, 1px, 1px);
  white-space: nowrap;
  overflow: hidden;
}
</style>

<style module="s" lang="scss">
@import '@styles/mixins';
.main {
  display: flex;
  flex: 1;
  flex-direction: column;
  row-gap: var(--s-db);
  position: relative;
  padding-bottom: clamp(8rem, 15vw, 10rem);

  @include media(sm) {
    row-gap: var(--s-tr);
  }
}

.main:not(.home) {
  padding-inline: var(--s-inset);
}

// Home page
.home {
  padding-bottom: 0;
}

// Menu or Privacy page
.menu,
.privacy {
  padding-top: var(--s-inset);
}

// Skip link
.skipLink {
  position: absolute;
  top: 0;
  right: 100%; // moves off screen
  z-index: var(
    --z-index-top
  ); // some number that will make sure it covers other elements

  &:focus {
    right: auto;
    padding: 1em;
    border: var(--c-body) 3px solid;
    background-color: var(--c-text);
    color: var(--c-body);
  }
}
</style>
