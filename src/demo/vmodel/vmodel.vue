<template>
    <XmyInput v-model:title="inputValue" @change="handleInputChange"></XmyInput>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import XmyInput from './xmy-input.vue';
const inputValue = ref('')
const handleInputChange = () => {
    console.log(inputValue.value)
}
</script>