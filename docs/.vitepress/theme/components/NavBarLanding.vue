<script setup lang="ts">
import { useData, withBase } from "vitepress";
import { ref } from "vue";
import CustomCursor from "./CustomCursor.vue";
import IntroStopMotion from "./IntroStopMotion.vue";

const { theme } = useData();
const nav = (theme.value.nav || []).filter((item) => item.link !== "/");

const showNav = ref(false);
const introRef = ref<InstanceType<typeof IntroStopMotion> | null>(null);
const introStarted = ref(false);

const introFrames = [
  "Intro_01.jpg",
  "Intro_02.jpg",
  "Intro_03.jpg",
  "Intro_04.jpg",
  "Intro_05.jpg",
  "Intro_06.jpg",
].map((n) => new URL(`../../public/stopmotion/Intro/${n}`, import.meta.url).href);

const handleCursorClick = () => {
  if (introStarted.value) return;
  introStarted.value = true;
  introRef.value?.play();
};

const handleIntroFinished = () => {
  showNav.value = true;
};
</script>

<template>
  <div class="relative w-full h-screen">
    <!-- Custom Cursor Component -->
    <CustomCursor
      :is-visible="!introStarted"
      @cursor-click="handleCursorClick"
    />

    <!-- Fullscreen background stop-motion intro -->
    <IntroStopMotion
      ref="introRef"
      :frames="introFrames"
      :fps="5"
      @finished="handleIntroFinished"
    />

    <!-- Optional: dark overlay for better text readability -->
    <div class="absolute inset-0 bg-black/20"></div>

    <!-- Navigation overlay -->
    <header
      v-show="showNav"
      class="relative z-50 h-screen flex flex-col items-center justify-between pt-8 pb-[45vh] sm:pt-10 sm:pb-48 md:pt-12 md:pb-80 px-4"
    >
      <div
        class="text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tight text-center leading-tight wrap-break-word"
        style="
          font-family: 'Jost', sans-serif;
          font-weight: 800;
          text-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        "
      >
        LAURA EIERMANNS
      </div>

      <nav class="flex flex-col items-center justify-center gap-4 sm:gap-8 md:gap-10">
        <ul class="flex flex-col gap-4 sm:gap-7 md:gap-12 text-base sm:text-lg md:text-2xl font-medium tracking-wider items-center">
          <li v-for="item in nav" :key="item.link">
            <a
              :href="withBase(item.link)"
              class="px-10 py-1 md:px-45 md:py-3 border-2 md:border-3 border-white hover:bg-white hover:text-black transition"
            >
              {{ item.text }}
            </a>
          </li>
        </ul>
      </nav>
    </header>
  </div>
</template>
