<script setup>
import { defineProps, computed } from 'vue';
import { LayoutTheme } from '@components/types.js';

import Nav from '@components/nav/Nav.vue';
import Footer from '@components/layout/Footer.vue';

const props = defineProps({
  theme: { type: String, default: 'default', validator: LayoutTheme },
  routeName: { type: String },
});

const showFooter = computed(
  () => props.routeName !== 'home' && props.routeName !== 'contacts',
);
</script>

<template>
  <a href="#main" :class="s.skipLink"> Skip to content </a>
  <template v-if="routeName === 'cv'">
    <slot />
  </template>
  <template v-else>
    <Nav />
    <main
      v-if="props.theme === 'default'"
      :class="[s.main, s[props.routeName]]"
      id="main"
    >
      <slot />
      <Footer v-if="showFooter" :class="s.footer" />
    </main>
  </template>
</template>

<style lang="scss">
@import '@styles/mixins';

div#app {
  height: 100dvh;
  display: flex;
  flex-direction: column;
}

.pageContent {
  width: 100%;
  max-width: var(--w-max-xs);
  margin: 0 auto;
  padding-inline: var(--s-inset);

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

  @include media(sm) {
    row-gap: var(--s-tr);
  }
}

// Footer
.footer {
  margin-top: clamp(2.5rem, 10vw, 5rem);
  padding-inline: var(--s-inset);
  padding-bottom: clamp(5rem, 15vw, 8rem);
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
