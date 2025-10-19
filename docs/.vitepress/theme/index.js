import DefaultTheme from 'vitepress/theme'
import Bilingual from './components/Bilingual.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // 注册全局组件, 名字叫 'Bilingual'
    app.component('Bilingual', Bilingual)
  }
}
