<script setup>
import { computed } from 'vue';
import html2pdf from 'html2pdf.js';
import { useI18n } from 'vue-i18n';
import useGQL from '@composable/useGQL.js';
import Skills from '@gql/skills.gql';
import Experience from '@gql/experience.gql';
import Typo from '@components/typography/Typo.vue';
import DateBadge from '@components/Badges/DateBadge.vue';
import Markdown from '@components/typography/Markdown.vue';
const { data: skillsData } = useGQL(Skills);
const { data: experienceData } = useGQL(Experience);
const { t, locale } = useI18n();

const groupedSkills = computed(() => {
  const skills = [
    ...skillsData?.value.skill.developSkills,
    ...skillsData?.value.skill.designSkills,
  ];

  return skills.reduce((acc, skill) => {
    if (!acc[skill.level]) {
      acc[skill.level] = [];
    }
    acc[skill.level].push(skill);
    return acc;
  }, {});
});

const generatePdf = () => {
  const element = document.getElementById('content-to-export');
  const options = {
    margin: 1,
    filename: `cv_maurizio_mambrini_${locale.value}.pdf`,
    image: { type: 'jpeg', quality: 1 },
    html2canvas: { scale: 4 },
    jsPDF: { unit: 'mm', format: 'A4', orientation: 'portrait' },
  };

  html2pdf().set(options).from(element).save();
};
</script>

<template>
  <div :class="s.wrapper">
    <button @click="generatePdf">Scarica PDF</button>
    <div :class="s.page" id="content-to-export">
      <Typo
        :class="[s.mainTitle, s.dotTitle]"
        text="Maurizio Mambrini"
        tag="h1"
        size="xbig"
        weight="bold"
      />
      <div v-if="skillsData" :class="s.skillSection">
        <Typo
          :class="s.dotTitle"
          :text="skillsData?.skill.title"
          tag="h2"
          size="xxl"
          weight="bold"
        />
        <div v-for="(skills, level) in groupedSkills" :key="level">
          <Typo :text="t(`label.level_${level}`)" weight="bold" />
          <div :class="s.group">
            <Typo
              v-for="skill in skills"
              :key="skill.title"
              :class="s.skill"
              :text="skill.title"
            />
          </div>
        </div>
      </div>

      <div v-if="experienceData" :class="s.experienceSection">
        <Typo
          :class="s.dotTitle"
          :text="experienceData.experience.title"
          tag="h2"
          size="xxl"
          weight="bold"
        />
        <div
          v-for="item in experienceData.experience.timeline"
          :key="item.title"
        >
          <DateBadge :start="item.startDate" :end="item.endDate" />
          <Typo :text="item.title" />
          <Typo v-if="item.subtitle" :text="item.subtitle" />
          <Markdown :text="item.shortDescription" :responsive="false" />
        </div>
      </div>
    </div>
  </div>
</template>

<style module="s" lang="scss">
.wrapper {
  width: 100%;
  max-width: 794px;
  margin-inline: auto;
}

.page {
  width: 100%;
  max-width: 794px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: auto;
  grid-template-areas: 'title info' 'text info' 'experience skill' '. skill';
  align-items: start;
  padding: var(--s-inset);
  aspect-ratio: 210 / 297;
  border: 1px solid red;
}

.mainTitle {
  grid-area: title;
  font-size: 6rem;
  line-height: 0.85;
}

.dotTitle::after {
  content: var(--unicode-bullet);
  vertical-align: sub;
  color: var(--c-primary);
}

// Experience
.experienceSection {
  grid-area: experience;
}

// Skills
.skillSection {
  grid-area: skill;
}

.group {
  display: flex;
  flex-wrap: wrap;
  gap: var(--s-uxs);
}

.skill:not(:last-child)::after {
  content: var(--unicode-comma);
}
</style>
