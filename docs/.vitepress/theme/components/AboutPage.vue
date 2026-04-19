<script setup lang="ts">
import { withBase } from "vitepress";
import { computed } from "vue";
import StopMotion from "./StopMotion.vue";

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
</script>

<template>
  <div class="w-full relative">
    <!-- StopMotion Component -->
    <StopMotion
      :frames="stopMotionFrames"
      :fps="8"
      width="150px"
    />

    <!-- Markdown Content -->
    <section
      class="w-full p-6 overflow-auto overflow-x-hidden wrap-break-word"
    >
      <Content
        class="prose prose-invert prose-base md:prose-lg max-w-3xl mx-auto wrap-break-word"
      />
    </section>
  </div>
</template>
