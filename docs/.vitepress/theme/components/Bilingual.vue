<template>
  <span class="bilingual-container" ref="bilingualRef">
    <span class="english-text" @click.stop="toggleChinese">
      <slot></slot>
    </span>

    <span v-if="isChineseVisible" class="chinese-text">
      {{ cn }}
    </span>
  </span>
</template>

<script setup>
import { ref } from 'vue';
// 导入 store
import { activeBilingual } from '../store.js';

const props = defineProps({
  cn: {
    type: String,
    required: true
  }
});

const isChineseVisible = ref(false);

// 创建一个符合 store 要求的 "实例" 对象
// store.js 的 setActive 需要一个包含 hide 方法的对象
const componentInstance = {
  hide: () => {
    isChineseVisible.value = false;
  }
};

const toggleChinese = () => {
  if (isChineseVisible.value) {
    // 如果当前是打开的, 则关闭它
    isChineseVisible.value = false;
    // 并通知 store 当前没有激活的组件了
    activeBilingual.clearActive();
  } else {
    // 如果当前是关闭的, 则激活它
    // store 会自动关闭上一个打开的组件
    activeBilingual.setActive(componentInstance);
    isChineseVisible.value = true;
  }
};

// --- 清理 ---
// 下面这些 watch 和 onUnmounted 逻辑可以删掉了
// 因为我们将使用一个全局的点击监听器来处理 "点击空白处关闭"
</script>

<style scoped>
.bilingual-container {
  position: relative;
  display: inline;
}

.english-text {
  cursor: pointer;
  border-bottom: 1px dashed #999;
  transition: background-color 0.2s;
}
.english-text:hover {
  background-color: #f0f0f0;
}

.chinese-text {
  position: absolute;
  bottom: 120%;
  left: 0;
  z-index: 10;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 10px 15px;
  width: max-content;
  max-width: 400px;
  font-size: 0.9em;
  color: #333;
  text-align: left;
}
</style>
