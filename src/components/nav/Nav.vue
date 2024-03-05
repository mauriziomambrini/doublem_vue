<script setup>
import useMediaQuery from '@composable/useMediaQuery.js';
import { useMenu, MenuContext } from '@composable/useMenu.js';
import LangSwitch from '@components/nav/LangSwitch.vue';
import ItemNav from '@components/nav/ItemNav.vue';
import Divider from '@components/utils/Divider.vue';

const media = useMediaQuery();
const mobile = useMenu(MenuContext.MOBILE);
const desktop = useMenu(MenuContext.DESKTOP);
const utils = useMenu(MenuContext.UTILS_DESKTOP);
</script>

<template>
  <nav :class="s.nav">
    <ul :class="s.menu" role="list">
      <li v-for="item in media.sm.value ? desktop : mobile" :key="item.key">
        <ItemNav :to="item.href" :icon="item.icon" :label="item.label" />
      </li>
      <Divider v-if="media.sm.value" theme="lineV" :spacing="[0.5]" />
      <li v-for="item in media.sm.value && utils" :key="item.key">
        <ItemNav :to="item.href" :icon="item.icon" :label="item.label" />
      </li>
      <Divider v-if="media.sm.value" theme="lineV" :spacing="[0.5]" />
      <LangSwitch v-if="media.sm.value" />
    </ul>
  </nav>
</template>

<style module="s" lang="scss">
@import '@styles/mixins';

.nav {
  width: fit-content;
  max-width: var(--w-max-xs);
  position: fixed;
  right: 0;
  bottom: 2rem;
  left: 0;
  z-index: var(--z-index-3);
  margin-inline: auto;
  padding: 0.5rem;
  border: 1px solid var(--c-text);
  border-radius: var(--s-sm);
  background-color: var(--c-body);
  box-shadow: var(--sw-dp8);
  transition: var(--transition-05);
}

.menu {
  display: grid;
  grid-template-columns: repeat(5, 1fr);

  @include media(sm) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
