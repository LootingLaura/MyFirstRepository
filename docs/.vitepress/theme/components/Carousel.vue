<template>
  <div
    v-if="slides && slides.length"
    class="w-full relative overflow-hidden rounded-2xl bg-black/5"
    @mouseenter="pause"
    @mouseleave="resume"
  >
    <div class="relative w-full h-64 sm:h-80 md:h-96">
      <template v-for="(slide, i) in slides">
        <a
          v-if="slide.href"
          :key="i"
          :href="slide.href"
          class="absolute inset-0 transition-all duration-500 ease-in-out"
          :class="activeIndex === i ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'"
        >
          <img
            v-if="slide.image"
            :src="slide.image"
            :alt="slide.title || slide.name || 'slide'"
            class="w-full h-full object-cover"
          />
          <div v-if="(slide.title || slide.excerpt)" class="absolute left-4 bottom-4 right-4 bg-black/30 p-4 rounded-md text-white">
            <h3 class="text-lg font-semibold">{{ slide.title }}</h3>
            <p class="text-sm mt-1 line-clamp-2">{{ slide.excerpt }}</p>
          </div>
        </a>

        <div
          v-else
          :key="i + '-div'"
          class="absolute inset-0 transition-all duration-500 ease-in-out"
          :class="activeIndex === i ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'"
        >
          <img
            v-if="slide.image"
            :src="slide.image"
            :alt="slide.title || slide.name || 'slide'"
            class="w-full h-full object-cover"
          />
          <div v-if="(slide.title || slide.excerpt)" class="absolute left-4 bottom-4 right-4 bg-black/30 p-4 rounded-md text-white">
            <h3 class="text-lg font-semibold">{{ slide.title }}</h3>
            <p class="text-sm mt-1 line-clamp-2">{{ slide.excerpt }}</p>
          </div>
        </div>
      </template>

      <!-- Prev / Next arrows -->
      <button
        @click="prev"
        class="absolute left-3 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/80 hover:bg-white p-2 shadow-md"
        aria-label="Previous"
      >
        ‹
      </button>

      <button
        @click="next"
        class="absolute right-3 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/80 hover:bg-white p-2 shadow-md"
        aria-label="Next"
      >
        ›
      </button>

      <!-- Mobile tap areas -->
      <div class="absolute inset-y-0 left-0 w-1/2 z-10 sm:hidden" @click="prev" />
      <div class="absolute inset-y-0 right-0 w-1/2 z-10 sm:hidden" @click="next" />
    </div>

    <!-- Dots -->
    <div class="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex gap-2">
      <button
        v-for="(s, idx) in slides"
        :key="idx"
        @click="goTo(idx)"
        :class="idx === activeIndex ? 'w-3 h-3 rounded-full bg-white' : 'w-3 h-3 rounded-full bg-white/50'"
        aria-label="Go to slide"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'

type Slide = {
  image?: string | null
  title?: string
  name?: string
  excerpt?: string
  href?: string
}

const props = withDefaults(defineProps<{
  slides: Slide[]
  autoplay?: boolean
  interval?: number
  loop?: boolean
}>(), {
  autoplay: false,
  interval: 4000,
  loop: true,
})

const activeIndex = ref(0)
let timer: number | null = null

function start() {
  if (!props.autoplay) return
  stop()
  timer = window.setInterval(() => {
    next()
  }, props.interval)
}

function stop() {
  if (timer !== null) {
    clearInterval(timer)
    timer = null
  }
}

function pause() {
  stop()
}

function resume() {
  start()
}

function prev() {
  const len = props.slides.length
  if (len === 0) return
  if (activeIndex.value === 0) {
    activeIndex.value = props.loop ? len - 1 : 0
  } else {
    activeIndex.value -= 1
  }
}

function next() {
  const len = props.slides.length
  if (len === 0) return
  if (activeIndex.value >= len - 1) {
    activeIndex.value = props.loop ? 0 : len - 1
  } else {
    activeIndex.value += 1
  }
}

function goTo(i: number) {
  activeIndex.value = i
}

watch(() => props.autoplay, (v) => {
  if (v) start()
  else stop()
})

onMounted(() => {
  if (props.autoplay) start()
})

onBeforeUnmount(() => {
  stop()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
