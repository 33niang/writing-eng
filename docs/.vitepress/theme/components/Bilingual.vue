<template>
  <span class="bilingual-container" ref="containerRef">
    <span class="english-text" @click.stop="handleClick">
      <slot></slot>
    </span>

    <span v-if="isChineseVisible" class="chinese-text" :class="popupPositionClass" ref="popupRef">
      {{ cn }}
    </span>
  </span>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, nextTick, getCurrentInstance } from 'vue';
import { activeBilingual } from '../store.js';

const props = defineProps({
  cn: {
    type: String,
    required: true
  }
});

const isChineseVisible = ref(false);
const containerRef = ref(null);
const popupRef = ref(null); // 新增: 用于获取弹窗本身
const popupPositionClass = ref('show-above'); // 默认在上方
const instance = getCurrentInstance(); // 获取当前组件的唯一实例

// 核心逻辑：处理点击事件
const handleClick = () => {
  if (isChineseVisible.value) {
    // 如果当前翻译是打开的，就关闭它
    hide();
    activeBilingual.clearActive();
  } else {
    // 如果是关闭的，就打开它
    show();
  }
};

// 显示翻译的逻辑
const show = () => {
  // 先通过全局管理器关闭其他任何已打开的翻译
  activeBilingual.setActive(instance);
  isChineseVisible.value = true;
};

// 隐藏翻译的逻辑 (暴露给外部调用)
const hide = () => {
  isChineseVisible.value = false;
};
defineExpose({ hide });


// 监视翻译框的显示/隐藏状态
watch(isChineseVisible, async (newValue) => {
  if (newValue) {
    // --- 智能定位逻辑 (已升级) ---
    // 等待DOM更新，确保弹窗元素已创建
    await nextTick();
    
    if (containerRef.value && popupRef.value) {
      const containerRect = containerRef.value.getBoundingClientRect();
      const popupHeight = popupRef.value.offsetHeight; // 获取弹窗的实际高度
      const margin = 10; // 留一点边距

      // 如果英文文本距离视口顶部的距离 < 弹窗高度 + 边距
      // 这意味着弹窗显示在上方会超出屏幕
      if (containerRect.top < popupHeight + margin) {
        // 就切换到下方显示
        popupPositionClass.value = 'show-below';
      } else {
        // 否则，在上方显示
