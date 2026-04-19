<script setup lang="ts">
import { withBase } from "vitepress";
</script>

<template>
  <footer
    class="w-full border-t border-white/15 mt-16 py-6 px-4 sm:px-6 lg:px-8"
  >
    <div
      class="mx-auto w-full max-w-6xl flex items-center justify-between text-xs sm:text-sm text-white/60 tracking-wide"
    >
      <span>© 2026 LAURA EIERMANNS</span>
      <a
        :href="withBase('/impressum')"
        class="hover:text-white transition"
      >
        IMPRINT
      </a>
    </div>
  </footer>
</template>
