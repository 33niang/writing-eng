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
const popupRef = ref(null);
const popupPositionClass = ref('show-above');
const instance = getCurrentInstance();

const handleClick = () => {
  if (isChineseVisible.value) {
    hide();
    activeBilingual.clearActive();
  } else {
    show();
  }
};

const show = () => {
  activeBilingual.setActive(instance.proxy);
  isChineseVisible.value = true;
};

const hide = () => {
  isChineseVisible.value = false;
};
defineExpose({ hide });

watch(isChineseVisible, async (newValue) => {
  if (newValue) {
    await nextTick();
    if (containerRef.value && popupRef.value) {
      const containerRect = containerRef.value.getBoundingClientRect();
      const popupHeight = popupRef.value.offsetHeight;
      const margin = 10;
      if (containerRect.top < popupHeight + margin) {
        popupPositionClass.value = 'show-below';
      } else {
        popupPositionClass.value = 'show-above';
      }
    }
  }
});

const handleGlobalClick = () => {
  activeBilingual.clearActive();
};

onMounted(() => {
  document.addEventListener('click', handleGlobalClick);
});

onUnmounted(() => {
  document.removeEventListener('click', handleGlobalClick);
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
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 10px 15px;
  width: max-content;
  max-width: 450px;
  font-size: 0.9em;
  color: #333;
  text-align: left;
  line-height: 1.6;
}

.chinese-text.show-above {
  bottom: 130%;
}

.chinese-text.show-below {
  top: 130%;
}
</style>
