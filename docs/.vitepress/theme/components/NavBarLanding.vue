<script setup lang="ts">
import { useData, withBase } from 'vitepress'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import CustomCursor from './CustomCursor.vue'

const { theme } = useData()
const nav = theme.value.nav || []

const showNav = ref(false)
const videoRef = ref<HTMLVideoElement | null>(null)
const videoStarted = ref(false)

// Import video - update 'Intro.MP4' to your actual video filename
const videoSrc = new URL('../../public/Intro.MP4', import.meta.url).href

// function handleFrameEvent(e: Event) {
//   const detail = (e as CustomEvent)?.detail || {}
//   const src: string = detail.src || ''
//   // show only when the stopmotion frame filename ends with 04.png
//   showNav.value = !!src && src.endsWith('04.png')
// }

const handleCursorClick = () => {
  videoStarted.value = true
  showNav.value = true
  if (videoRef.value) {
    videoRef.value.play().catch(err => {
      console.warn('Video play failed:', err)
    })
  }
}

onMounted(() => {
  // if (typeof window !== 'undefined') {
  //   window.addEventListener('stopmotion:frame', handleFrameEvent as EventListener)
  // }
})

onBeforeUnmount(() => {
  // if (typeof window !== 'undefined') {
  //   window.removeEventListener('stopmotion:frame', handleFrameEvent as EventListener)
  // }
})
</script>

<template>
  <div class="relative w-full h-screen">
    <!-- Custom Cursor Component -->
    <CustomCursor :is-visible="!videoStarted" @cursor-click="handleCursorClick" />

    <!-- Fullscreen background video -->
    <video
      ref="videoRef"
      class="absolute inset-0 w-full h-full object-cover"
      muted
      loop
      playsinline
    >
      <!-- Update the src path to your video file -->
      <source :src="videoSrc" type="video/mp4" />
    </video>

    <!-- Optional: dark overlay for better text readability -->
    <div class="absolute inset-0 bg-black/20"></div>

    <!-- Navigation overlay -->
    <header v-show="showNav" class="relative z-50 h-screen flex flex-col items-center justify-between pt-12 pb-70">
      <div class="text-8xl text-white tracking-tight text-center" style="font-family: 'Jost', sans-serif; font-weight: 800; text-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);">
        LAURA EIERMANNS
      </div>

      <nav class="flex flex-col items-center justify-center gap-8">
        <ul class="flex flex-col gap-7 text-sm font-medium items-center">
          <li
            v-for="item in nav"
            :key="item.link"
          >
            <a
              :href="withBase(item.link)"
              class="px-10 py-1 rounded-md border-[2px] border-white hover:bg-white hover:text-black transition"
            >
              {{ item.text }}
            </a>
          </li>
        </ul>
      </nav>
    </header>
  </div>
</template>
