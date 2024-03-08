<script setup>
import { useI18n } from 'vue-i18n';
import Typo from '@components/typography/Typo.vue';
import Icon from '@components/utils/Icon.vue';
import MetaTags from '@components/utils/MetaTags.vue';
const { t } = useI18n();
</script>

<template>
  <MetaTags />
  <div :class="s.wrapper">
    <Typo
      :class="s.pretitle"
      :text="t('label.contact_me')"
      tag="h2"
      size="lg"
      weight="regular"
      color="var(--c-text-l)"
    />

    <a :class="s.mail" href="mailto:hello@doublem.dev">
      hello@doublem<span />dev
    </a>
  </div>
</template>

<style module="s" lang="scss">
@import '@styles/mixins';

.wrapper {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
}

.pretitle {
  @include media(lg) {
    font-size: clamp(var(--fs-lg), 25cqw, var(--fs-db));
  }
}

.mail {
  font-weight: var(--fw-bold);
  font-size: clamp(var(--fs-db), 25cqw, 8cqw);
  color: var(--c-text);
  transition: var(--transition-025);

  span::after {
    content: var(--unicode-bullet);
    vertical-align: sub;
    color: var(--c-primary);
  }

  &:hover {
    text-decoration: underline;
    color: var(--c-primary);
  }
}
</style>
