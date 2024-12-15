<template>
  <div>
    <video
      ref="video"
      controls
      class="video-js vjs-default-skin vjs-big-play-centered"
      :width="width || '600'"
      :height="height || '400'"
    >
      <source :src="src" type="video/mp4" />
    </video>
  </div>
</template>
<!-- 4567890- -->

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import { ElMessage } from 'element-plus'

const props = defineProps<{
  src: string
  width?: number | string
  height?: number | string
}>()

const video = ref<HTMLVideoElement | null>(null)
const player = ref<any>(null)
const volumeVideo = ref(
  localStorage.getItem('volume') ? Number(localStorage.getItem('volume')) : 0.5
)
const playbackRates = [0.5, 1.0, 1.5, 2.0] // 可选的播放速度
const currentRate = ref(1.0) // 当前播放速度

// 封装播放器方法
const play = () => {
  if (!player.value) return
  player.value.src({ src: props.src, type: 'video/mp4' })
  player.value.load(props.src)
  player.value.play()
  player.value.volume(volumeVideo.value)
}

const stop = () => {
  if (!player.value) return
  player.value.pause()
}

const reload = () => {
  if (!player.value) return
  stop()
  player.value.load({})
  play()
}

const forward = () => {
  if (!player.value) return
  const currentTime = player.value.currentTime()
  player.value.currentTime(currentTime + 5)
}

const back = () => {
  if (!player.value) return
  const currentTime = player.value.currentTime()
  player.value.currentTime(currentTime - 5)
}

const volumeUp = () => {
  if (!player.value) return
  const newVolume = Math.min(volumeVideo.value + 0.1, 1)
  player.value.volume(newVolume)
  volumeVideo.value = newVolume
  localStorage.setItem('volume', String(newVolume))
}

const volumeDown = () => {
  if (!player.value) return
  const newVolume = Math.max(volumeVideo.value - 0.1, 0)
  player.value.volume(newVolume)
  volumeVideo.value = newVolume
  localStorage.setItem('volume', String(newVolume))
}

interface TvOptions {
  src: string
  type: string
  load: any
}

const toggleTv = (obj: TvOptions) => {
  if (!player.value) return
  player.value.src(obj.src)
  player.value.type(obj.type)
  player.value.load(obj.load)
  player.value.play()
  player.value.volume(volumeVideo.value)
}

// 改变播放速度
const changePlaybackRate = (rate: number) => {
  if (!player.value) return
  player.value.playbackRate(rate)
}

const download = () => {
  fetch(props.src)
    .then(res => res.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'video.mp4'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    })
    .catch(err => {
      // 处理跨域错误
      if (err instanceof TypeError && err.message.includes('Failed to fetch')) {
        ElMessage.error('下载失败:视频资源跨域访问受限')
      } else {
        ElMessage.error('下载失败:' + err.message)
      }
    })
}

onMounted(() => {
  const options = {
    playbackRates
  }

  if (video.value) {
    player.value = videojs(video.value as Element, options, () => {
      // 创建播放速度控件
      const MenuButton = videojs.getComponent('MenuButton')
      const MenuItem = videojs.getComponent('MenuItem')

      class PlaybackRateMenuButton extends MenuButton {
        declare player_: any

        createItems() {
          return playbackRates.map(rate => {
            return new MenuItem(this.player_, {
              children: [
                {
                  text: rate + 'x'
                }
              ],
              selected: rate === currentRate.value,
              handleClick: () => {
                currentRate.value = rate
                if (player.value) {
                  player.value.playbackRate(rate)
                }
              }
            })
          })
        }
      }

      // 注册新组件
      videojs.registerComponent('PlaybackRateMenuButton', PlaybackRateMenuButton)

      // 将播放速度按钮添加到控制栏
      if (player.value) {
        const controlBar = player.value.getChild('controlBar')
        // controlBar.addChild('PlaybackRateMenuButton', {}, controlBar.children_.length - 1);
        player.value.on('volumechange', () => {
          if (player.value) {
            volumeVideo.value = player.value.volume()
            localStorage.setItem('volume', String(player.value.volume()))
          }
        })
        player.value.on('play', () => {
          if (player.value) {
            player.value.volume(volumeVideo.value)
          }
        })

        // 下载视频
        const Button = videojs.getComponent('Button')
        class DownloadButton extends Button {
          declare controlText_: string
          constructor(player: any, options: any) {
            super(player, options)
            this.addClass('vjs-download-button')
            this.controlText_ = '下载' // 设置按钮文本
            const downbtn = document.createElement('span')
            downbtn.innerText = '下载' // 使用 Element UI 的下载图标
            this.el().appendChild(downbtn)
          }
          handleClick() {
            download()
          }
        }

        // 注册新组件
        videojs.registerComponent('DownloadButton', DownloadButton)

        // 将下载按钮添加到控制栏
        controlBar.addChild('DownloadButton', {}, controlBar.children_.length - 2)
      }
    })
  }
})
</script>

<style scoped>
.video-js .vjs-time-control {
  display: block !important;
}
.video-js .vjs-remaining-time {
  display: none !important;
}

.video-js .vjs-big-play-button {
  font-size: 2.5em !important;
  line-height: 2.3em !important;
  height: 2.5em !important;
  width: 2.5em !important;
  -webkit-border-radius: 2.5em !important;
  -moz-border-radius: 2.5em !important;
  border-radius: 2.5em !important;
  background-color: #73859f;
  background-color: rgba(115, 133, 159, 0.5) !important;
  border-width: 0.15em !important;
  margin-top: -1.25em !important;
  margin-left: -1.25em !important;
}
.vjs-big-play-button .vjs-icon-placeholder {
  font-size: 1.63em !important;
}

.vjs-paused .vjs-big-play-button,
.vjs-paused.vjs-has-started .vjs-big-play-button {
  display: block !important;
}

.playback-rate {
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.playback-rate span {
  margin-right: 10px;
}

.vjs-download-button {
  cursor: pointer;
}
</style>
