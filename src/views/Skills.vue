<script setup>
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import useGQL from '@composable/useGQL.js';
import Skills from '@gql/skills.gql';
import Markdown from '@components/typography/Markdown.vue';
import Hero from '@components/layout/Hero.vue';
import Tabs from '@components/utils/Tabs.vue';
import SkillItem from '@components/items/SkillItem.vue';
import Divider from '@components/utils/Divider.vue';
import LabelBadge from '@components/badges/LabelBadge.vue';
import MetaTags from '@components/utils/MetaTags.vue';
const { t, locale } = useI18n();
const { data } = useGQL(Skills);
const tabs = ['all', 'development', 'design'];
const filter = ref('all');

const handleClick = (tab) => {
  filter.value = tab;
};

const tabsData = computed(() => {
  return tabs.map((tab) => ({
    key: tab,
    label: t(`input.label.${tab}`),
    active: filter.value === tab,
    onclick: () => handleClick(tab),
  }));
});

const filteredSkills = computed(() => {
  switch (filter.value) {
    case 'design':
      return data?.value.skill?.designSkills;
    case 'development':
      return data?.value.skill?.developSkills;
    case 'all':
    default:
      return [
        ...(data?.value.skill?.developSkills || []),
        ...(data?.value.skill?.designSkills || []),
      ];
  }
});

const groupedSkills = computed(() => {
  return filteredSkills.value.reduce((acc, skill) => {
    if (!acc[skill.level]) {
      acc[skill.level] = [];
    }
    acc[skill.level].push(skill);
    return acc;
  }, {});
});
</script>

<template>
  <MetaTags
    :title="data?.skill?.seo?.title"
    :description="data?.skill?.seo?.description"
  />
  <Hero v-if="data?.skill?.title" :title="data?.skill.title" />
  <Markdown v-if="data?.skill?.text" :text="data?.skill.text" />

  <div v-if="data?.skill" :class="s.wrapper">
    <Tabs
      :classes="{ wrapper: s.wrapperTab }"
      :tabs="tabsData"
      direction="row"
    />
    <section
      v-for="(skills, level) in groupedSkills"
      :class="s.section"
      :key="level"
    >
      <header :class="s.headerSection">
        <Divider />
        <LabelBadge :label="t(`label.level_${level}`)" />
        <Divider />
      </header>
      <article :class="s.group">
        <SkillItem
          v-for="skill in skills"
          :key="skill.title"
          :label="skill.title"
          :icon="skill.icon.url"
        />
      </article>
    </section>
  </div>
</template>

<style module="s" lang="scss">
@import '@styles/mixins';

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: var(--s-tr);

  @include media(sm) {
    row-gap: var(--s-qr);
  }
}

.wrapperTab {
  font-size: clamp(var(--fs-df), 2vw, var(--fs-xl));
}

.section {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--s-db);
}

.headerSection {
  display: flex;
  align-items: center;
  gap: var(--s-df);
}

.group {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(5rem, 1fr));
  row-gap: 2rem;
  column-gap: 1rem;

  @include media(sm) {
    grid-template-columns: repeat(auto-fill, minmax(6rem, 1fr));
  }

  @include media(lg) {
    grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  }
}
</style>
