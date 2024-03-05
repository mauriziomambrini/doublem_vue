import { ref, onMounted, onUpdated, onUnmounted } from 'vue';

const useMediaQuery = () => {
  const matches = {
    sm: ref(true),
    md: ref(false),
    lg: ref(false),
    xl: ref(false),
    xxl: ref(false),
  };

  const breakpoints = {
    sm: 768,
    md: 1024,
    lg: 1280,
    xl: 1440,
    xxl: 1920,
  };

  const updateMatches = () => {
    const windowWidth = window.innerWidth;
    for (const breakpoint in breakpoints) {
      if (Object.prototype.hasOwnProperty.call(breakpoints, breakpoint)) {
        matches[breakpoint].value = windowWidth >= breakpoints[breakpoint];
      }
    }
  };

  onMounted(() => {
    updateMatches();
    window.addEventListener('resize', updateMatches);
  });

  onUpdated(() => {
    updateMatches();
  });

  onUnmounted(() => {
    window.removeEventListener('resize', updateMatches);
  });

  return matches;
};

export default useMediaQuery;
