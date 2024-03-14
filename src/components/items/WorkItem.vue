<script setup>
import { defineProps } from 'vue';
import Typo from '@components/typography/Typo.vue';
import Markdown from '@components/typography/Markdown.vue';
import DateBadge from '@components/badges/DateBadge.vue';
import LabelBadge from '@components/badges/LabelBadge.vue';

const props = defineProps({
  start: { type: String },
  end: { type: String },
  title: { type: String, required: true },
  text: { type: String },
  gallery: { type: Array },
  tags: { type: Array },
});
</script>

<template>
  <div :class="s.wrapper">
    <Typo
      :class="s.title"
      :text="props.title"
      tag="h2"
      size="xxl"
      weight="bold"
    />
    <DateBadge :start="props.start" :end="props.end" theme="year" />
    <Markdown
      v-if="props.text"
      :class="s.text"
      :text="props.text"
      color="var(--c-text-l)"
    />

    <div v-if="tags" :class="s.wrapTag">
      <LabelBadge v-for="tag in tags" :key="tag" :label="tag" theme="tag" />
    </div>

    <figure v-for="img in gallery" :key="img.id" :class="s.img">
      <img :src="img.url" :alt="img.alt" />
    </figure>
  </div>
</template>

<style module="s" lang="scss">
@import '@styles/mixins';

.wrapper {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: var(--s-df);

  @include media(lg) {
    gap: var(--s-xxl);
  }
}

// Header
.header {
  display: flex;
  flex-direction: column;
  gap: var(--s-xxs);

  @include media(lg) {
    gap: var(--s-sm);
  }
}

.title {
  font-size: var(--fsr-xxl-qr);
}

.text a {
  display: inline-flex;
  align-items: center;
}

.text a:first-of-type {
  margin-top: var(--s-xxl);
}

.text a:before {
  --lw-icon: clamp(var(--fs-lg), 2cqw, 2rem);

  content: '';
  display: inline-block;
  width: var(--lw-icon);
  height: var(--lw-icon);
  background-image: url('../../assets/icons/svg/about.svg');
  background-size: contain;
  background-repeat: no-repeat;
  margin-right: var(--s-xxs);
}

// Tags
.wrapTag {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

// Gallery
.img {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 16/10;
  margin-top: var(--s-qr);
  border-radius: var(--s-xxl);
  background: var(--c-bg);
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
