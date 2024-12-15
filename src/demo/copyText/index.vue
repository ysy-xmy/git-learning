<template>
	<span @click="copyText(text)">{{ text }}</span>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage } from 'element-plus'; // 引入 ElMessage

const text = ref('要复制的文本');

const copyText = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text); // 使用 Clipboard API 复制文本
    ElMessage.success('复制成功'); // 成功提示
  } catch (error) {
    ElMessage.error('复制失败'); // 失败提示
  }
}

</script>

<style>
/* 根据需要添加样式 */
</style>
