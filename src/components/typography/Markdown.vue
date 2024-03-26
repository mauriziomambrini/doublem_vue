<script setup>
import { defineProps, computed } from 'vue';
import MarkdownIt from 'markdown-it';
import { TypoSize } from '@components/types.js';

const props = defineProps({
  text: { type: String },
  color: String,
  baseSize: { type: String, default: 'df', validator: TypoSize },
  responsive: { type: Boolean, default: true },
  class: String,
});

const style = {
  '--lc': props.color,
  '--lfs': `var(--fs-${props.baseSize})`,
};

const md = new MarkdownIt();

md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
  const aIndex = tokens[idx].attrIndex('target');
  const relIndex = tokens[idx].attrIndex('rel');

  if (aIndex < 0) {
    tokens[idx].attrPush(['target', '_blank']);
  } else {
    tokens[idx].attrs[aIndex][1] = '_blank';
  }

  if (relIndex < 0) {
    tokens[idx].attrPush(['rel', 'noopener noreferrer']);
  } else {
    tokens[idx].attrs[relIndex][1] = 'noopener noreferrer';
  }

  return self.renderToken(tokens, idx, options);
};

const renderedMarkdown = computed(() => md.render(props.text || ''));
</script>

<template>
  <div
    :class="[s.text, props.class, { [s.responsiveText]: responsive }]"
    :style="style"
    v-html="renderedMarkdown"
  />
</template>

<style module="s" lang="scss">
@import '@styles/mixins';

.text {
  font-family: var(--ff-main);
  font-weight: var(--fw-regular);
  font-size: var(--lfs);
  line-height: calc(1em + 0.25rem);
  color: var(--lc);
  transition: var(--transition-025);
}

.responsiveText {
  font-size: var(--fsr-df-db);
}

// Margin
.text *:is(h1, h2, h3, h4, h6):not(:first-child) {
  margin-top: 2em;
}

.text *:is(h1, h2, h3, h4, h6, p, ul, ol, li):not(:last-child) {
  margin-bottom: 1.5em;
}

// Headings
.text *:is(h1, h2, h3, h4, h6) {
  font-weight: var(--fw-bold);

  &::after {
    content: var(--unicode-bullet);
    vertical-align: sub;
    color: var(--c-primary);
  }
}

.text h1 {
  font-size: 3em;
}

.text h2 {
  font-size: 2em;
}

// Paragraph and list
.text *:is(p, li) {
  line-height: 1.5;
}

.responsiveText *:is(p, li) {
  line-height: 1.75;
}

.text ul > li::before {
  content: var(--unicode-bullet);
  width: 1.5rem;
  min-width: 1.5rem;
  height: 1.5em;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-weight: var(--fw-bold);
  font-size: 1.25em;
  color: var(--c-primary);
}

.text ol > li {
  counter-increment: my-awesome-counter;
}

.text ol > li::before {
  content: counter(my-awesome-counter);
  width: 1.5rem;
  min-width: 1.5rem;
  height: 1.5em;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-weight: var(--fw-medium);
  color: var(--c-primary);
}

// Inline tags
.text a {
  text-decoration: underline;
  color: var(--c-text-primary);
  transition: var(--transition-025);

  &:hover {
    color: var(--c-black);
  }
}

.text em {
  font-style: italic;
}

.text strong {
  font-weight: var(--fw-bold);
}

.text hr {
  margin: 1.5rem 0;
  border: none;
  border-top: 1px solid var(--c-bg-d2);
}

// Image
.text img {
  width: 100%;
  max-width: 100%;
  height: auto;
  max-height: 75vh;
}
</style>
