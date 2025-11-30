import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Portfolio",
  description: "A VitePress Site",
  base: (import.meta as any).env && (import.meta as any).env.PROD ? '/my-awsome-portfolio/' : '/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'about', link: '/about' },
      { text: 'works', link: '/works' }
    ],
  },
   head: [
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans&family=IBM+Plex+Serif&display=swap',
      },
    ],
  ],
})
