<script setup lang="ts">
import { ref } from 'vue';

interface Card {
  title: string;
  description: string;
}

const cardsData = ref<Card[]>([
  { title: "项目 1", description: "这里是项目 1 的描述。" },
  { title: "项目 2", description: "这里是项目 2 的描述。" },
  { title: "项目 3", description: "这里是项目 3 的描述。" },
  { title: "项目 4", description: "这里是项目 4 的描述。" },
  { title: "项目 5", description: "这里是项目 5 的描述。" },

  // ...更多卡片数据
]);
</script>

<template>
  <div class="card-container">
    <div v-for="(card, index) in cardsData" :key="index" class="card">
      <h3>{{ card.title }}</h3>
      <p>{{ card.description }}</p>
    </div>
  </div>
</template>

<style scoped>
.card-container {
  overflow: hidden; /* 清除浮动 */
}

.card {
  float: left; /* 卡片向左浮动 */
  width: 200px; /* 设置卡片宽度 */
  margin: 10px; /* 设置卡片外边距 */
  box-shadow: 0 4px 8px rgba(0,0,0,0.1); /* 添加阴影效果 */
  padding: 10px; /* 设置内边距 */
}

/* 清除浮动，确保容器可以包含浮动元素 */
.card-container::after {
  content: "";
  display: table;
  clear: both;
}
.card-container::after {
  content: "";
  display: table;
  clear: both;
  text-overflow: ellipsis;
}
</style>
