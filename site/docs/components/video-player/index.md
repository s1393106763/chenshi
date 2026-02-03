# VideoPlayer 视频播放器

基于 `xgplayer` 封装的视频播放器组件，支持 HLS 播放和全屏预览。

## 基础用法

<ClientOnly>
  <div class="demo-block" style="width: 100%; height: 210px; position: relative;">
    <CsVideoPlayer previewUrl="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" />
  </div>
</ClientOnly>

```vue
<template>
  <cs-video-player previewUrl="https://your-video-url.m3u8" />
</template>
```

## API

### Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| previewUrl | 视频播放地址（支持 m3u8） | string | — | — |
