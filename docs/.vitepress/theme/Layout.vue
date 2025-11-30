<script setup lang="ts">
import { useData, useRoute } from 'vitepress'
import NavBar from './components/NavBar.vue'
import ProposalPage from './components/ProposalPage.vue'
import ProposalStack from './components/ProposalStack.vue'
import AboutPage from './components/AboutPage.vue'
// import P5Sketch from './components/P5Sketch.vue'
import { computed } from 'vue'

const { frontmatter } = useData()
const route = useRoute()

const currentPageComponent = computed(() => {
  if (frontmatter.value.layout === 'home') return ProposalStack
  if (route.path.startsWith('/works/')) return ProposalPage
  if (route.path.startsWith('/about')) return AboutPage
  return null
})
</script>

<template>

  <div class="min-h-screen font-plexsans bg-stone-200 text-black">
    
    <!-- Global p5 background -->
    <!-- <P5Sketch :sketch="exampleSketch" fullPage /> -->

    <NavBar />
    <main>
      
      <component
        v-if="currentPageComponent"
        :is="currentPageComponent"
        :key="route.path"
      />
      <Content
        v-else
        class="prose prose-stone dark:prose-invert max-w-none px-6 py-12"
      />
      
    </main>
  </div>
</template>
