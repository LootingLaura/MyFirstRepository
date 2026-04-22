<template>
  <div class="absolute inset-0 w-full h-full overflow-hidden bg-black">
    <img
      v-if="frames.length"
      :src="currentSrc"
      :alt="altText"
      class="absolute inset-0 w-full h-full object-contain md:object-cover scale-130 md:scale-100 translate-x-4 md:translate-x-7 select-none"
      :class="{ 'pulse-vibrant': showPulse }"
      draggable="false"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from "vue";

const props = withDefaults(
  defineProps<{
    frames?: string[];
    fps?: number;
  }>(),
  {
    fps: 4,
  },
);

const emit = defineEmits<{
  (e: "finished"): void;
}>();

const frames = computed(() => props.frames || []);
const index = ref(0);
const isPlaying = ref(false);
const altText = "intro stop motion frame";

let timer: number | null = null;
const preloaded: HTMLImageElement[] = [];

const currentSrc = computed(() => frames.value[index.value] || "");
const showPulse = computed(() => !isPlaying.value && index.value === 0);

function clearTimer() {
  if (timer !== null) {
    clearInterval(timer);
    timer = null;
  }
}

async function preloadAll(): Promise<void> {
  const promises = frames.value.map((u, i) => {
    return new Promise<void>((resolve) => {
      const img = new Image();
      img.src = u;
      img.onload = () => {
        preloaded[i] = img;
        resolve();
      };
      img.onerror = () => resolve();
    });
  });
  await Promise.all(promises);
}

async function play() {
  if (isPlaying.value || frames.value.length === 0) return;
  isPlaying.value = true;
  await preloadAll();

  const len = frames.value.length;
  const frameTime = Math.max(80, Math.round(1000 / props.fps));
  index.value = 0;

  clearTimer();
  timer = window.setInterval(() => {
    if (index.value >= len - 1) {
      clearTimer();
      isPlaying.value = false;
      emit("finished");
    } else {
      index.value += 1;
    }
  }, frameTime);
}

onMounted(() => {
  preloadAll();
});

onBeforeUnmount(() => {
  clearTimer();
});

defineExpose({ play });
</script>

<style scoped>
.pulse-vibrant {
  animation: vibrant-pulse 2.5s ease-in-out infinite;
  will-change: filter;
}

@keyframes vibrant-pulse {
  0%,
  100% {
    filter: brightness(0.5) saturate(1.05);
  }
  50% {
    filter: brightness(1.1) saturate(1.25);
  }
}
</style>
