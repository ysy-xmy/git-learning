<template>
  <button
    class="el-button"
    :disabled="buttonDisabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    :class="[
      type ? 'el-button--' + type : 'el-button--default',
      buttonSize ? 'el-button--' + buttonSize : '',
      {
        'is-disabled': buttonDisabled,
        'is-loading': loading,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle
      }
    ]"
  >
    <el-icon class="el-icon-loading" v-if="loading"><Loading /></el-icon>
    <i :class="icon" v-if="icon && !loading"></i>
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>

<script lang="ts">
import { ElButton } from 'element-plus';
import { Loading } from '@element-plus/icons-vue';

export default {
  extends: ElButton,
  created() {
    console.log('ElButton properties:', this.$props);
    console.log('ElButton methods:', this.$attrs);

  },
}
</script>