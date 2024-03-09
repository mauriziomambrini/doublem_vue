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
  subtitle: { type: String },
  text: { type: String },
  tags: { type: Array },
});
</script>

<template>
  <div :class="s.wrapper">
    <div :class="s.dotDate">
      <div :class="s.dot" />
    </div>
    <div :class="s.step">
      <DateBadge :start="props.start" :end="props.end" />
      <header :class="s.header">
        <Typo
          :class="s.title"
          :text="props.title"
          tag="h2"
          size="xxl"
          weight="bold"
        />
        <Typo
          v-if="props.subtitle"
          :class="s.subtitle"
          :text="props.subtitle"
          tag="h3"
          size="lg"
        />
      </header>
      <Markdown v-if="props.text" :text="props.text" color="var(--c-text-l)" />
      <div v-if="tags" :class="s.wrapTag">
        <LabelBadge v-for="tag in tags" :label="tag" theme="tag" />
      </div>
    </div>
  </div>
</template>

<style module="s" lang="scss">
@import '@styles/mixins';

.wrapper {
  --p-bottom: 4rem;

  width: 100%;
  display: flex;
  align-items: flex-start;

  @include media(lg) {
    --p-bottom: 6rem;
  }

  & > *:nth-child(2) {
    margin: 0 0 0 -0.75rem;
    padding-left: 1.5rem;
    border-left: 1px dotted var(--c-bg-d3);

    @include media(sm) {
      margin: 0 0 0 -2.5rem;
      padding-left: 2.5rem;
    }
  }

  &:not(:last-of-type) {
    & > *:nth-child(2) {
      padding-bottom: var(--p-bottom);
    }
  }
}

// Dot
.dotDate {
  width: 1.5rem;
  min-width: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  align-items: center;
  position: sticky;
  top: 7rem;
  margin-bottom: var(--p-bottom);
  background: var(--c-body);
  text-transform: uppercase;

  @include media(sm) {
    width: 5rem;
    min-width: 5rem;
  }
}

.dot {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background: var(--c-primary);

  @include media(sm) {
    width: 1.5rem;
    height: 1.5rem;
  }
}

// Step
.step {
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
  font-size: clamp(var(--fs-xxl), 4.5vw, 4rem);
}

.subtitle {
  font-size: clamp(var(--fs-lg), 4.5vw, 3rem);
}

.wrapTag {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
</style>
