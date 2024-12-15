<template>
	<XmySelect :multiple="false" :fetchData="fetchData" />
</template>
<script setup lang="ts">
import XmySelect from "./xmy-select.vue";

const fetchData = async (params: any) => {
	await new Promise(resolve => setTimeout(resolve, 500));

	const { page = 1, keyword = "" } = params;
	
	const allData = Array.from({ length: 200 }, (_, index) => ({
		label: `选项 ${index + 1}`,
		value: index + 1
	}));

	// 模糊搜索逻辑
	const filteredData = allData.filter(item => 
		item.label.toLowerCase().includes(keyword.toLowerCase())
	);

	// 分页处理
	const pageSize = 15;
	const start = (page - 1) * pageSize;
	const end = start + pageSize;
	const data = filteredData.slice(start, end);

	// 返回数据和总数
	return {
		data,
		total: filteredData.length,
		hasMore: end < filteredData.length
	};
};
</script>
