<template>
	<div class="text-ellipsis">
		<p class="text-single-line">单行文本省略 22222222222222222222222222222222222222222222222222222222222222222222
			22222222222222222222222222222222222222222222222222222222222222222222
			22222222222222222222222222222222222222222222222222222222222222222222
		</p>
		<p class="text-more-line">n行文本省略222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222</p>
	</div>
</template>
<style scoped>
.text-ellipsis{
	width: 100%;
}

.text-single-line {
	width: 100%;
	text-overflow: ellipsis;
	white-space: nowrap;
	word-wrap: normal;
	overflow: hidden;
}

.text-more-line {
  display: -webkit-box; 
  -webkit-box-orient: vertical; 
  -webkit-line-clamp: 2; 
  overflow: hidden;
  text-overflow: ellipsis; 
  word-wrap: break-word;
  word-break: normal;
}

</style>