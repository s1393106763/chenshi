# Loading 加载

用于页面数据加载时的遮罩提示。

## 基础用法

可以通过组件方式调用。

<ClientOnly>
  <div class="demo-block">
    <cs-button @click="visible = !visible">切换 Loading</cs-button>
    <cs-loading :visible="visible" msg="拼命加载中..." />
  </div>
</ClientOnly>

<script setup>
import { ref } from 'vue'
const visible = ref(false)

// 模拟命令式调用
import { LoadingService } from '@chenshi/components'
const openLoading = () => {
  LoadingService.show('正在加载...')
  setTimeout(() => {
    LoadingService.hide()
  }, 2000)
}
</script>

```vue
<template>
  <cs-button @click="visible = !visible">切换 Loading</cs-button>
  <cs-loading :visible="visible" msg="拼命加载中..." />
</template>

<script setup>
import { ref } from 'vue'
const visible = ref(false)
</script>
```

## 服务式调用

Loading 也可以通过服务方式调用，方便在 JS/TS 代码中使用。

<ClientOnly>
  <div class="demo-block">
    <cs-button @click="openLoading">服务式开启 (2s 后关闭)</cs-button>
  </div>
</ClientOnly>

```javascript
import { LoadingService } from '@chenshi/components'

const openLoading = () => {
  LoadingService.show('正在加载...')
  setTimeout(() => {
    LoadingService.hide()
  }, 2000)
}
```

## Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| visible | 是否显示 | boolean | — | false |
| msg | 显示文本 | string | — | 加载中... |
| options | 额外配置项 | object | — | — |

## Slots

| 插槽名 | 说明 |
| --- | --- |
| icon | 自定义加载图标 |
