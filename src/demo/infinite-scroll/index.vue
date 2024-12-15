<template>
	<div class="infinite-scroll--wrapper" v-infinite-scroll="loadFn" :infinite-scroll-immediate="true"
		:infinite-scroll-distance="distance" :infinite-scroll-disabled="loadDisabled">
		<slot v-bind:list="renderList"></slot>
		<slot name="loading">
			<div class="infinite-scroll--loading" v-if="loadState === 'loading'">加载中...</div>
		</slot>
		<slot name="empty">
			<div class="infinite-scroll--empty" v-if="renderList.length === 0 && loadState !== 'loading'">
				<el-exception type="noContent" width="80px"></el-exception>
				<div class="infinite-scroll--empty-txt">暂无数据</div>
			</div>
		</slot>
	</div>
</template>

<script setup lang="ts">
import debounce from 'lodash/debounce'
import isEqual from 'lodash/isEqual'
import uniqBy from 'lodash/uniqBy'
import { ref, computed, watch, withDefaults, defineExpose } from 'vue'

const props = withDefaults(
	defineProps<{
		params: any // load 的参数
		load: (params: any) => Promise<any> // 加载数据方法
		format?: (data: any) => any // 格式化 list
		filter?: (data: any) => boolean // 过滤 list
		uniqKey?: string // list 去重 uniqBy 的属性
		distance?: number // 同 infinite-scroll-distance
		disabled?: boolean // 同 infinite-scroll-disabled
		pageProp?: string // load params 中的 page 属性
		sizeProp?: string // load params 中的 size 属性
		listKey?: string // 请求结果中 list 的属性
		defaultPage?: number // 默认的 page 值
		defaultSize?: number // 默认的 size 值
		defaultList?: any[]
	}>(),
	{
		distance: 50,
		disabled: false,
		pageProp: 'page',
		sizeProp: 'size',
		listKey: 'records',
		defaultPage: 0,
		defaultSize: 0,
		defaultList: () => []
	}
)

const emmits = defineEmits(['list-change'])

const pageIndex = ref(props.defaultPage)
const pageSize = ref(props.defaultSize)
const pageList = ref<any[]>([])

const loadState = ref<'' | 'loading' | 'nomore' | 'error'>('')
const loadDisabled = computed(() => {
	if (props.disabled) return true
	return ['nomore', 'error'].includes(loadState.value)
})

const filterFn = (list: any[]) => {
	return list.filter((data: any) => {
		if (data && props.filter) return props.filter(data)
		return data
	})
}

const renderList = computed(() => {
	let list: any[] = []
	const { uniqKey, defaultList } : any = props
	if (uniqKey) {
		// 声明 uniqKey 时, defaultList 才生效
		list = uniqBy(filterFn([...defaultList, ...pageList.value]), uniqKey)
	} else {
		list = filterFn(pageList.value)
	}
	return list.map(item => {
		return props.format ? props.format(item) : item
	})
})

watch(renderList, list => emmits('list-change', list))

const currentId = ref('')
const loadFn = async () => {
	try {
		if (loadState.value === 'loading') return
		loadState.value = 'loading'

		const loadId = ((Date.now() + Math.random()) * 10000).toString(36)
		currentId.value = loadId

		const loadParams = { ...props.params }
		loadParams[props.pageProp] = ++pageIndex.value

		const resData: any = await props.load(loadParams)
		if (currentId.value !== loadId) return

		// 兼容列表数据为 null 的场景
		let listData = props.listKey ? resData[props.listKey] : resData
		if (!Array.isArray(listData)) listData = []

		// 更新 loadState
		if (props.sizeProp) pageSize.value = loadParams[props.sizeProp]
		if (pageSize.value && pageSize.value > listData.length) {
			loadState.value = 'nomore'
		} else {
			loadState.value = ''
		}

		pageList.value.push(...listData)
	} catch (error) {
		console.error('infinite-scroll error:', error)
		loadState.value = 'error'
	}
}

const resetFn = debounce(() => {
	pageIndex.value = props.defaultPage
	pageSize.value = props.defaultSize
	pageList.value = []
	loadState.value = ''
	return loadFn()
}, 300)

// 注: 直接 watch(() => props.params)
// 拿不到实时的 oldValue !!!
const paramsData = computed(() => props.params)
watch(
	paramsData,
	(v1, v2) => {
		if (isEqual(v1, v2)) return
		resetFn()
	},
	{
		deep: true
	}
)

defineExpose({
	resetFn
})
</script>

<style lang="scss" scoped>
.infinite-scroll--wrapper {
	position: relative;
	height: 100%;
	box-sizing: border-box;
	overflow: auto;
}

.infinite-scroll--loading {
	padding: 12px;
	box-sizing: border-box;
	font-size: 12px;
	line-height: 20px;
	text-align: center;
	color: #666;
}

.infinite-scroll--empty {
	position: absolute;
	inset: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.infinite-scroll--empty-txt {
	position: absolute;
	top: 50%;
	left: 0;
	width: 100%;
	font-size: 12px;
	line-height: 20px;
	text-align: center;
	color: #999;
	transform: translateY(40px);
}
</style>