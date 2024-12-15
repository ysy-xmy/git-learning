<template>
  <div class="video-player">
    <div class="video-content">
      <player-video :volume="volume" ref="video" :src="src"></player-video>
    </div>
    <div class="button-group">
      <el-button class="primary" @click="playVideo">开始视频</el-button>
      <el-button class="primary" @click="stopVideo">暂停视频</el-button>
      <el-button class="primary" @click="reloadVideo">重新加载</el-button>
      <el-button class="primary" @click="forwardVideo">视频快进</el-button>
      <el-button class="primary" @click="backVideo">视频后退</el-button>
      <el-button class="primary" @click="volumeUpVideo">增大音量</el-button>
      <el-button class="primary" @click="volumeDownVideo">降低音量</el-button>
      <el-button class="primary" @click="toggleToDefault">默认频道</el-button>
    </div>
  </div>
</template>
<script>
  import PlayerVideo from "./xmy-video.vue";

  export default {
    components: {
      PlayerVideo,
    },
    data() {
      return {
        volume: 0.5,
        src: "https://www.runoob.com/try/demo_source/mov_bbb.mp4",
      };
    },
    computed: {
      video() {
        return this.$refs.video;
      },
    },
    methods: {
      // 父类组件调用子组件方法，触发播放器功能
      stopVideo() {
        this.video.stop();
      },
      playVideo() {
        this.video.play();
      },
      reloadVideo() {
        this.video.reload();
      },
      forwardVideo() {
        this.video.forward();
      },
      backVideo() {
        this.video.back();
      },
      fullScreenVideo() {
        this.video.fullScreen();
      },
      screenVideo() {
        this.video.exitScreen();
      },
      volumeUpVideo() {
        this.video.volumeUp();
      },
      volumeDownVideo() {
        this.video.volumeDown();
      },
      downloadVideo() {
        this.video.download();
      },
    },
    beforeCreate() {
      this.volume = window.localStorage.volume;
    },
  };
</script>
<style >
  .video-player {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
  }
  .video-content {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      margin-right: 20px;
    }
    .button-group {
      margin-top: 20px;
      display: flex;
      flex: 0 0 100px;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
    }
</style>