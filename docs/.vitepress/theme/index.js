import DefaultTheme from 'vitepress/theme'
import Bilingual from './components/Bilingual.vue'
// 导入 store
import { activeBilingual } from './store.js'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // 注册全局组件, 名字叫 'Bilingual'
    app.component('Bilingual', Bilingual)

    // --- 新增 ---
    // 添加一个全局点击监听器
    // 确保只在浏览器环境中执行
    if (typeof document !== 'undefined') {
      document.addEventListener('click', () => {
        // 当点击页面的任何地方时, 调用 store 的 clearActive 方法
        activeBilingual.clearActive() //
      });
    }
  }
}
