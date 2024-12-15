<template>
  <XmyButton @click="handleClick"  size="small" type="info" ref="xmyButtonRef">click</XmyButton>
</template>
<script setup lang="ts">
import XmyButton from './xmy-button.vue'
import { ref,onMounted } from 'vue'
const xmyButtonRef = ref()
const handleClick = () => {
  console.log('click')
}
onMounted(()=>{
  console.log(xmyButtonRef.value)
})
</script>