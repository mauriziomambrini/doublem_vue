<script setup>
import { defineProps, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { format } from 'date-fns';
import { enUS, it } from 'date-fns/locale';
import { DateBadgeTheme } from '@components/types.js';
const { t, locale } = useI18n();
import * as ICONS from '@icons';
import Icon from '@components/utils/Icon.vue';
import Typo from '@components/typography/Typo.vue';

const props = defineProps({
  theme: { type: String, default: 'month', validator: DateBadgeTheme },
  start: { type: String },
  end: { type: String },
});

const localesMap = {
  en: enUS,
  it: it,
};

const getDateFormat = (theme) => {
  switch (theme) {
    case 'year':
      return 'yyyy';
    default:
      return 'MMM yyyy';
  }
};

const getDateFnsLocale = (locale) => localesMap[locale.value] || enUS;

const formatDate = (date, dateFormat) => {
  const dateLocale = getDateFnsLocale(locale);
  return date
    ? format(new Date(date), dateFormat, { locale: dateLocale })
    : undefined;
};

const startDate = computed(() =>
  formatDate(props.start, getDateFormat(props.theme)),
);
const endDate = computed(() =>
  props.end
    ? formatDate(props.end, getDateFormat(props.theme))
    : t('label.today'),
);
</script>

<template>
  <div :class="s.wrapper">
    <Typo :class="s.label" :text="startDate" tag="span" color="var(--c-text)" />
    <Icon :class="s.arrow" v-if="props.start" :src="ICONS.arrowAngleRight" />
    <Typo :class="s.label" :text="endDate" tag="span" color="var(--c-text)" />
  </div>
</template>

<style module="s" lang="scss">
.wrapper {
  max-width: fit-content;
  height: 1.75em;
  display: flex;
  gap: 0.25em;
  justify-content: center;
  align-items: center;
  padding-inline: 0.5em;
  border-radius: 0.25em;
  background-color: var(--c-bg-d2);
  font-size: var(--fsr-md-lg);
  cursor: inherit;
}

.label {
  font-size: var(--fsr-md-lg);
  text-transform: uppercase;
}

.arrow {
  --lw-icon: calc(var(--fsr-md-lg) - 0.25em);
  width: var(--lw-icon);
  min-width: var(--lw-icon);
  height: var(--lw-icon);
}
</style>
