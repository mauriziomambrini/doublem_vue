<script setup>
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import useGQL from '@composable/useGQL.js';
import { unicode } from '../constants.js';
import Home from '@gql/home.gql';
import Typo from '@components/typography/Typo.vue';
import Button from '@components/buttons/Button.vue';
import * as ICONS from '@icons';
import MetaTags from '@components/utils/MetaTags.vue';

const { data } = useGQL(Home);
const { t, locale } = useI18n();
const router = useRouter();

const handleClick = () => {
  router.push(`/${locale.value}/why`);
};
</script>

<template>
  <MetaTags
    :title="data?.homePage?.seo?.title"
    :description="data?.homePage?.seo?.description"
  />
  <div :class="s.wrapper">
    <div :class="s.pretitle">
      <span>{{ t('page.home.title') }}</span>
      <span>{{ unicode.BULLET }}</span>
    </div>
    <div v-if="data && data.homePage" :class="s.wrapTitle">
      <Typo
        :class="s.title"
        :text="data?.homePage.title"
        tag="h1"
        size="db"
        weight="regular"
        :balancer="true"
      />
      <Button
        :classes="{ wrapper: s.cta }"
        :label="t('action.discover_more')"
        :icon="ICONS.arrowAngleRight"
        icon-position="after"
        theme="fill"
        size="lg"
        color="var(--c-primary)"
        @click="handleClick"
      />
    </div>
  </div>
</template>

<style module="s" lang="scss">
@import '@styles/mixins';

.wrapper {
  @include inset-spacing(var(--s-inset));
  max-width: 100% !important;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1.5rem;
  overflow: hidden;

  @include media(sm) {
    align-items: center;
  }
}

.pretitle {
  width: 100vw;
  position: relative;
  z-index: var(--z-index-top);
  font-weight: var(--fw-bold);
  font-size: clamp(var(--fs-db), 25cqw, 50cqw);
  transform: translateX(-31%);
  animation: pretitle-slide-in 0.5s ease-in 1.125s forwards;

  @include media(sm) {
    line-height: 0.5;
    text-align: center;
  }

  * {
    display: inline-block;
  }

  *:nth-child(1) {
    animation: pretitle-fade-in 0.25s ease-in 1.5s forwards;
    opacity: 0;
  }

  *:nth-child(2) {
    vertical-align: sub;
    color: var(--c-primary);
    transform: scale(100);
    animation: pretitle-scale 1s ease-out forwards;
  }
}

@keyframes pretitle-scale {
  to {
    transform: scale(1);
  }
}

@keyframes pretitle-fade-in {
  to {
    opacity: 1;
  }
}

@keyframes pretitle-slide-in {
  to {
    transform: translateX(0%);
  }
}
.wrapTitle {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  font-size: var(--fsr-xxl-qr);
  animation: title-fade-in 0.25s ease-in 1.825s forwards;
  opacity: 0;

  @include media(sm) {
    align-items: center;
    text-align: center;
  }

  @include media(lg) {
    gap: 2em;
  }
}

@keyframes title-fade-in {
  to {
    opacity: 1;
  }
}

.title {
  font-size: var(--fsr-xxl-qr);

  @include media(xl) {
    max-width: 75%;
  }
}

.cta {
  //--lfs-label: clamp(var(--fs-df), 3.5vw, 1.5vw);

  min-width: 100%;
  font-size: clamp(var(--fs-df), 3.5vw, 1.5vw);

  @include media(sm) {
    min-width: fit-content;
  }
}
</style>
