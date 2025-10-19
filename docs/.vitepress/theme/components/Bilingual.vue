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
import { ref, watch, onUnmounted } from 'vue';

const props = defineProps({
  cn: {
    type: String,
    required: true
  }
});

const isChineseVisible = ref(false);
const bilingualRef = ref(null);

const toggleChinese = () => {
  isChineseVisible.value = !isChineseVisible.value;
};

const handleClickOutside = (event) => {
  if (bilingualRef.value && !bilingualRef.value.contains(event.target)) {
    isChineseVisible.value = false;
  }
};

watch(isChineseVisible, (newValue) => {
  if (newValue) {
    document.addEventListener('click', handleClickOutside);
  } else {
    document.removeEventListener('click', handleClickOutside);
  }
});

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
