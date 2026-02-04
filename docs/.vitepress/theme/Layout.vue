<script setup lang="ts">
import { useData, useRoute } from 'vitepress'
import NavBar from './components/NavBar.vue'
import NavBarLanding from './components/NavBarLanding.vue'
import WorkPage from './components/WorkPage.vue'
import WorkStack from './components/WorkStack.vue'
import AboutPage from './components/AboutPage.vue'
import { computed } from 'vue'

const { frontmatter, site } = useData()
const route = useRoute()

// Remove base from the path so matching works in dev & GitHub Pages
const normalizedPath = computed(() => {
  const base = site.value.base || '/'
  // ensure leading slash and strip any base prefix
  return route.path.replace(base, '/') || '/'
})

const currentPageComponent = computed(() => {
  if (frontmatter.value.layout === 'home') return WorkStack
  if (normalizedPath.value.startsWith('/works/')) return WorkPage
  if (normalizedPath.value.startsWith('/about')) return AboutPage
  return null
})

// Determine which NavBar to show
const currentNavBar = computed(() => {
  if (frontmatter.value.layout === 'home') return NavBarLanding
  return NavBar
})
</script>

<template>
  <div class="min-h-screen bg-transparent text-black" style="font-family: 'Inter', sans-serif;">
    <component :is="currentNavBar" />
    
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
