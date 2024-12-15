<template>
  <div class="rich-editor--container">
    <div class="rich-editor--toolbar" ref="toolbarEl">
      <select class="ql-header">
        <option value="1"></option>
        <option value="2"></option>
        <option value="3"></option>
        <option value="false"></option>
      </select>

      <button class="ql-bold"></button>
      <button class="ql-italic"></button>
      <button class="ql-underline"></button>

      <button class="ql-list" value="ordered"></button>
      <button class="ql-list" value="bullet"></button>
      <button class="ql-list" value="check"></button>

      <select class="ql-align"></select>
      <select class="ql-color"></select>
      <select class="ql-background"></select>

      <button class="ql-code-block"></button>
      <button class="ql-blockquote"></button>

      <button class="ql-clean"></button>
    </div>
    <div class="rich-editor--main" ref="editorEl"></div>
  </div>
</template>

<script setup lang="ts">
import throttle from 'lodash/throttle'
import Quill from 'quill'
import './quill-style'
import   { ref, computed, defineEmits, onMounted, watchEffect } from 'vue'
const props = withDefaults(
  defineProps<{
    value: string
    wait?: number
  }>(),
  {
    wait: 50
  }
)

const emits = defineEmits(['input', 'text-change', 'selection-change', 'editor-change'])

const editorEl = ref<null | HTMLElement>(null)
const toolbarEl = ref<null | HTMLElement>(null)

const quill = ref<null | Quill>(null)
const quillRoot = computed<HTMLDivElement | null>(() => quill.value?.root || null)

const currentHtml = ref('')

const initEditor = () => {
  if (!editorEl.value) throw new Error('editorEl is null')
  if (!toolbarEl.value) throw new Error('toolbarEl is null')

  quill.value = new Quill(editorEl.value, {
    theme: 'snow',
    modules: {
      toolbar: toolbarEl.value
    }
  })

  quill.value.on('text-change', textChangeListen)
  quill.value.on('selection-change', selectionChangeListen)
  quill.value.on('editor-change', editorChangeListen)

  setTimeout(updateToolbarIcon)
}

const updateToolbarIcon = () => {
  if (toolbarEl.value) {
    const cleanEl = toolbarEl.value.querySelector('.ql-clean')
    if (cleanEl) cleanEl.innerHTML = '<i class="pix-icon-clear1" />'
  }
}

const getQuillHtml = () => {
  return quillRoot.value?.innerHTML || ''
}

const setQuillHtml = (html: string) => {
  if (quillRoot.value) {
    quillRoot.value.innerHTML = html
  }
}

const setCurrentHtml = (html = '') => {
  if (!quill.value) return

  currentHtml.value = getQuillHtml()
  if (currentHtml.value === html) return

  currentHtml.value = html
  setQuillHtml(html)
}

const updateCurrentHtml = () => {
  if (!quill.value) return

  const newHtml = getQuillHtml()
  if (currentHtml.value === newHtml) return

  currentHtml.value = newHtml
  emits('input', currentHtml.value)
}

const throttleUpdateCurrentHtml = throttle(updateCurrentHtml, props.wait, {
  leading: true,
  trailing: true
})

const textChangeListen = () => {
  emits('text-change')
  throttleUpdateCurrentHtml()
}

const selectionChangeListen = () => {
  emits('selection-change')
  throttleUpdateCurrentHtml()
}

const editorChangeListen = () => {
  emits('editor-change')
  throttleUpdateCurrentHtml()
}

const inputValue = computed(() => props.value)
watchEffect(() => setCurrentHtml(inputValue.value))

onMounted(() => {
  initEditor()
})
</script>

<style>
.rich-editor--container {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.rich-editor--toolbar {
  box-sizing: border-box;
  background-color: #fff;


}
.ql-clean {
    font-size: 14px;
    color: #444;
  }
.rich-editor--main {
  flex: 1;
  height: 0;
  box-sizing: border-box;
  background-color: #fff;
}
</style>
