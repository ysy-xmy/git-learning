<template>
	<el-select v-model="selectedValue" filterable clearable remote reserve-keyword placeholder="请选择"
		:remote-method="remoteMethod" @visible-change="handleVisibleChange" :multiple="props.multiple">
		<el-option class="select-option" v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
		<el-option v-if="loading" :disabled="true" class="loading-option">
			<el-icon><Loading /></el-icon> 加载中...
		</el-option>
	</el-select>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Loading } from '@element-plus/icons-vue';

interface Option {
	value: string | number;
	label: string;
}

interface FetchParams {
	page: number;
	keyword: string;
}

interface Props {
	multiple?: boolean;
	fetchData: (params: FetchParams) => Promise<{ data: Option[] }>;
}

const props = withDefaults(defineProps<Props>(), {
	multiple: false,
});

const selectedValue = ref<string | number | (string | number)[]>("");
const loading = ref(false);
const options = ref<Option[]>([]);
const page = ref(1);
const hasMore = ref(true);
const keyword = ref("");

const selectDropdown = ref<HTMLElement | null>(null);

const handleVisibleChange = (visible: boolean) => {
	if (visible) {
		setTimeout(() => {
			selectDropdown.value = document.querySelector('.el-select-dropdown__wrap');
			if (selectDropdown.value) {
				selectDropdown.value.addEventListener('scroll', handleScroll);
			}
		}, 100);
	} else {
		if (selectDropdown.value) {
			selectDropdown.value.removeEventListener('scroll', handleScroll);
			selectDropdown.value = null;
		}
	}
};

const handleScroll = (e: Event) => {
	const target = e.target as HTMLElement;
	const { scrollTop, scrollHeight, clientHeight } = target;

	if (scrollHeight - scrollTop - clientHeight < 30) {
		if (!loading.value && hasMore.value) {
			loadMore();
		}
	}
};

const loadMore = async () => {
	if (loading.value) return;
	loading.value = true;
	try {
		const res = await props.fetchData({
			page: page.value,
			keyword: keyword.value,
		});

		if (res.data && res.data.length) {
			options.value = [...options.value, ...res.data];
			page.value++;
		} else {
			hasMore.value = false;
		}
	} catch (error) {
		console.error("加载数据失败：", error);
	} finally {
		loading.value = false;
	}
};

const remoteMethod = async (query : string = '') => {
		page.value = 1;
		keyword.value = query;
		hasMore.value = true;
		options.value = [];
		await loadMore();
};

loadMore();

</script>
