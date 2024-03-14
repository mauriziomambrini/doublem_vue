<script setup>
import { useI18n } from 'vue-i18n';
import Typo from '@components/typography/Typo.vue';
import Icon from '@components/utils/Icon.vue';
import MetaTags from '@components/utils/MetaTags.vue';
import { MenuContext, useMenu } from '@composable/useMenu.js';

const { t } = useI18n();
const socialMenu = useMenu(MenuContext.SOCIAL);
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
    <div :class="s.wrapSocial">
      <a
        v-for="item in socialMenu"
        :key="item.key"
        :href="item.href"
        target="_blank"
        :class="s.social"
      >
        <Icon v-if="item.icon" :class="s.iconSocial" :src="item.icon" />
        <Typo v-if="item.label" :class="s.labelSocial" :text="t(item.label)" />
      </a>
    </div>
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
  font-size: var(--fsr-lg-big);
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

// Social
.wrapSocial {
  --lfsr: var(--fsr-df-db);
  --lc-social: var(--c-text-l);

  display: flex;
  align-items: center;
  gap: calc(var(--lfsr) * 1.25);
  margin-top: 5rem;
}

.social {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.25em;
  align-items: center;
  font-size: var(--lfsr);
  color: var(--lc-social);
  transition: var(--transition-025);
}

.iconSocial {
  width: var(--lfsr);
  min-width: var(--lfsr);
  height: var(--lfsr);
  fill: var(--lc-social);
  transition: var(--transition-025);
}

.labelSocial {
  font-size: var(--lfsr);
  transition: var(--transition-025);
}

.social:hover {
  --lc-social: var(--c-primary);
  text-decoration: underline;
}
</style>
