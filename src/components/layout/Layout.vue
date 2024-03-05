<script setup>
import { defineProps } from 'vue';
import { LayoutTheme } from '@components/types.js';

import Nav from '@components/nav/Nav.vue';

const props = defineProps({
  theme: { type: String, default: 'default', validator: LayoutTheme },
  routeName: { type: String },
});
</script>

<template>
  <template v-if="routeName === 'cv'">
    <slot />
  </template>
  <template v-else>
    <Nav />
    <main
      v-if="props.theme === 'default'"
      :class="[s.main, { [s[routeName]]: true }]"
    >
      <slot />
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
  display: flex;
  flex-direction: column;
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
.main {
  display: flex;
  flex: 1;
  flex-direction: column;
  position: relative;
  padding-bottom: clamp(6.5rem, 20vh, 20vh);
}

// If is home page
.home {
  padding-bottom: 0;
}
</style>
