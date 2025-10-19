<template>
  <span class="bilingual-container" ref="bilingualRef">
    <span class="english-text" @click.stop="toggleChinese">
      <slot></slot> </span>

    <span v-if="isChineseVisible" class="chinese-text">
      {{ cn }}
    </span>
  </span>
</template>

<script setup>
import { ref, watch, onUnmounted } from 'vue';

// 定义组件接收的 props，这里是中文翻译
const props = defineProps({
  cn: {
    type: String,
    required: true
  }
});

const isChineseVisible = ref(false);
const bilingualRef = ref(null);

// 点击英文时切换中文的显示/隐藏
const toggleChinese = () => {
  isChineseVisible.value = !isChineseVisible.value;
};

// 点击组件外部区域时，隐藏中文翻译
const handleClickOutside = (event) => {
  if (bilingualRef.value && !bilingualRef.value.contains(event.target)) {
    isChineseVisible.value = false;
  }
};

// 监视 isChineseVisible 的变化
watch(isChineseVisible, (newValue) => {
  if (newValue) {
    // 当中文显示时，添加全局点击事件监听器
    document.addEventListener('click', handleClickOutside);
  } else {
    // 当中文隐藏时，移除监听器
    document.removeEventListener('click', handleClickOutside);
  }
});

// 组件卸载时，确保移除监听器，防止内存泄漏
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.bilingual-container {
  position: relative; /* 为绝对定位的子元素提供参考 */
  display: inline;
}

.english-text {
  cursor: pointer;
  border-bottom: 1px dashed #999; /* 给英文部分一个可点击的视觉提示 */
  transition: background-color 0.2s;
}
.english-text:hover {
  background-color: #f0f0f0;
}

.chinese-text {
  position: absolute;
  bottom: 120%; /* 显示在英文上方 */
  left: 0;
  z-index: 10;
  
  /* 样式 */
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 10px 15px;
  width: max-content; /* 宽度自适应内容 */
  max-width: 400px; /* 防止过宽 */
  
  /* 字体 */
  font-size: 0.9em;
  color: #333;
  text-align: left;
}
</style>
