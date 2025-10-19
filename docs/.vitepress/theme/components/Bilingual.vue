<template>
  <span class="bilingual-container" ref="containerRef">
    <span class="english-text" @click.stop="toggleChinese">
      <slot></slot>
    </span>

    <span v-if="isChineseVisible" class="chinese-text" :class="popupPositionClass">
      {{ cn }}
    </span>
  </span>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, nextTick, getCurrentInstance } from 'vue';
import { activeBilingual } from '../store.js'; // 导入我们创建的共享状态

const props = defineProps({
  cn: {
    type: String,
    required: true
  }
});

const isChineseVisible = ref(false);
const containerRef = ref(null);
const popupPositionClass = ref(''); // 用于控制弹窗位置 (上方或下方)
const instance = getCurrentInstance(); // 获取当前组件的唯一实例

// 核心功能：切换中文翻译的显示
const toggleChinese = () => {
  const wasVisible = isChineseVisible.value;
  
  // 在显示任何翻译之前, 先告诉全局管理器, 当前这个组件要被激活了
  // 管理器会自动关闭上一个打开的翻译
  activeBilingual.setActive(instance.proxy);

  isChineseVisible.value = !wasVisible;
};

// 暴露一个 hide 方法, 供全局管理器调用
const hide = () => {
  isChineseVisible.value = false;
};
defineExpose({ hide });


// 监视翻译框的显示/隐藏状态
watch(isChineseVisible, async (newValue) => {
  if (newValue) {
    // 使用 nextTick 确保 DOM 元素已经渲染出来
    await nextTick();
    
    // --- 智能定位逻辑 ---
    if (containerRef.value) {
      const rect = containerRef.value.getBoundingClientRect();
      // 如果英文文本距离视口顶部太近 (小于100像素), 就在下方显示
      if (rect.top < 100) {
        popupPositionClass.value = 'show-below';
      } else {
        popupPositionClass.value = 'show-above';
      }
    }
  } else {
    popupPositionClass.value = '';
  }
});

// 处理点击页面空白区域的逻辑
const handleClickOutside = () => {
  // 当点击外部时, 调用全局管理器来关闭当前激活的翻译
  activeBilingual.clearActive();
};


// 在组件挂载时添加全局点击监听
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

// 在组件卸载时移除监听, 防止内存泄漏
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
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
  left: 0;
  z-index: 10;
  
  /* 样式 */
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 10px 15px;
  width: max-content;
  max-width: 400px;
  
  /* 字体 */
  font-size: 0.9em;
  color: #333;
  text-align: left;
}

/* 默认在上方显示 */
.chinese-text.show-above {
  bottom: 125%;
}

/* 在下方显示的样式 */
.chinese-text.show-below {
  top: 125%;
}
</style>
