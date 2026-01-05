<template>
  <div ref="containerRef" class="w-full">
    <!-- Stop-motion animation (landing) -->
    <StopMotion :frames="stopFrames" fps="12" width="960px" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { withBase } from 'vitepress'
import StopMotion from './StopMotion.vue'

const containerRef = ref<HTMLElement | null>(null)

const stopFrames = computed(() => {
  const names = ['01.png', '02.png', '03.png', '04.png']
  return names.map(n => {
    try {
      return new URL(`../../public/stopmotion/${n}`, import.meta.url).href
    } catch (e) {
      return withBase(`/stopmotion/${n}`)
    }
  })
})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
