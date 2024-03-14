<script setup>
import { useI18n } from 'vue-i18n';
import useMediaQuery from '@composable/useMediaQuery.js';
import { useMenu, MenuContext } from '@composable/useMenu.js';
import Hero from '@components/layout/Hero.vue';
import ItemNav from '@components/nav/ItemNav.vue';
import MetaTags from '@components/utils/MetaTags.vue';
import LangSwitch from '@components/nav/LangSwitch.vue';
import Footer from '@components/layout/Footer.vue';

const { t } = useI18n();
const media = useMediaQuery();
const pageMenu = useMenu(MenuContext.PAGE);
const utilsMenu = useMenu(MenuContext.UTILS_PAGE);
const allMenu = [...pageMenu, ...utilsMenu];
</script>

<template>
  <MetaTags />
  <Hero :title="$t('menu.label.menu')" theme="simple">
    <LangSwitch v-if="!media.sm.value" direction="row" />
  </Hero>
  <ul :class="['pageContent', s.menu]" role="list">
    <li v-for="item in allMenu" :key="item.key">
      <ItemNav
        :to="item.href"
        :icon="item.icon"
        :label="t(item.label)"
        :target="item.target"
        theme="page"
      />
    </li>
  </ul>
  <Footer :class="s.footer" />
</template>

<style module="s" lang="scss">
@import '@styles/mixins';

.menu {
  display: grid;
  grid-template-columns: 1fr;
  column-gap: 2rem;

  @include media(sm) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(6, 1fr);
    grid-auto-flow: column;
  }

  @include media(xl) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(4, 1fr);
  }
}

// Footer
.footer {
  margin-top: clamp(2.5rem, 10vw, 5rem);
  padding-inline: var(--s-inset);
}
</style>
