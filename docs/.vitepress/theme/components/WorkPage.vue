<script setup lang="ts">
import { withBase, useRouter } from "vitepress";
import { ref, computed, onMounted } from "vue";
import StopMotion from "./StopMotion.vue";

type Card = {
  slug: string;
  title: string;
  name: string;
  excerpt: string;
  route: string; // `/works/?id=slug`
  image: string | null;
  component: any;
};

// Load stopmotion frames
const stopMotionFrames = computed(() => {
  const names = ["01.png", "02.png", "03.png", "04.png"];
  return names.map((n) => {
    try {
      return new URL(`../../public/stopmotion/${n}`, import.meta.url).href;
    } catch (e) {
      return withBase(`/stopmotion/${n}`);
    }
  });
});

// 1) Markdown as Vue components
const markdownModules = import.meta.glob("../../../works/**/index.md", {
  eager: true,
});

// 2) Raw markdown text for meta (title, name, excerpt)
const markdownFiles = import.meta.glob("../../../works/**/index.md", {
  as: "raw",
  eager: true,
});

// Images
const imageFiles = import.meta.glob(
  "../../../works/**/cover.{jpg,jpeg,png,webp}",
  {
    eager: true,
    import: "default",
  },
);

const cards = ref<Card[]>([]);

for (const path in markdownFiles) {
  const raw = markdownFiles[path] as string;
  const lines = raw.split("\n");

  const titleLine = lines.find((line) => line.startsWith("# "));
  const nameLine = lines.find((line) => line.startsWith("## "));
  const excerptLine = lines.find(
    (line) => line.trim() && !line.startsWith("#"),
  );

  // e.g. docs/works/my-work/index.md -> slug = "my-work"
  const match = path.match(/works\/([^/]+)\/index\.md$/);
  const slug = match?.[1] ?? "";

  // We stay on /works and switch via ?id=slug
  const route = `/works/?id=${slug}`;

  const folder = path.replace(/\/index\.md$/, "/");
  const imageKey = Object.keys(imageFiles).find((k) => k.startsWith(folder));

  const mod = markdownModules[path] as any;

  cards.value.push({
    slug,
    title: titleLine?.replace(/^# /, "") || "Untitled",
    name: nameLine?.replace(/^## /, "") || "Anonymous",
    excerpt: excerptLine || "",
    route,
    image: imageKey ? (imageFiles[imageKey] as string) : null,
    component: mod?.default || null,
  });
}

const router = useRouter();

// 👇 this is the *actual* selected work (undefined = show gallery)
const currentSlug = ref<string | undefined>(undefined);

// helper to read slug from current URL (?id=slug)
function getSlugFromLocation(): string | undefined {
  if (typeof window === "undefined") {
    return undefined;
  }

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  return id || undefined;
}

// initial selection when page loads (including from WorkStack)
onMounted(() => {
  currentSlug.value = getSlugFromLocation();
});

// when user clicks in the sidebar
function selectCard(slug: string, routePath: string) {
  currentSlug.value = slug;

  // keep the URL in sync (and let VitePress do SPA navigation)
  router.go(withBase(routePath));
}

const currentCard = computed(() =>
  cards.value.find((card) => card.slug === currentSlug.value),
);
</script>

<template>
  <div class="w-full relative">
    <!-- StopMotion Component - Fixed in upper left corner -->
    <StopMotion
      :frames="stopMotionFrames"
      fps="8"
      width="200px"
      class="fixed top-0 left-4 z-[60]"
    />

    <!-- Main Content -->
    <div class="w-full">
      <div
        v-if="!currentCard"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-15 mb-12"
      >
        <a
          v-for="card in cards"
          :key="card.slug"
          :href="withBase(card.route)"
          @click.prevent="selectCard(card.slug, card.route)"
          class="group overflow-hidden transition-transform duration-400 ease-out hover:scale-[1.01]"
        >
          <!-- Card Image -->
          <div class="relative h-56 bg-gray-200 overflow-hidden">
            <img
              v-if="card.image"
              :src="card.image"
              alt="cover image"
              class="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
            />
            <div
              v-else
              class="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400"
            ></div>
          </div>

          <!-- Card Content -->
          <div class="bg-white p-4 space-y-2">
            <h3
              class="text-lg font-bold text-gray-900 group-hover:text-blue-700 transition"
            >
              {{ card.title }}
            </h3>
            <p class="text-sm text-gray-600">{{ card.name }}</p>
            <p class="text-sm text-gray-500 line-clamp-2"></p>
          </div>
        </a>
      </div>

      <!-- Detail View -->
      <div v-else class="space-y-6">
        <button
          @click="currentSlug = undefined"
          class="px-4 py-2 text-sm font-medium text-white bg-gray/10 hover:bg-gray-200 transition"
        >
          to Gallery
        </button>

        <div
          class="border border-gray-300 rounded-2xl overflow-hidden shadow-lg"
        >
          <div v-if="currentCard.image" class="w-full">
            <img
              :src="currentCard.image"
              alt="cover image"
              class="w-full max-h-96 object-cover"
            />
          </div>

          <div class="p-6 bg-white">
            <!-- Render markdown component directly -->
            <component
              v-if="currentCard.component"
              :is="currentCard.component"
              class="prose prose-base md:prose-lg max-w-none"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
