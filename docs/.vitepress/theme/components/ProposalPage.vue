<script setup lang="ts">
import { useRoute } from 'vitepress'
import { ref, computed } from 'vue'

const hovered = ref(null)

const markdownFiles = import.meta.glob('../../../works/**/index.md', {
  as: 'raw',
  eager: true,
})
const imageFiles = import.meta.glob('../../../works/**/cover.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
})

const cards = ref([])

const route = useRoute()
const currentPath = computed(() => route.path.replace(/\/$/, ''))

const currentCard = computed(() =>
  cards.value.find(card => card.route.replace(/\/$/, '') === currentPath.value)
)

for (const path in markdownFiles) {
  const raw = markdownFiles[path]
  const lines = raw.split('\n')

  const titleLine = lines.find(line => line.startsWith('# '))
  const nameLine = lines.find(line => line.startsWith('## '))
  const excerptLine = lines.find(line => line.trim() && !line.startsWith('#'))

  const route = path
    .replace(/^.*\/works\//, '/works/')
    .replace(/\/index\.md$/, '/')

  const folder = path.replace(/\/index\.md$/, '/')
  const imageKey = Object.keys(imageFiles).find(k => k.startsWith(folder))

  cards.value.push({
    title: titleLine?.replace(/^# /, '') || 'Untitled',
    name: nameLine?.replace(/^## /, '') || 'Anonymous',
    excerpt: excerptLine || '',
    route,
    image: imageKey ? imageFiles[imageKey] : null,
  })
}
</script>

<template>
  <div class="flex flex-col lg:flex-row min-h-[80vh] border border-gray-400 rounded-2xl overflow-hidden shadow-lg">

    <!-- Sidebar -->
    <aside class="w-full lg:w-1/4 bg-gray-100 border-r border-gray-400 p-4 space-y-4 overflow-auto">
      <h2 class="text-xl font-bold mb-2 text-gray-900">Proposals</h2>
      <ul class="space-y-3">
        <li
          v-for="card in cards"
          :key="card.route"
          class="rounded-lg transition hover:scale-[1.02]"
          :class="{ 'ring-2 ring-gray-700': currentPath === card.route.replace(/\/$/, '') }"
        >
          <a
            :href="card.route"
            class="flex items-center gap-3 p-2 rounded-lg bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            <img
              v-if="card.image"
              :src="card.image"
              alt="cover"
              class="w-12 h-12 object-cover rounded border border-gray-400"
            />
            <div>
              <div class="text-sm font-semibold text-gray-900 leading-snug">{{ card.title }}</div>
              <div class="text-xs text-gray-600">{{ card.name }}</div>
            </div>
          </a>
        </li>
      </ul>
    </aside>

    <!-- Markdown Content -->
    <section
        class="w-full bg-white lg:w-3/4 p-6 overflow-auto"
        :class="[currentPath.replaceAll('/works/', '')]"
    >
      <div v-if="currentCard?.image" class="mb-6">
        <img
          :src="currentCard.image"
          alt="cover image"
          class="w-full max-h-96 object-cover rounded border border-gray-400"
        />
      </div>
      <Content class="prose prose-base md:prose-lg max-w-none" />
    </section>

  </div>
</template>
