import { ref } from "vue";

// Global state for StopMotion component that persists across page navigation
const currentIndex = ref(0);
const isPlaying = ref(false);
const direction = ref(1); // 1 = forward, -1 = reverse

export function useStopMotionState() {
  const resetState = () => {
    currentIndex.value = 0;
    isPlaying.value = false;
    direction.value = 1;
  };

  return {
    currentIndex,
    isPlaying,
    direction,
    resetState,
  };
}
