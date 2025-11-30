<template>
  <nav class="bg-white/90 border-b border-gray-200 sticky top-0 z-50 backdrop-blur">
    <div class="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
      <!-- Site title -->
     <a
        href="/"
        class="text-2xl sm:text-4xl underline decoration-wavy decoration-red-500 decoration-1 hover:opacity-80 transition"
      >
        {{ site.title }}
      </a>

      <!-- Mobile menu button -->
      <button
        @click="toggleMenu"
        class="sm:hidden text-3xl focus:outline-none"
        aria-label="Toggle menu"
      >
        ☰
      </button>

      <!-- Navigation links -->
      <ul
  :class="[
    'text-xl sm:flex sm:space-x-6',
    isMenuOpen
      ? 'block absolute bg-white border border-gray-300 p-4 top-16 right-4 rounded-lg shadow-lg space-y-2'
      : 'hidden',
    'sm:static sm:bg-transparent sm:border-0 sm:shadow-none sm:top-auto sm:right-auto sm:space-y-0'
  ]"
>

        <li class="mb-2 sm:mb-0">
          <a :href="'/'" :class="navLinkClass('/')">Home</a>
        </li>
        <li>
          <a :href="'/about'" :class="navLinkClass('/about')">About</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useData } from 'vitepress'

const { site } = useData()
const route = useRoute()
const isMenuOpen = ref(false)

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function navLinkClass(path) {
  const base = 'text-xl transition'
  const active = 'underline decoration-wavy decoration-red-500 decoration-1'

  if (path === '/') {
    return route.path === '/' ? `${base} ${active}` : base
  }

  return route.path.startsWith(path) ? `${base} ${active}` : base
}
</script>
