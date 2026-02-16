<template>
  <div class="audio-player-wrapper">
    <audio 
      ref="audioElement" 
      data-plyr 
      type="audio/wav"
    >
      <source :src="src" type="audio/wav">
      Your browser does not support the audio element.
    </audio>
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

const audioElement = ref(null)

onMounted(() => {
  if (audioElement.value) {
    new Plyr(audioElement.value, {
      controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'settings']
    })
  }
})
</script>

<style scoped>
.audio-player-wrapper {
  margin: 2.5rem 0;
}
</style>
