# ImageViewer 图片预览

支持单图和多图预览，提供缩放、旋转、切换等功能。

## 基础用法

<ClientOnly>
  <div class="demo-block">
    <cs-button @click="show = true">点击预览图片</cs-button>
    <cs-image-viewer 
      v-if="show" 
      :url-list="['https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg']" 
      @close="show = false" 
    />
  </div>
</ClientOnly>

<script setup>
import { ref } from 'vue'
const show = ref(false)
const showMulti = ref(false)
</script>

```vue
<template>
  <cs-button @click="show = true">点击预览图片</cs-button>
  <cs-image-viewer 
    v-if="show" 
    :url-list="['https://xxx.jpeg']" 
    @close="show = false" 
  />
</template>

<script setup>
import { ref } from 'vue'
const show = ref(false)
</script>
```

## 多图预览

支持多张图片切换预览。

<ClientOnly>
  <div class="demo-block">
    <cs-button @click="showMulti = true">多图预览</cs-button>
    <cs-image-viewer 
      v-if="showMulti" 
      :url-list="[
        'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
        'https://fuss10.elemecdn.com/1/34/19aa0511119b6943383cc3a99f020jpeg.jpeg',
        'https://fuss10.elemecdn.com/0/6f/e35ff3720537128146c23fd9f4977jpeg.jpeg'
      ]" 
      @close="showMulti = false" 
    />
  </div>
</ClientOnly>

```vue
<template>
  <cs-button @click="showMulti = true">多图预览</cs-button>
  <cs-image-viewer 
    v-if="showMulti" 
    :url-list="urlList" 
    @close="showMulti = false" 
  />
</template>

<script setup>
import { ref } from 'vue'
const showMulti = ref(false)
const urlList = [
  'https://xxx1.jpeg',
  'https://xxx2.jpeg'
]
</script>
```

## Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| url-list | 预览图片地址列表 | string[] | — | [] |
| z-index | 预览层级 | number | — | 2000 |
| initial-index | 初始预览图片的索引 | number | — | 0 |
| infinite | 是否可以无限循环预览 | boolean | — | true |
| hide-on-click-modal | 是否可以通过点击遮罩层关闭预览 | boolean | — | false |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| close | 关闭预览时触发 | — |
| switch | 切换图片时触发 | (index: number) |
