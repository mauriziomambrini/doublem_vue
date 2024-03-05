<script setup>
import { ref, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
const { locale } = useI18n();
import useTranslation from '../../i18n/useTranslation.js';
import Tabs from '@components/utils/Tabs.vue';

const supportedLocales = useTranslation.supportedLocales;
const router = useRouter();
const tabsData = ref([]);

const handleClick = async (newLocale) => {
  try {
    await useTranslation.switchLanguage(newLocale);
    await router.replace({ params: { locale: newLocale } });
    updateTabsData();
  } catch (e) {
    console.error(e);
    router.push('/');
  }
};

const updateTabsData = () => {
  tabsData.value = supportedLocales.map((lang) => ({
    key: lang,
    label: lang.toUpperCase(),
    active: locale.value === lang,
    onclick: () => handleClick(lang),
  }));
};

updateTabsData();

watchEffect(updateTabsData);
</script>

<template>
  <Tabs
    :tabs="tabsData"
    direction="column"
    :classes="{ wrapper: s.wrapper, label: s.label }"
  />
</template>

<style module="s" lang="scss">
.wrapper {
  --lh-tab: 2em;
  --lfs: var(--fs-md);

  max-height: 4rem;
  border: none;
  padding: 0;
}
</style>
