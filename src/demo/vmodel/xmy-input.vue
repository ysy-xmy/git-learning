<template>
    自定义组件实现一个v-model:<br>
    <el-text class="mx-1" size="large">{{ input }}</el-text>

    <el-input  v-model="input" @input="changeInput" style="width: 240px" placeholder="Please input" />
</template>
<script setup lang="ts">
import { ref,defineEmits } from 'vue'
const props = defineProps({
    title: {
        type: String,
        default: ''
    }
})
const input = ref('')//获取输入框的值，本地一个变量，可以经过处理再给

const changeInput = (e: any) => {
    console.log(e)
    emit('update:title', input.value)
    emit('change')
}
const emit =defineEmits(['update:title','change'])//更新这个title值
</script>