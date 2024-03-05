<script setup>
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import useGQL from '@composable/useGQL.js';
import Skills from '@gql/skills.gql';
import Markdown from '@components/typography/Markdown.vue';
import Hero from '@components/layout/Hero.vue';
import Tabs from '@components/utils/Tabs.vue';
import Typo from '@components/typography/Typo.vue';
import SkillItem from '@components/items/SkillItem.vue';
const { t, locale } = useI18n();
const { data } = useGQL(Skills);
const tabs = ['all', 'development', 'design'];
const filter = ref('all');
const tabsData = ref([]);

const handleClick = (tab) => {
  filter.value = tab;
};

const updateTabsData = () => {
  tabsData.value = tabs.map((tab) => ({
    key: tab,
    label: t(`input.label.${tab}`),
    active: filter.value === tab,
    onclick: () => handleClick(tab),
  }));
};

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

updateTabsData();

watch(filter, updateTabsData);
watch(locale, updateTabsData);
</script>

<template>
  <Hero
    v-if="data && data.skill && data.skill.title"
    :title="data?.skill.title"
  />
  <Markdown
    v-if="data?.skill && data.skill.text"
    class="pageContent"
    :text="data?.skill.text"
  />

  <div v-if="data && data.skill" class="pageContent">
    <Tabs :tabs="tabsData" direction="row" />
    <div v-for="(skills, level) in groupedSkills" :key="level">
      <Typo :text="t(`label.level_${level}`)" weight="bold" />
      <div :class="s.group">
        <SkillItem
          v-for="skill in skills"
          :key="skill.title"
          :label="skill.title"
          :icon="skill.icon.url"
        />
      </div>
    </div>
  </div>
</template>

<style module="s" lang="scss">
@import '@styles/mixins';

.group {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(5rem, 1fr));
  row-gap: 2rem;
  column-gap: 1rem;
  padding: 0 1.5rem;

  @include media(sm) {
    grid-template-columns: repeat(auto-fill, minmax(6rem, 1fr));
  }

  @include media(lg) {
    grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  }
}
</style>
