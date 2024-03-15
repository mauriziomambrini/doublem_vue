<script setup>
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import Icon from '@components/utils/Icon.vue';
import Typo from '@components/typography/Typo.vue';
import * as IMG from '@images';
import Button from '@components/buttons/Button.vue';

const { t } = useI18n();
const router = useRouter();

const handleClick = () => {
  router.push(`/`);
};
</script>

<template>
  <div :class="s.wrapper">
    <Icon :class="s.img" :src="IMG.img_404" />
    <Typo
      :class="s.title"
      :text="t('page.404.title')"
      size="db"
      weight="bold"
      :balancer="true"
    />
    <Button
      :classes="{ wrapper: s.btn }"
      :label="t('action.back_home')"
      theme="fill"
      size="lg"
      color="var(--c-primary)"
      @click="handleClick"
    />
  </div>
</template>

<style module="s" lang="scss">
@import '@styles/mixins';

.wrapper {
  width: 100%;
  max-width: var(--w-max-xs);
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding-right: var(--sp-page-inset);
  padding-bottom: clamp(6.5rem, 20vh, 20vh);
  padding-left: var(--sp-page-inset);
  text-align: center;

  @include media(lg) {
    max-width: var(--w-max-sm);
  }

  @include media(xl) {
    max-width: var(--w-max-df);
  }
}

.img {
  width: 20rem;
  height: 15rem;
}

.title {
  font-size: var(--fs-tr);

  @include media(xl) {
    font-size: var(--fs-qr);
  }
}
.btn {
  margin-top: 3rem;
}
</style>
