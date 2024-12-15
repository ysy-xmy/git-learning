<template>
  <div class="video-list">
    <div
      class="video-item"
      v-for="(video, index) in videoList"
      :key="index"
      @click="playVideo(video)"
    >
      <div class="video-cover">
        <img :src="video.cover" alt="视频封面" />
        <el-icon class="video-icon"><VideoPlay /></el-icon>
      </div>
      <div class="video-title">{{ video.title }}</div>
    </div>
    <VideoPlayer
      :dialogVisiable="dialogVisiable"
      :src="currentVideo.src"
      :title="currentVideo.title"
      @update:visible="handleClose"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import VideoPlayer from './video-dialog.vue'
import {VideoPlay} from '@element-plus/icons-vue';

interface Video {
  id: string
  title: string
  src: string
  cover: string
}

const dialogVisiable = ref(false)
const currentVideo = ref<Video>({
  id: '',
  title: '',
  src: '',
  cover: ''
})

const videoList = ref<Video[]>([
  {
    id: '1',
    title: '如何使用连接器',
    src: 'https://www.runoob.com/try/demo_source/mov_bbb.mp4',
    cover: 'https://picsum.photos/200/300'
  },
  {
    id: '2',
    title: '连接器配置指南',
    src: 'https://www.runoob.com/try/demo_source/mov_bbb.mp4',
    cover: 'https://picsum.photos/200/300'
  },
  {
    id: '3',
    title: '连接器最佳实践',
    src: 'https://www.runoob.com/try/demo_source/mov_bbb.mp4',
    cover: 'https://picsum.photos/200/300'
  },
  {
    id: '4',
    title: '连接器故障排查',
    src: 'https://www.runoob.com/try/demo_source/mov_bbb.mp4',
    cover: 'https://picsum.photos/200/300'
  }
])

const playVideo = (video: Video) => {
  currentVideo.value = video
  dialogVisiable.value = true
  console.log(dialogVisiable.value)
}

const handleClose = (visible: boolean) => {
  dialogVisiable.value = visible
}
</script>
<style scoped>
.video-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin: 20px 0;
}

.video-list .video-item {
  width: 240px;
  cursor: pointer;
}

.video-list .video-item .video-cover {
  position: relative;
  width: 100%;
  height: 135px;
  border-radius: 4px;
  overflow: hidden;
}

.video-list .video-item .video-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-list .video-item .video-cover i {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 48px;
  color: #fff;
  opacity: 0.8;
}

.video-list .video-item .video-title {
  margin-top: 8px;
  font-size: 14px;
  color: #333;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.video-list .video-item:hover .video-cover i {
  opacity: 1;
}

.video-list .video-item:hover .video-title {
  color: #0077ff;
}
</style>
