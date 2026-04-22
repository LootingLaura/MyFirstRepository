<script setup lang="ts">
import { withBase, useRouter } from "vitepress";
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
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
  return names.map((n) => withBase(`/stopmotion/${n}`));
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

// Reihenfolge der Cards in der Gallery — Slugs in gewünschter Reihenfolge
const slugOrder = ["TheSubject", "TowerOfDarkFigure", "MOI", "NoiseMachine", "Navigation", "WhitePages"];

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

// Cards nach slugOrder sortieren — nicht gelistete kommen danach
cards.value.sort((a, b) => {
  const ai = slugOrder.indexOf(a.slug);
  const bi = slugOrder.indexOf(b.slug);
  if (ai === -1 && bi === -1) return 0;
  if (ai === -1) return 1;
  if (bi === -1) return -1;
  return ai - bi;
});

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
function handlePopState() {
  currentSlug.value = getSlugFromLocation();
}

const prevAfterRouteChanged = router.onAfterRouteChange;

onMounted(() => {
  currentSlug.value = getSlugFromLocation();
  if (typeof window !== "undefined") {
    window.addEventListener("popstate", handlePopState);
  }
  router.onAfterRouteChange = (to) => {
    if (typeof prevAfterRouteChanged === "function") {
      prevAfterRouteChanged.call(router, to);
    }
    currentSlug.value = getSlugFromLocation();
  };
});

onBeforeUnmount(() => {
  if (typeof window !== "undefined") {
    window.removeEventListener("popstate", handlePopState);
  }
  router.onAfterRouteChange = prevAfterRouteChanged;
});

// when user clicks in the sidebar
function selectCard(slug: string, routePath: string) {
  currentSlug.value = slug;

  // keep the URL in sync (and let VitePress do SPA navigation)
  router.go(withBase(routePath));
}

function backToGallery() {
  currentSlug.value = undefined;
  router.go(withBase("/works/"));
}

const currentCard = computed(() =>
  cards.value.find((card) => card.slug === currentSlug.value),
);

const currentIndex = computed(() =>
  cards.value.findIndex((card) => card.slug === currentSlug.value),
);

const prevCard = computed(() => {
  const n = cards.value.length;
  if (currentIndex.value < 0 || n === 0) return undefined;
  return cards.value[(currentIndex.value - 1 + n) % n];
});

const nextCard = computed(() => {
  const n = cards.value.length;
  if (currentIndex.value < 0 || n === 0) return undefined;
  return cards.value[(currentIndex.value + 1) % n];
});
</script>

<template>
  <div class="w-full relative">
    <!-- StopMotion Component -->
    <StopMotion
      :frames="stopMotionFrames"
      :fps="8"
      width="150px"
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
          class="group overflow-hidden shadow-md transition-shadow duration-700 ease-in-out hover:shadow-2xl"
        >
          <!-- Card Image -->
          <div class="relative h-56 bg-gray-200 overflow-hidden">
            <img
              v-if="card.image"
              :src="card.image"
              alt="cover image"
              class="w-full h-full object-cover transition-all duration-700 ease-in-out opacity-80 group-hover:opacity-100 group-hover:scale-98"
              :style="card.slug === 'TowerOfDarkFigure' ? { objectPosition: '10% center' } : {}"
            />
            <div
              v-else
              class="w-full h-full bg-linear-to-br from-gray-300 to-gray-400"
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
        <div class="flex items-center justify-between gap-2">
          <button
            @click="backToGallery"
            class="px-4 py-2 text-lg font-medium text-white bg-white/20 hover:bg-white/30 transition"
          >
            back to Gallery
          </button>

          <div class="flex items-center gap-2">
            <button
              v-if="prevCard"
              @click="selectCard(prevCard.slug, prevCard.route)"
              :aria-label="`Previous work: ${prevCard.title}`"
              class="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 text-3xl md:text-4xl leading-none pb-1 md:pb-1.5 text-white bg-white/20 hover:bg-white/30 transition"
            >
              ‹
            </button>
            <button
              v-if="nextCard"
              @click="selectCard(nextCard.slug, nextCard.route)"
              :aria-label="`Next work: ${nextCard.title}`"
              class="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 text-3xl md:text-4xl leading-none pb-1 md:pb-1.5 text-white bg-white/20 hover:bg-white/30 transition"
            >
              ›
            </button>
          </div>
        </div>

        <div
          class="border border-white/10 rounded-ms overflow-hidden"
        >
          <div v-if="currentCard.image" class="w-full">
            <img
              :src="currentCard.image"
              alt="cover image"
              class="w-full max-h-96 object-cover"
              :style="currentCard.slug === 'MOI' ? { objectPosition: 'center 35%' } : currentCard.slug === 'TowerOfDarkFigure' ? { objectPosition: 'center 20%' } : {}"
            />
          </div>

          <div class="p-6 text-[#ffffff]">
            <!-- Render markdown component directly -->
            <component
              v-if="currentCard.component"
              :is="currentCard.component"
              class="prose prose-invert prose-base md:prose-lg max-w-none"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
