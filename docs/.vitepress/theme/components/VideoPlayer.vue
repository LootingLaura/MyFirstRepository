<template>
  <div class="video-player-wrapper">
    <video 
      ref="videoElement" 
      data-plyr 
      type="video/mp4"
      controls
    >
      <source :src="src" type="video/mp4">
      Your browser does not support the video element.
    </video>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Plyr from 'plyr'

const props = defineProps({
  src: {
    type: String,
    required: true
  }
})

const videoElement = ref(null)

onMounted(() => {
  if (videoElement.value) {
    new Plyr(videoElement.value, {
      controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'settings', 'fullscreen'],
      ratio: '16:9'
    })
  }
})
</script>

<style scoped>
.video-player-wrapper {
  margin: 2.5rem 0;
}
</style>
