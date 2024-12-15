<template>
  <el-button type="primary" @click="focusInput">聚焦输入框</el-button>
  <xmy-input ref="xmyInputRef" v-model="inputValue" placeholder="请输入内容" >
    <template #suffix>
      <el-icon :size="20" color="#999"><Close /></el-icon>
    </template>
    <template #prefix>
      <el-icon class="cursor-pointer" :size="20" color="#999"><Search /></el-icon>
    </template>
  </xmy-input>
</template>
<script setup lang="ts">
import { Search } from '@element-plus/icons-vue';
import XmyInput from './xmy-input.vue'
import { ref,onMounted } from 'vue'
const xmyInputRef = ref()
const inputValue = ref('')
onMounted(()=>{
})
const focusInput = ()=>{
  //因为是子组件的ref，不需要判空，直接访问，父组件都出来了，子组件就能拿到
  xmyInputRef.value.inputProps.focus()
}
</script>

