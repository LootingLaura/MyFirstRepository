<script setup lang="ts">
import { useRoute, withBase } from "vitepress";
import { computed } from "vue";
import StopMotion from "./StopMotion.vue";

const route = useRoute();
const currentPath = computed(() => route.path.replace(/\/$/, ""));

// Load stopmotion frames
const stopMotionFrames = computed(() => {
  const names = ["01.png", "02.png", "03.png", "04.png"];
  return names.map((n) => {
    try {
      return new URL(`../../public/stopmotion/${n}`, import.meta.url).href;
    } catch (e) {
      return withBase(`/stopmotion/${n}`);
    }
  });
});

// Sidebar custom navigation links
const links = [
  { title: "Vitepress", path: "https://vitepress.dev/guide/what-is-vitepress" },
  { title: "Tailwind CSS", path: "https://tailwindcss.com/" },
];
</script>

<template>
  <div class="w-full relative">
    <!-- StopMotion Component - Fixed in upper left corner -->
    <StopMotion
      :frames="stopMotionFrames"
      fps="8"
      width="200px"
      class="fixed top-0 left-4 z-[60]"
    />

    <!-- Main Content -->
    <div
      class="flex flex-col lg:flex-row min-h-[80vh] border border-black overflow-hidden shadow-md"
    >
      <!-- Sidebar -->
      <aside class="w-full lg:w-1/4 border-r border-black p-4 space-y-4">
        <h2 class="text-xl font-bold mb-4 text-white">Useful links</h2>
        <ul class="space-y-2">
          <li v-for="link in links" :key="link.path">
            <a
              :href="link.path"
              class="block px-3 py-2 border border-black rounded text-sm font-medium text-white hover:bg-black hover:text-white transition"
              :class="{
                'bg-black text-white':
                  currentPath === link.path.replace(/\/$/, ''),
              }"
            >
              {{ link.title }}
            </a>
          </li>
        </ul>
      </aside>

      <!-- Markdown Content -->
      <section
        class="w-full lg:w-3/4 p-6 overflow-auto break-words overflow-x-hidden text-white"
      >
        <Content
          class="prose prose-base md:prose-lg max-w-none break-words text-white"
        />
      </section>
    </div>
  </div>
</template>
