<template>
  <div class="waterfall-container clearfix">
    <div v-for="(column, index) in columns" :key="index" class="column">
      <div
        v-for="card in column"
        :key="card.id"
        class="card"
        :ref="(el) => setCardRef(card.id, el)"
        :style="{ height: card.height + 'px' }"
      >
        <img
          :src="card.imageUrl"
          @load="onImageLoad(card.id, $event)"
          class="card-image"
        />
        <div class="card-content">
          {{ card.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, computed } from 'vue';

interface Card {
  id: number;
  content: string;
  height: number; // 添加高度属性
  imageUrl: string; 
}

const props = defineProps<{
  cards?: Card[];
}>();

const cardRefs = ref(new Map<number, HTMLDivElement>());
const columns = ref<Card[][]>([]);

const setCardRef = (id: number, el:any) => {
  if (el) {
    cardRefs.value.set(id, el);
  }
};

const defaultHeight = 200; // 统一的默认高度

const defaultCards: Card[] = [
  { id: 1, content: 'Card 1', height: defaultHeight, imageUrl: 'https://picsum.photos/200/200?Random=1' },
  { id: 2, content: 'Card 2', height: defaultHeight, imageUrl: 'https://picsum.photos/200/300?Random=2' },
  { id: 3, content: 'Card 3', height: defaultHeight, imageUrl: 'https://picsum.photos/200/400?Random=3' },
  { id: 4, content: 'Card 4', height: defaultHeight, imageUrl: 'https://picsum.photos/200/500?Random=4' },
  { id: 5, content: 'Card 5', height: defaultHeight, imageUrl: 'https://picsum.photos/200/200?Random=5' },
  { id: 6, content: 'Card 6', height: defaultHeight, imageUrl: 'https://picsum.photos/200/600?Random=6' },
  { id: 7, content: 'Card 7', height: defaultHeight, imageUrl: 'https://picsum.photos/200/100?Random=7' },
  // ... 其他默认卡片
];

const allCards = computed(() => props.cards || defaultCards);

const calculateColumns = (cards: Card[]) => {
  const numColumns = 4; // 定义列数
  const columnHeights: number[] = Array(numColumns).fill(0);
  const newColumns: Card[][] = Array.from({ length: numColumns }, () => []);
  
  cards.forEach((card) => {
    const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
    newColumns[shortestColumnIndex].push(card);
    columnHeights[shortestColumnIndex] += card.height;
  });
  
  return newColumns;
};

const onImageLoad = (id: number, event: Event) => {
  const img = event.target as HTMLImageElement;
  const card = allCards.value.find((c) => c.id === id);
  if (card && cardRefs.value.has(id)) {
    card.height = img.naturalHeight; // 更新卡片高度为图片的实际高度
    updateColumns(); // 重新计算列
  }
};

const updateColumns = () => {
  // 重新计算 columns
  const allCardsWithUpdatedHeight = allCards.value.map(card => ({
    ...card,
    height: card.height === defaultHeight ? defaultHeight : card.height
  }));
  columns.value = calculateColumns(allCardsWithUpdatedHeight);
  console.log('columns updated')
};

onMounted(() => {
  updateColumns();
});
onBeforeUnmount(() => {
});

watch(allCards,()=>{
  updateColumns()
})
</script>

<style>
.waterfall-container {
  width: 100%;
  margin: 0 auto;
}

.column {
  float: left;
  width: 25%;
  padding: 5px;
}

.card {
  width: 100%;
  margin-bottom: 10px;
  background-color: #f0f0f0;
  padding: 10px;
  box-sizing: border-box;
  position: relative; /* 为图片定位 */
  overflow: hidden; /* 防止图片溢出 */  
}

.card-image {
  width: 100%;
  display: block; /* 防止图片下方出现空隙 */
  overflow: hidden; /* 防止图片溢出 */

}

.card-content {
  position: absolute;
  bottom: 0;
  left: 10px;
  right: 10px;
  background-color: rgba(255, 255, 255, 0.8); /* 半透明背景 */
  padding: 5px;
  box-sizing: border-box;
}

.clearfix::after {
  content: "";
  display: block;
  clear: both;
}

@media screen and (max-width: 1024px) {
  .column {
    width: 33.33%;
  }
}

@media screen and (max-width: 768px) {
  .column {
    width: 50%;
  }
}
@media screen and (max-width: 480px) {
  .column {
    width: 100%;
  }
}
</style>
