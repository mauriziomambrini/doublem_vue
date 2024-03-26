<script setup>
import { defineProps, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
const { locale } = useI18n();
import useTranslation from '../../i18n/useTranslation.js';
import Tabs from '@components/utils/Tabs.vue';
import { TabsDirection, TabsTheme } from '@components/types.js';

const props = defineProps({
  direction: { type: String, default: 'column', validator: TabsDirection },
  theme: { type: String, default: 'switch', validator: TabsTheme },
});

const supportedLocales = useTranslation.supportedLocales;
const router = useRouter();

const handleClick = async (newLocale) => {
  try {
    await useTranslation.switchLanguage(newLocale);
    await router.replace({ params: { locale: newLocale } });
  } catch (e) {
    console.error(e);
    router.push('/');
  }
};

const tabsData = computed(() => {
  return supportedLocales.map((lang) => ({
    key: lang,
    label: lang.toUpperCase(),
    active: locale.value === lang,
    onclick: () => handleClick(lang),
  }));
});
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
