/// <reference types="node" />  // 👈 keep this if you use TypeScript

import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Portfolio',
  description: 'A VitePress Site',

  // Custom domain (lauraeiermanns.com) serves from root
  base: '/',

  themeConfig: {
    nav: [
      // ❌ no BASE_URL here, just plain paths
      { text: 'home', link: '/' },
      { text: 'about', link: '/about/' },
      { text: 'works', link: '/works/' },
    ],
  },

  head: [
    [
      'link',
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Inter&family=Jost:wght@300&display=swap'
      }
    ]
  ]
})
