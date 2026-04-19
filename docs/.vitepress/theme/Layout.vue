<script setup lang="ts">
import { useData, useRoute, withBase } from "vitepress";
import NavBar from "./components/NavBar.vue";
import NavBarLanding from "./components/NavBarLanding.vue";
import WorkPage from "./components/WorkPage.vue";
import WorkStack from "./components/WorkStack.vue";
import AboutPage from "./components/AboutPage.vue";
import Footer from "./components/Footer.vue";
import StopMotion from "./components/StopMotion.vue";
import { computed, watch, onMounted, ref } from "vue";
import { useStopMotionState } from "./composables/useStopMotionState";

const { frontmatter, site } = useData();
const route = useRoute();
const { resetState } = useStopMotionState();

const grainOverlay = ref<HTMLDivElement | null>(null);

// Generate noise texture on mount
onMounted(() => {
  if (grainOverlay.value) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const size = 128;
      canvas.width = size;
      canvas.height = size;
      const imageData = ctx.createImageData(size, size);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255;
        data[i] = value; // R
        data[i + 1] = value; // G
        data[i + 2] = value; // B
        data[i + 3] = 50; // A (semi-transparent)
      }

      ctx.putImageData(imageData, 0, 0);
      const dataUrl = canvas.toDataURL("image/png");
      grainOverlay.value.style.backgroundImage = `url(${dataUrl})`;
    }
  }
});

// Remove base from the path so matching works in dev & GitHub Pages
const normalizedPath = computed(() => {
  const base = site.value.base || "/";
  // ensure leading slash and strip any base prefix
  return route.path.replace(base, "/") || "/";
});

// Reset StopMotion state when navigating away from home
watch(normalizedPath, (newPath, oldPath) => {
  // If coming from home and going to any other page, reset
  if (
    (oldPath === "/" || oldPath === "") &&
    newPath !== "/" &&
    newPath !== ""
  ) {
    resetState();
  }
});

const currentPageComponent = computed(() => {
  if (frontmatter.value.layout === "home") return WorkStack;
  if (normalizedPath.value.startsWith("/works/")) return WorkPage;
  if (normalizedPath.value.startsWith("/about")) return AboutPage;
  return null;
});

// Determine which NavBar to show
const currentNavBar = computed(() => {
  if (frontmatter.value.layout === "home") return NavBarLanding;
  return NavBar;
});

const showFooter = computed(() => frontmatter.value.layout !== "home");

const stopMotionFrames = computed(() => {
  const names = ["01.png", "02.png", "03.png", "04.png"];
  return names.map((n) => {
    try {
      return new URL(`../public/stopmotion/${n}`, import.meta.url).href;
    } catch (e) {
      return withBase(`/stopmotion/${n}`);
    }
  });
});
</script>

<template>
  <div
    class="min-h-screen text-white relative"
    style="font-family: Jost, sans-serif; background-color: #020205"
  >
    <!-- Grain overlay -->
    <div ref="grainOverlay" class="grain-overlay"></div>

    <component :is="currentNavBar" />

    <main class="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pt-40 relative">
      <component
        v-if="currentPageComponent"
        :is="currentPageComponent"
        :key="route.path"
      />
      <template v-else>
        <StopMotion :frames="stopMotionFrames" :fps="8" width="150px" />
        <Content
          class="prose prose-invert prose-base md:prose-lg lg:prose-xl max-w-none mt-8"
        />
      </template>
    </main>

    <Footer v-if="showFooter" />
  </div>
</template>

<style scoped>
.grain-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  opacity: 0.05;
  background-repeat: repeat;
}
</style>
