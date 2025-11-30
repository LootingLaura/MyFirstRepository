<script setup lang="ts">
import { useData, useRoute } from 'vitepress'
import NavBar from './components/NavBar.vue'
import ProposalPage from './components/ProposalPage.vue'
import ProposalStack from './components/ProposalStack.vue'
import AboutPage from './components/AboutPage.vue'
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

    <NavBar />
    <main class="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
      
      <component
        v-if="currentPageComponent"
        :is="currentPageComponent"
        :key="route.path"
      />
      <Content
        v-else
        class="prose prose-base md:prose-lg lg:prose-xl max-w-none mt-8"
      />
      
    </main>
  </div>
</template>
