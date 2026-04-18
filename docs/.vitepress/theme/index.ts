import DefaultTheme from "vitepress/theme-without-fonts";

import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client'
import '@shikijs/vitepress-twoslash/style.css'
import 'plyr/dist/plyr.css'
import './styles/vars.css'
import './styles/landing.css'
import "./tailwind.css";
import type { Theme } from "vitepress";
import Layout from './Layout.vue'
import AudioPlayer from './components/AudioPlayer.vue'
import VideoPlayer from './components/VideoPlayer.vue'
import YouTubePlayer from './components/YouTubePlayer.vue'
import ImageCarousel from './components/ImageCarousel.vue'

export default {
  Layout,
  enhanceApp({ app }) {
    app.component('AudioPlayer', AudioPlayer)
    app.component('VideoPlayer', VideoPlayer)
    app.component('YouTubePlayer', YouTubePlayer)
    app.component('ImageCarousel', ImageCarousel)
  }
} satisfies Theme
