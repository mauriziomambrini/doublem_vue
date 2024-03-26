<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import useScrollDirection from '@composable/useScrollDirection.js';
import useMediaQuery from '@composable/useMediaQuery.js';
import { useMenu, MenuContext } from '@composable/useMenu.js';
import LangSwitch from '@components/nav/LangSwitch.vue';
import ItemNav from '@components/nav/ItemNav.vue';
import Divider from '@components/utils/Divider.vue';
import Typo from '@components/typography/Typo.vue';

const { t, locale } = useI18n();
const route = useRoute();
const { scrollDir } = useScrollDirection();
const media = useMediaQuery();
const mobileMenu = useMenu(MenuContext.MOBILE);
const desktopMenu = useMenu(MenuContext.DESKTOP);
const utilsMenu = useMenu(MenuContext.UTILS_DESKTOP);

const currentRoute = computed(() => route.path);

const isActive = computed(() => (itemHref) => {
  const normalizedCurrentRoute = route.path.endsWith('/')
    ? route.path
    : `${route.path}/`;
  const normalizedItemHref = itemHref.endsWith('/') ? itemHref : `${itemHref}/`;

  return normalizedCurrentRoute === `/${locale.value}${normalizedItemHref}`;
});
</script>

<template>
  <nav :class="[s.nav, { [s.hide]: scrollDir === 'down' }]">
    <ul :class="s.menu" role="list" ref="menuRef">
      <li
        v-for="item in media.sm.value ? desktopMenu : mobileMenu"
        :key="item.key"
      >
        <Typo
          v-if="currentRoute === `/${locale + item.href}`"
          class="visuallyHidden"
          text="Current page:"
        />
        <ItemNav
          :to="item.href"
          :icon="item.icon"
          :label="t(item.label)"
          :theme="media.sm.value ? 'desktop' : 'mobile'"
          :active="isActive(item.href)"
        />
      </li>
      <Divider v-if="media.sm.value" theme="lineV" :spacing="[0.5]" />
      <li v-for="item in media.sm.value && utilsMenu" :key="item.key">
        <Typo
          v-if="currentRoute === `/${locale + item.href}`"
          class="visuallyHidden"
          text="Current page:"
        />
        <ItemNav
          :to="item.href"
          :icon="item.icon"
          :label="t(item.label)"
          :active="isActive(item.href)"
        />
      </li>
      <Divider v-if="media.sm.value" theme="lineV" :spacing="[0.5]" />
      <LangSwitch v-if="media.sm.value" />
    </ul>
  </nav>
</template>

<style module="s" lang="scss">
@import '@styles/mixins';

// Nav wrapper
.nav {
  width: 100vw;
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: var(--z-index-3);
  transition: var(--transition-05);

  @include media(sm) {
    padding-bottom: 2rem;
  }
}

// Menu
.menu {
  width: 100%;
  max-width: var(--w-max-xs);
  height: 4rem;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  align-items: center;
  padding-inline: 0.5rem;
  position: relative;
  background-color: var(--c-body);
  box-shadow: var(--sw-inset-top);
  transition: var(--transition-025);

  @include media(sm) {
    width: fit-content;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-inline: auto;
    padding: 0.5rem;
    border: 1px solid var(--c-text);
    border-radius: var(--s-sm);
    box-shadow: var(--sw-dp8);
  }
}

.menu > li {
  width: 100%;
  height: 100%;
}

// Hide on scroll
.hide:not(:hover) {
  @include media(sm) {
    bottom: -5rem;
  }
}
</style>
