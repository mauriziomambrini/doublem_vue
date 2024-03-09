<script setup>
import { defineProps } from 'vue';
import Markdown from '@components/typography/Markdown.vue';
import { useI18n } from 'vue-i18n';
import { unicode } from '../../constants.js';
const { t } = useI18n();
const _version = import.meta.env.VITE_APP_VERSION;

const props = defineProps({
  class: { type: [String, Array] },
});

const copyrightSymbol = '\u{000A9}';
const year = new Date().getFullYear();
const copyright = copyrightSymbol + year;
const textPoweredBy = t('footer.label.powered_by');
const linkPoweredBy = `[Pixelcutter.io](https://www.pixelcutter.io/)`;
const version = ['version', _version].join(unicode.COLON);

const text = [copyright, textPoweredBy, linkPoweredBy, version].join(' ');
</script>

<template>
  <footer :class="['pageContent', s.footer]">
    <Markdown
      :text="text"
      base-size="sm"
      :color="'var(--c-text-l)'"
      :responsive="false"
    />
  </footer>
</template>

<style module="s" lang="scss">
.wrapper {
}
</style>
