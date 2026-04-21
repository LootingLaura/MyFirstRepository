<script setup lang="ts">
/// <reference types="vite/client" />
import { ref, computed } from "vue";

const props = defineProps<{
  folder: string;
}>();

const allImages = import.meta.glob(
  "../../../works/**/images/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
  { eager: true, import: "default" },
);

const images = computed<string[]>(() => {
  return Object.entries(allImages)
    .filter(([path]) => path.includes(`/works/${props.folder}/images/`))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, url]) => url as string);
});

const index = ref(0);
const total = computed(() => images.value.length);

function prev() {
  if (total.value === 0) return;
  index.value = (index.value - 1 + total.value) % total.value;
}
function next() {
  if (total.value === 0) return;
  index.value = (index.value + 1) % total.value;
}
function goTo(i: number) {
  index.value = i;
}
</script>

<template>
  <div v-if="total" class="carousel">
    <div class="carousel-stage">
      <img
        :src="images[index]"
        :alt="`slide ${index + 1} of ${total}`"
        loading="lazy"
        decoding="async"
        class="carousel-image"
      />

      <button
        v-if="total > 1"
        @click="prev"
        aria-label="previous image"
        class="carousel-arrow carousel-arrow-left"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <button
        v-if="total > 1"
        @click="next"
        aria-label="next image"
        class="carousel-arrow carousel-arrow-right"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>

    <div v-if="total > 1" class="carousel-dots">
      <button
        v-for="(_, i) in images"
        :key="i"
        @click="goTo(i)"
        :aria-label="`go to image ${i + 1}`"
        :class="['carousel-dot', { 'is-active': i === index }]"
      />
    </div>
  </div>
</template>

<style scoped>
.carousel {
  margin: 2rem 0;
}

.carousel-stage {
  position: relative;
  width: 100%;
  overflow: hidden;
  background: transparent;
}

.carousel-image {
  display: block;
  width: 100%;
  height: auto;
  max-height: 70vh;
  object-fit: contain;
  transition: opacity 0.4s ease;
}

.carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 2.75rem;
  height: 2.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  border: none;
  cursor: pointer;
  transition: background 0.2s ease;
}

.carousel-arrow:hover {
  background: rgba(0, 0, 0, 0.6);
}

.carousel-arrow svg {
  width: 1.35rem;
  height: 1.35rem;
}

.carousel-arrow-left {
  left: 0.75rem;
}
.carousel-arrow-right {
  right: 0.75rem;
}

.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.carousel-dot {
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  border: none;
  cursor: pointer;
  padding: 0;
  transition: background 0.2s ease, transform 0.2s ease;
}

.carousel-dot.is-active {
  background: rgba(255, 255, 255, 0.9);
  transform: scale(1.3);
}

.carousel-dot:hover {
  background: rgba(255, 255, 255, 0.6);
}
</style>
