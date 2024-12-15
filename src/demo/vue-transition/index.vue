<template>
  <div>
    <el-button type="primary" @click="show = !show">Toggle</el-button>
    <transition name="fade">
      <p v-if="show">Hello Vue!</p>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true
    };
  }
};
</script>

<style>
/* 进入过渡的开始状态 */
.fade-enter-from {
  opacity: 0;
}

/* 进入过渡的结束状态 */
.fade-enter-to {
  opacity: 1;
}

/* 离开过渡的开始状态 */
.fade-leave-from {
  opacity: 1;
}

/* 离开过渡的结束状态 */
.fade-leave-to {
  opacity: 0;
}

/* 定义进入和离开过渡的时间曲线 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>