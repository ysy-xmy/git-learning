import { createApp } from 'vue'
import './style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// import  QuillEditor  from 'vue-quill-editor' // vue3不支持vue-quill-editor
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { QuillEditor } from '@vueup/vue-quill'
import videojs from "video.js";
import "video.js/dist/video-js.css";
const app = createApp(App)

// 注册ElementPlus Icons
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 使用ElementPlus
app.use(ElementPlus)
app.config.globalProperties.$video = videojs


// 注册QuillEditor组件
app.component('QuillEditor', QuillEditor)

// 挂载应用
app.mount('#app')
