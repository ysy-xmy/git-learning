<template>
    <El-button type="primary" @click="showDialog">打开弹窗</El-button>
    <DialogBase />
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import DialogBase from './dialog-base.vue'

</script>