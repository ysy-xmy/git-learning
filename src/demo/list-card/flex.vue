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
	{ title: "项目 6", description: "这里是项目 6 的描述。" },
  { title: "项目 7", description: "这里是项目 7 的描述。" },
  { title: "项目 8", description: "这里是项目 8 的描述。" },
  { title: "项目 9", description: "这里是项目 9 的描述。" },
  { title: "项目 10", description: "这里是项目 10 的描述。" },
  // ...更多卡片数据
]);
</script>

<template>
  <div class="flex-container">
    <div v-for="(card, index) in cardsData" :key="index" class="flex-item">
      <h3>{{ card.title }}</h3>
      <p>{{ card.description }}</p>
    </div>
  </div>
</template>

<style scoped>
.flex-container {
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  flex-wrap: wrap;
  padding: 10px;
  margin: -10px;
}

.flex-item {
  flex: 1 1 300px;
  margin: 10px;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
  text-align: center;
}

.flex-item:hover {
  transform: translateY(-5px);
}

.flex-item h3 {
  margin-top: 0;
  font-size: 18px;
  color: #333;
}

.flex-item p {
  font-size: 14px;
  color: #666;
  margin-bottom: 0;
}
</style>
