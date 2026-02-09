<script setup lang="ts">
import { useData, withBase, useRoute } from "vitepress";
import { ref, onMounted, onBeforeUnmount, computed } from "vue";

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
  <Transition
    enter-active-class="transition duration-700 ease-out"
    enter-from-class="opacity-0 -translate-x-3"
    enter-to-class="opacity-100 translate-x-0"
    leave-active-class="transition duration-400 ease-in"
    leave-from-class="opacity-100 translate-x-0"
    leave-to-class="opacity-0 -translate-x-6"
  >
    <header
      v-if="showNav"
      class="fixed top-[62px] left-0 right-0 z-50 border-b border-transparent bg-transparent"
    >
      <nav
        class="mx-auto flex max-w-6xl items-center justify-end px-4 py-3 sm:px-6 lg:px-8"
      >
        <ul
          class="flex w-full justify-end items-center gap-4 bg-white/10 px-4 py-0 text-sm font-medium backdrop-blur-md h-1.5"
        >
          <li v-for="item in nav" :key="item.link">
            <a
              :href="withBase(item.link)"
              class="px-3 py-1 transit ion hover:bg-black"
            >
              {{ item.text }}
            </a>
          </li>
        </ul>
      </nav>
    </header>
  </Transition>
</template>
