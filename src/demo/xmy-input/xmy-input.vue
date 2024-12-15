<template>
  <div class="">
    <el-input ref="inputRef" v-bind="$attrs" >
    <!-- 这里利用了v-bind="$attrs"，可以实现透传属性，但是要注意的是，v-bind="$attrs"会包含原生属性，所以需要手动过滤掉 -->
    <!-- <span>{{ $attrs}}</span>-->
    <!-- <span>{{ $slots }}</span>  -->
    <template v-for="(value,name) in $slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData || {}"></slot>
    </template>
    </el-input>
  </div>
</template>
<script setup lang="ts">
import { useAttrs,useSlots,ref,onMounted,defineExpose } from 'vue';

// 使用 useAttrs 获取 $attrs
const attrs = useAttrs();
const slots = useSlots();
const inputRef = ref<HTMLInputElement | null>(null)
const inputProps = ref({})
// 打印透传的属性
console.log('上层传入的属性',attrs);
console.log('上层传入的插槽',slots);
onMounted(()=>{
  if (inputRef.value) {
    // 将 inputRef 的属性和方法赋值给 inputProps
    inputProps.value = { ...inputRef.value };
  }
})

// 使用 defineExpose 暴露 inputProps
defineExpose({
  inputProps
});
</script>
