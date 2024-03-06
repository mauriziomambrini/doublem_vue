import { ref, onMounted, onUnmounted } from 'vue';

export const ScrollDirection = {
  up: 'up',
  down: 'down',
};

export default function useScrollDirection() {
  const threshold = 80;
  const scrollDir = ref(ScrollDirection.up);
  let previousScrollYPosition = window.scrollY;

  const updateScrollDirection = () => {
    const currentScrollYPosition = window.scrollY;
    const scrolledMoreThanThreshold =
      Math.abs(currentScrollYPosition - previousScrollYPosition) > threshold;

    if (scrolledMoreThanThreshold) {
      const isScrollingUp = currentScrollYPosition < previousScrollYPosition;
      scrollDir.value = isScrollingUp
        ? ScrollDirection.up
        : ScrollDirection.down;
      previousScrollYPosition = currentScrollYPosition;
    }
  };

  onMounted(() => {
    window.addEventListener('scroll', updateScrollDirection);
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', updateScrollDirection);
  });

  return {
    scrollDir,
  };
}
