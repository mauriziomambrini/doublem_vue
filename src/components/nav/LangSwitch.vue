<script setup>
import { defineProps, ref, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
const { locale } = useI18n();
import useTranslation from '../../i18n/useTranslation.js';
import Tabs from '@components/utils/Tabs.vue';
import { TabsDirection, TabsTheme } from '@components/types.js';
import useMediaQuery from '@composable/useMediaQuery.js';

const props = defineProps({
  direction: { type: String, default: 'column', validator: TabsDirection },
  theme: { type: String, default: 'switch', validator: TabsTheme },
});

const { t } = useI18n();
const media = useMediaQuery();
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
    :theme="props.theme"
    :direction="props.direction"
    :classes="{ wrapper: s.wrapper, tabs: s.tabs }"
  />
</template>

<style module="s" lang="scss">
@import '@styles/mixins';

.wrapper {
  --lfs: var(--fs-md);
  max-height: 4rem;

  @include media(sm) {
    border: none;
    padding: 0;
  }
}
</style>
