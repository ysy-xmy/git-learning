<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ServerConnectorListItem } from '../../types/connector'
const isLoading = ref(false)
const cardsData = ref<ServerConnectorListItem[]>([])
const pageTotal = ref(0)
const queryData = reactive({
	page: 1,
	size: 14,
	connectorName: '',
	connectorFunction: '',
	connectorScene: '',
})
const functionList = ref()
const sceneList = ref()

const emitModeChange = (mode: string) => {
	emits('mode-change', mode)
}

const fetchCardData = async (resetPage = false) => {
	try {
		isLoading.value = true

		if (resetPage === true) {
			queryData.page = 1
		}
		const params = {
			page: queryData.page,
			size: queryData.size,
			connectorCategory: 3,
			connectorStatus: 1,
			connectorName: queryData.connectorName,
			connectorFunction: queryData.connectorFunction,
			connectorScene: queryData.connectorScene,
		}
		const res = await $ipaas.connectorApi.getConnectorList(params)
		cardsData.value = res.records as ServerConnectorListItem[]
		if (queryData.page === 1) {
			pageTotal.value = res.total
		}
		isLoading.value = false
	} catch (error) {
		isLoading.value = false
	}
}

const handlepageSizeChange = (pageSize: number) => {
	if (pageSize > 0) {
		queryData.size = pageSize
		fetchCardData(true)
	}
}

const handleFunctionSelect = (value: string) => {
	queryData.connectorFunction = value
	fetchCardData(true)
}

const handleSceneSelect = (value: string) => {
	queryData.connectorScene = value
	fetchCardData(true)
}

fetchCardData()
</script>