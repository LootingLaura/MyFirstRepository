/// <reference types="node" />  // 👈 add this line if you use TypeScript

import { defineConfig } from 'vitepress'

// VitePress config runs in Node, so process.env is available
const isProd = process.env.NODE_ENV === 'production'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Portfolio',
  description: 'A VitePress Site',

  // ✅ dev: '/', prod (GitHub Pages): '/my-awsome-portfolio/'
  base: isProd ? '/my-awsome-portfolio/' : '/',

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'about', link: '/about' },
      { text: 'works', link: '/works' }
    ]
  },

  head: [
    [
      'link',
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans&family=IBM+Plex+Serif&display=swap'
      }
    ]
  ]
})
