<template>
  <div class="player-container">
    <div class="played" @click="playVideo">
      <div class="play-icon"></div>
    </div>
    <Teleport to="body">
      <div class="full-screen-box" v-show="!playButtonState">
        <i class="close-icon" @click="closeFullScreen"></i>
        <div id="xgplayer-container" class="result-video"></div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import Player, { Events } from 'xgplayer';
import 'xgplayer/dist/index.min.css';
import HlsPlugin from 'xgplayer-hls';

defineOptions({
  name: 'CsVideoPlayer'
});

const props = withDefaults(
  defineProps<{
    previewUrl: string;
  }>(),
  {}
);

let player: any = null;
const playButtonState = ref(true);

const playVideo = () => {
  if (!props.previewUrl) {
    console.warn('CsVideoPlayer: 视频未生成，请稍后再试');
    return;
  }

  playButtonState.value = false;

  player = new Player({
    id: 'xgplayer-container',
    url: props.previewUrl,
    width: '100%',
    height: '100%',
    autoplay: true,
    plugins: [HlsPlugin],
    hls: {
      retryCount: 3,
      retryDelay: 1000,
      loadTimeout: 10000,
    },
  });

  player.on(Events.ERROR, (error: any) => {
    console.error('CsVideoPlayer: 视频播放错误', error);
  });
  
  player.on('play', () => {
    console.log('CsVideoPlayer: 视频开始播放', props.previewUrl);
  });
  
  player.on('pause', () => {
    console.log('CsVideoPlayer: 视频暂停', props.previewUrl);
  });
}

function closeFullScreen() {
  player?.pause();
  player?.destroy();
  playButtonState.value = true;
}

const handleError = (e: ErrorEvent) => {
  if ((e.target as HTMLElement)?.id === 'xgplayer-container') {
    console.error('CsVideoPlayer: 未知错误', e);
  }
};

onMounted(() => {
  window.addEventListener('error', handleError);
});

onUnmounted(() => {
  window.removeEventListener('error', handleError);
  if (player) {
    player.destroy();
  }
});
</script>

<style lang="less" scoped>
@import './style/index.less';
</style>
