<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, computed } from 'vue'

interface Props {
  isVisible?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isVisible: true
})

const emit = defineEmits<{
  cursorClick: []
}>()

const cursorX = ref(0)
const cursorY = ref(0)
const isInHoverZone = ref(false)

const HOVER_ZONE = {
  minX: 0.33,
  maxX: 0.66,
  minY: 0.33,
  maxY: 0.66

}

const handleMouseMove = (e: MouseEvent) => {
  const vw = window.innerWidth
  const vh = window.innerHeight

  const relativeX = e.clientX / vw
  const relativeY = e.clientY / vh

  cursorX.value = e.clientX
  cursorY.value = e.clientY

  isInHoverZone.value =
    relativeX >= HOVER_ZONE.minX &&
    relativeX <= HOVER_ZONE.maxX &&
    relativeY >= HOVER_ZONE.minY &&
    relativeY <= HOVER_ZONE.maxY
}

const handleCursorClick = () => {
  emit('cursorClick')
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('pointerup', handleCursorClick)
})

const isActive = computed(() => isInHoverZone.value && props.isVisible)

watch(isActive, (val) => {
  if (val) document.body.classList.add('hide-system-cursor')
  else document.body.classList.remove('hide-system-cursor')
})

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('pointerup', handleCursorClick)
  document.body.classList.remove('hide-system-cursor')
})
</script>

<template>
  <div
    v-if="isInHoverZone && isVisible"
    class="pointer-events-none fixed z-40 cursor-none"
    :style="{
      left: `${cursorX}px`,
      top: `${cursorY}px`,
      transform: 'translate(-50%, -50%)',
      transition: 'none'
    }"
  >
    <!-- Custom Cursor Circle -->
    <div
      class="relative w-4 h-4 rounded-full flex items-center justify-center"
      style="
        box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
        backdrop-filter: blur(2px);
      "
    >
      <!-- Center dot -->
      <div class="w-1 h-1 rounded-full bg-white"></div>


    </div>
  </div>
</template>

<style scoped>
/* Custom cursor styles are applied inline and via Tailwind */
</style>
