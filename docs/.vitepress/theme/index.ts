import DefaultTheme from "vitepress/theme-without-fonts";
import CustomLayout from "./CustomLayout.vue";
import Layout from "./Layout.vue";
import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client'
import '@shikijs/vitepress-twoslash/style.css'
import './styles/vars.css'
import './styles/landing.css'

// Import Tailwind entry for the theme. Replace or remove `custom.css` styles as you migrate.
import "./tailwind.css";

export default {
  extends: DefaultTheme,
  Layout: CustomLayout,
  enhanceApp({ app }) {
    app.use(TwoslashFloatingVue)
    // ...
  }
} satisfies Theme
