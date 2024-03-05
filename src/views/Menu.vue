<script setup>
import { useMenu, MenuContext } from '@composable/useMenu.js';
import Hero from '@components/layout/Hero.vue';
import ItemNav from '@components/nav/ItemNav.vue';

const menu = useMenu(MenuContext.PAGE);
const utils = useMenu(MenuContext.UTILS_PAGE);
const allMenu = [...menu, ...utils];
</script>

<template>
  <Hero :title="$t('menu.label.menu')" theme="page" />
  <ul :class="s.menu" role="list">
    <li v-for="item in allMenu" :key="item.key">
      <ItemNav
        :to="item.href"
        :icon="item.icon"
        :label="item.label"
        :target="item.target"
        theme="page"
      />
    </li>
  </ul>
</template>

<style module="s" lang="scss">
.wrapper {
}
</style>
