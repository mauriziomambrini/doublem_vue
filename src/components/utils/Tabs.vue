<script setup>
import { ref, defineProps, computed } from 'vue';
import { TabsDirection, TabsTheme } from '@components/types.js';
import Typo from '@components/typography/Typo.vue';

const props = defineProps({
  direction: { type: String, default: 'row', validator: TabsDirection },
  theme: { type: String, default: 'switch', validator: TabsTheme },
  classes: {
    wrapper: String,
    tabs: String,
    tab: String,
    label: String,
  },
  tabs: {
    type: Array,
    required: true,
    validator: (tabs) => {
      return tabs.every(
        (tab) =>
          typeof tab.key === 'string' &&
          typeof tab.label === 'string' &&
          typeof tab.active === 'boolean' &&
          typeof tab.onClick === 'function',
      );
    },
  },
});

const tabRefs = ref([]);

const handleClick = (index, onClick) => {
  if (typeof onClick === 'function') {
    onClick();
  }
};

const activeTabEl = computed(() => {
  const activeTab = props.tabs.find((tab) => tab.active);
  const activeIndex = props.tabs.indexOf(activeTab);
  return tabRefs.value[activeIndex];
});

const indicatorWidth = computed(() => {
  return activeTabEl.value ? activeTabEl.value.clientWidth : 0;
});

const indicatorLeft = computed(() => {
  return activeTabEl.value ? activeTabEl.value.offsetLeft : 0;
});

const indicatorTop = computed(() => {
  return activeTabEl.value ? activeTabEl.value.offsetTop : 0;
});

const style = computed(() => ({
  width: `${indicatorWidth.value}px`,
  transform:
    props.direction === 'row'
      ? `translateX(${indicatorLeft.value}px)`
      : `translateY(${indicatorTop.value}px)`,
}));
</script>

<template>
  <div :class="[props.classes?.wrapper, s.wrapper, s[direction], s[theme]]">
    <div :class="[props.classes?.tabs, s.tabs]">
      <div ref="indicator" :class="s.indicator" :style="style" />
      <div
        :ref="(el) => (tabRefs[index] = el)"
        v-for="(tab, index) in tabs"
        :key="tab.key"
        :class="[s.tab, { [s.active]: tab.active }]"
        @click="() => handleClick(index, tab.onclick)"
      >
        <Typo
          :class="[props.classes?.label, s.label]"
          :text="tab.label"
          size="df"
          color="text"
        />
      </div>
    </div>
  </div>
</template>

<style module="s" lang="scss">
.wrapper {
  --lh-tab: 2em;

  font-size: var(--fs-df);
}

.tabs {
  position: relative;
}

.tab {
  height: var(--lh-tab);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: var(--z-index-2);
  cursor: pointer;
}

.label {
  font-size: 1em;
  white-space: nowrap;
  transition: var(--transition-025);
}

.indicator {
  height: var(--lh-tab);
  position: absolute;
  z-index: var(--z-index-1);
  transition: var(--transition-025);
}

// Direction row
.row {
  .tabs {
    display: flex;
    align-items: center;

    .label {
      padding-inline: 0.75em;
    }
  }
}

// Direction column
.column {
  .tabs {
    display: grid;
    grid-template-columns: 1fr;
  }

  .tab {
    width: 100%;
  }

  .label {
    padding-inline: 0.5em;
  }
}

// Switch theme
.switch {
  width: fit-content;
  padding: var(--s-uxs);
  border: 1px solid var(--c-bg-d3);
  border-radius: var(--s-xxs);

  .active .label {
    color: var(--c-white);
  }

  .indicator {
    border-radius: var(--s-uxs);
    background-color: var(--c-primary);
  }
}
</style>
