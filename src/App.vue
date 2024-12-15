<script setup lang="ts">
import { ref } from 'vue'
import Vmodel from './demo/vmodel/vmodel.vue'
import Enum from './demo/enum/index.vue'
import Dialog from './demo/dialog/index.vue'
import RichEditor from './demo/rich-editor/index.vue'
import ListCardFlex from './demo/list-card/flex.vue'
import ListCardFloat from './demo/list-card/float.vue'
import ListCardWaterfall from './demo/list-card/waterfall.vue'
import Vuetransition from './demo/vue-transition/index.vue'
import TextEllipsis from './demo/text-ellipsis/index.vue'
import CopyText from './demo/copyText/index.vue'
import SelectLoadmore from './demo/select-loadmore/index.vue'
import XmyInput from './demo/xmy-input/index.vue'
import XmyButton from './demo/xmy-button/index.vue'
import VideoPlayer from './demo/videoPlayer/index.vue'
import VideoList from './demo/video-list/index.vue'
const activeNames = ref([])
const handleCollapseChange = (val: string[]) => {
}
type demo = {
  name: string
  title: string
  component: any
}
const demoList = ref<demo[]>([
  {
    name: 'v-model',
    title: 'v-model的原理实现🫡',
    component: Vmodel
  },
  {
    name: 'enum',
    title: '枚举类型渲染🥲',
    component: Enum
  },
  {
    name: 'dialog',
    title: '弹窗组件实现🤔',
    component: Dialog
  },
  {
    name: 'rich-editor',
    title: '富文本编辑器实现🤓',
    component: RichEditor
  },
  {
    name: 'list-card-flex',
    title: '列表卡片布局实现flex🤫',
    component: ListCardFlex
  },
  {
    name: 'list-card-float',
    title: '列表卡片布局实现float🤭',
    component: ListCardFloat
  },
  {
    name: 'list-card-waterfall',
    title: '列表卡片布局实现waterfall🤮',
    component: ListCardWaterfall
  },
  {
    name: 'vue-transition',
    title: 'vue动画实现🤯',
    component: Vuetransition
  },
  {
    name: 'text-ellipsis',
    title: '文本省略号实现🥵',
    component: TextEllipsis
  },
  {
    name: 'copy-text',
    title: '复制文本实现🥶',
    component: CopyText
  },
  {
    name: 'select-loadmore',
    title: '下拉加载更多实现🤒',
    component: SelectLoadmore
  },
  {
    name: 'xmy-input',
    title: '二次开发第三方组件🫥',
    component: XmyInput
  },
  {
    name: 'xmy-button',
    title: '二次开发第三方组件🤢',
    component: XmyButton
  },
  {
    name: 'video-player',
    title: '视频播放器实现🙃',
    component: VideoPlayer
  },
  {
    name: 'video-list',
    title: '视频展示列表🙂',
    component: VideoList
  }
])
</script>
<template>
  <div class="contain">
    <div class="header">
      <h1 class="header-title text-2xl font-extrabold tracking-wide mt-5">🥰小木鱼的demo🥰</h1>
    </div>
    <el-divider />

    <div class="main md:px-10 px-5">
      <el-collapse v-model="activeNames" @change="handleCollapseChange">
        <el-collapse-item  v-for="(item, index) in demoList" :key="index" :name="item.name">
          <template #title>
            <h2 class="demo-item-title">
              <el-icon>
                <CollectionTag />
              </el-icon>
              {{ item.title }}
            </h2>
          </template>
          <template #default>
            <div class="demo-item-content">
              <component v-if="item.component" :is="item.component" />
            </div>
          </template>
        </el-collapse-item>

      </el-collapse>
    </div>
  </div>

</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.contain {
  position: absolute;
  inset: 0;
}

.header-title {
  text-align: center;
}


.passage-item--header {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.passage-item--content {
  padding: 1em;
}

.demo-item-title {
  font-size: 1.5em;
  font-weight: bold;
  word-spacing: 0.1em;
  color: #42b883;
  letter-spacing: 1.5px;

}
.demo-item-title:hover {
  cursor: pointer;
}
.demo-item-content{
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 20px;
  background: #f0f2f5;
  }
</style>
