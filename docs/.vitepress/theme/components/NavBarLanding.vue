<script setup lang="ts">
import { useData, withBase } from 'vitepress'
import { ref, onMounted, onBeforeUnmount } from 'vue'

const { theme } = useData()
const nav = theme.value.nav || []

const showNav = ref(true)

function handleFrameEvent(e: Event) {
  const detail = (e as CustomEvent)?.detail || {}
  const src: string = detail.src || ''
  // show only when the stopmotion frame filename ends with 04.png
  showNav.value = !!src && src.endsWith('04.png')
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('stopmotion:frame', handleFrameEvent as EventListener)
  }
})

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('stopmotion:frame', handleFrameEvent as EventListener)
  }
})
</script>

<template>
  <header v-show="showNav" class="fixed top-0 left-0 right-0 z-50 h-screen flex flex-col items-center justify-between bg-transparent pt-12 pb-70">
    <div class="text-8xl tracking-tight text-center" style="font-family: 'Rubik', sans-serif; font-weight: 300; text-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);">
      Laura Eiermanns
    </div>

    <nav class="flex flex-col items-center justify-center gap-8">
      <ul class="flex flex-col gap-4 text-sm font-medium items-center">
        <li
          v-for="item in nav"
          :key="item.link"
        >
          <a
            :href="withBase(item.link)"
            class="px-3 py-1 rounded-full border border-black hover:bg-black hover:text-white transition"
          >
            {{ item.text }}
          </a>
        </li>
      </ul>
    </nav>
  </header>
</template>
