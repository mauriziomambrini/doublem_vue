<script setup>
import { defineProps, toRef, computed } from 'vue';
import WrapBalancer from 'vue-wrap-balancer';
import {
  TypoFamily,
  TypoLineHeight,
  TypoSize,
  TypoTags,
  TypoWeight,
} from '@components/types.js';

const props = defineProps({
  tag: { type: String, default: 'span', validator: TypoTags },
  family: { type: String, default: 'sans', validator: TypoFamily },
  size: { type: String, default: 'df', validator: TypoSize },
  weight: { type: String, default: 'regular', validator: TypoWeight },
  lineHeight: { type: String, default: 'default', validator: TypoLineHeight },
  text: { type: [String, Number] },
  color: String,
  balancer: { type: Boolean, default: false },
  class: { type: [String, Array] },
});

const lc = toRef(props, 'color');

const style = computed(() => ({
  '--lc': lc.value,
  '--lff': props.family === 'sans' ? 'var(--ff-main)' : 'var(--ff-mono)',
  '--lfs': `var(--fs-${props.size})`,
  '--lfw': `var(--fw-${props.weight})`,
  '--llh': props.lineHeight === 'default' ? '0.25rem' : '0.5em',
}));
</script>

<template>
  <component :is="props.tag" :class="[props.class, s.typo]" :style="style">
    <WrapBalancer v-if="props.balancer">
      {{ props.text }}
    </WrapBalancer>
    <template v-else>
      {{ props.text }}
    </template>
  </component>
</template>

<style module="s" lang="scss">
.typo {
  margin: 0;
  padding: 0;
  font-family: var(--lff);
  font-weight: var(--lfw);
  font-size: var(--lfs);
  line-height: calc(1em + var(--llh));
  color: var(--lc);
  transition: var(--transition-025);
}
</style>
