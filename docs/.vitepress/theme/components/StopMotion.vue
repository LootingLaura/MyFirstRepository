<template>
  <div class="w-full min-h-screen flex items-end justify-center bg-transparent pb-6">
    <div class="relative w-full flex justify-center">
      <img
        v-if="frames && frames.length"
        :src="currentSrc"
        :alt="altText"
        @click="handleClick"
        class="cursor-pointer select-none rounded shadow-lg object-contain"
        :style="{ width: width, maxHeight: 'calc(100vh - 88px)' }"
      />
      <div v-else class="text-gray-500">Keine Frames verfügbar</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'

const props = withDefaults(defineProps<{
  frames?: (string | null)[]
  fps?: number
  width?: string
}>(), {
  fps: 8,
  width: '640px',
})

const frames = computed(() => {
  const f = (props.frames || []).filter(Boolean) as string[]
  if (f.length) return f

  // Fallback: generate four inline SVG placeholders as data URIs so the component is visible
  const makeSvgData = (i: number) => {
    const svg = `
      <svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800'>
        <rect width='100%' height='100%' fill='hsl(${(i * 60) % 360} 70% 55%)' />
        <text x='50%' y='50%' font-size='48' fill='white' text-anchor='middle' dominant-baseline='middle'>Frame ${i + 1}</text>
      </svg>`
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
  }

  return [0, 1, 2, 3].map(i => makeSvgData(i))
})
const altText = 'stop motion frame'

const index = ref(0)
const isPlaying = ref(false)
const direction = ref(1) // 1 = forward, -1 = reverse
let timer: number | null = null
const preloaded: Array<HTMLImageElement | null> = []

async function preloadAll(): Promise<void> {
  const urls = frames.value
  const promises = urls.map((u, i) => {
    return new Promise<void>((resolve) => {
      if (preloaded[i]) return resolve()
      const img = new Image()
      img.src = u
      img.onload = () => {
        preloaded[i] = img
        resolve()
      }
      img.onerror = () => {
        preloaded[i] = null
        resolve()
      }
    })
  })
  // wait for all, but don't reject on errors
  await Promise.all(promises)
}

const currentSrc = computed(() => frames.value[index.value] || '')

function clearTimer() {
  if (timer !== null) {
    clearInterval(timer)
    timer = null
  }
}

async function playOnce(dir = 1) {
  if (frames.value.length === 0) return
  isPlaying.value = true
  const len = frames.value.length
  const frameTime = Math.max(150, Math.round(1000 / props.fps))
  // ensure frames are preloaded so intermediate frames render
  await preloadAll()
  // Ensure we start at correct end when playing reverse
  if (dir === 1) index.value = 0
  else index.value = len - 1

  clearTimer()
  timer = window.setInterval(() => {
    if (dir === 1) {
      if (index.value >= len - 1) {
        clearTimer()
        isPlaying.value = false
        // toggle direction for next click
        direction.value = -direction.value
      } else {
        index.value += 1
      }
    } else {
      if (index.value <= 0) {
        clearTimer()
        isPlaying.value = false
        direction.value = -direction.value
      } else {
        index.value -= 1
      }
    }
  }, frameTime)
}

function handleClick() {
  if (isPlaying.value) return
  // Play in current direction (start forward by default)
  playOnce(direction.value)
}

// expose currentSrc for debugging or external use
watch(frames, (f) => {
  if (!f.length) {
    index.value = 0
    clearTimer()
    isPlaying.value = false
  }
})

// notify listeners (e.g. NavBar) about which frame is currently shown
watch(index, (n) => {
  if (typeof window !== 'undefined') {
    const src = currentSrc.value || ''
    window.dispatchEvent(new CustomEvent('stopmotion:frame', { detail: { index: n, src } }))
  }
})

onMounted(() => {
  if (typeof window !== 'undefined') {
    const src = currentSrc.value || ''
    window.dispatchEvent(new CustomEvent('stopmotion:frame', { detail: { index: index.value, src } }))
  }
})
</script>

<style scoped>
.stopmotion-overlay {
  /* optional styles */
}
</style>
