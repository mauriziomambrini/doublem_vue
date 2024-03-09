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
  <template v-if="routeName === 'cv'">
    <slot />
  </template>
  <template v-else>
    <Nav />
    <main
      v-if="props.theme === 'default'"
      :class="[s.main, s[props.routeName]]"
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
</style>
