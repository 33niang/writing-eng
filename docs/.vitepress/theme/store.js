// docs/.vitepress/theme/store.js

import { reactive } from 'vue';

// 这个响应式对象会追踪当前哪个翻译组件是打开的
export const activeBilingual = reactive({
  // 当前激活的组件实例
  instance: null,

  // 设置一个新的组件为激活状态
  setActive(instance) {
    // 如果已经有一个不同的组件是打开的, 就先把它关掉
    if (this.instance && this.instance !== instance) {
      this.instance.hide();
    }
    this.instance = instance;
  },

  // 清除所有激活的组件 (例如点击页面空白处时调用)
  clearActive() {
    if (this.instance) {
      this.instance.hide();
      this.instance = null;
    }
  }
});
