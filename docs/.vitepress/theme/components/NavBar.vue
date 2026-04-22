<script setup lang="ts">
import { useData, withBase, useRoute } from "vitepress";
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { Transition } from "vue";

const { theme } = useData();
const route = useRoute();
const nav = theme.value.nav || [];

const showNav = ref(false);
const activeLink = ref<string | null>(null);

// Determine active link based on current route
const currentPath = computed(() => {
  const base = theme.value.base || "/";
  return route.path.replace(base, "") || "/";
});

function handleFrameEvent(e: Event) {
  const detail = (e as CustomEvent)?.detail || {};
  const src: string = detail.src || "";
  // show only when the stopmotion frame filename ends with 04.png
  showNav.value = !!src && src.endsWith("04.png");
}

function handleLinkClick(link: string) {
  activeLink.value = link;
}

onMounted(() => {
  if (typeof window !== "undefined") {
    window.addEventListener(
      "stopmotion:frame",
      handleFrameEvent as EventListener,
    );
  }
});

onBeforeUnmount(() => {
  if (typeof window !== "undefined") {
    window.removeEventListener(
      "stopmotion:frame",
      handleFrameEvent as EventListener,
    );
  }
});
</script>

<template>
  <Transition name="navbar-fade">
    <header
      v-if="showNav"
      class="fixed top left-0 right-0 z-40 h-25 flex items-center bg-white/10 backdrop-blur-md"
    >
      <nav
        class="mx-auto w-full flex items-center justify-end px-2 py-0 sm:px-4 md:px-6 lg:px-8"
      >
        <ul
          class="flex w-full justify-end items-center gap-3 sm:gap-6 md:gap-7 px-2 sm:px-3 md:px-4 py-0 text-lg sm:text-lg md:text-xl font-medium tracking-wider"
        >
          <li v-for="item in nav" :key="item.link" class="shrink-0">
            <a
              :href="withBase(item.link)"
              class="px-5 py-2.5 sm:px-5 sm:py-2 md:px-6 md:py-2 whitespace-nowrap transition hover:bg-black"
            >
              {{ item.text }}
            </a>
          </li>
        </ul>
      </nav>
    </header>
  </Transition>
</template>

<style scoped>
.navbar-fade-enter-active,
.navbar-fade-leave-active {
  transition: opacity 0.1s ease-in-out;
}

.navbar-fade-enter-from,
.navbar-fade-leave-to {
  opacity: 0;
}
</style>
