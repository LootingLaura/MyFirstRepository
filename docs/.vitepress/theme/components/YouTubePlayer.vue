<template>
  <div class="youtube-player-wrapper">
    <div class="youtube-container">
      <iframe
        ref="iframeElement"
        data-plyr
        type="video/youtube"
        :src="`https://www.youtube.com/embed/${videoId}?iv_load_policy=3`"
        allowfullscreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        title="YouTube video player"
        class="youtube-iframe"
      ></iframe>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Plyr from 'plyr'

const props = defineProps({
  url: {
    type: String,
    required: true
  }
})

const iframeElement = ref(null)

// Extract video ID from YouTube URL or use it directly if it's just the ID
const videoId = computed(() => {
  const url = props.url.trim()
  
  // If it's already just an ID
  if (url.length === 11 && !url.includes('/')) return url
  
  // Extract from youtube.com/watch?v=ID
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
  return match ? match[1] : url
})

onMounted(() => {
  if (iframeElement.value) {
    new Plyr(iframeElement.value, {
      controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'settings', 'fullscreen'],
      ratio: '16:9'
    })
  }
})
</script>

<style scoped>
.youtube-player-wrapper {
  margin: 2.5rem 0;
  width: 100%;
}

.youtube-container {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
}

.youtube-iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}</style>
