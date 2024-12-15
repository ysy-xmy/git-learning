<template>
    <div>
        <el-tag v-for="(item, index) in statusArray" class="mx-4 py-1 mb-1" :key="index"  size="large" :style="{ backgroundColor: getColorByStatus(item), color: '#FFFFFF' }">
            <span class="transfer-item" >
                <span class="transfer-item--label">
                    状态:
                </span>
                <span class="transfer-item--type">
                    {{ getStatusText(item) }}
                </span>
            </span>
        </el-tag>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

type Color = string
const color = ref<Color>('red')
const statusId = ref<number>(2)
const statusArray = ref<number[]>([
    1, 2, 3, 4, 5, 6, 7
])
const statusColors = [
    { id: 1, color: '#FF4C4C', desc: '待审核' },  // 鲜红色
    { id: 2, color: '#4CAF50', desc: '已审核' },  // 绿色
    { id: 3, color: '#2196F3', desc: '进行中' },  // 蓝色
    { id: 4, color: '#FFA500', desc: '已完成' },  // 橙色
    { id: 5, color: '#9B59B6', desc: '已取消' },  // 紫色
    { id: 6, color: '#00BCD4', desc: '待付款' },  // 青色
    { id: 7, color: '#795548', desc: '付款完成' },  // 棕色
];

// 根据状态 ID 获取对应的颜色
function getColorByStatus(id: number): string {
    const status = statusColors.find(item => item.id === id);
    return status ? status.color : '#CCCCCC'; // 默认颜色为灰色
}

// 根据状态 ID 获取对应的状态文本
function getStatusText(id: number): string {
    const status = statusColors.find(item => item.id === id)?.desc;
    return status ? status : '未知状态'; // 默认状态文字为未知状态
}
</script>
