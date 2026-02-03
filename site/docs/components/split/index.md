# Split 面板分割

用于将一个容器分割成两个可调大小的面板。

## 基础用法

<div class="demo-block">
  <div style="height: 300px; border: 1px solid #eee;">
    <cs-split v-model="splitValue">
      <template #first>
        <div style="padding: 20px; background: #f0f9eb; height: 100%;">左侧内容</div>
      </template>
      <template #second>
        <div style="padding: 20px; background: #fdf6ec; height: 100%;">右侧内容</div>
      </template>
    </cs-split>
  </div>
</div>

<script setup>
import { ref } from 'vue'
const splitValue = ref(30)
</script>

```vue
<template>
  <div style="height: 300px;">
    <cs-split v-model="splitValue">
      <template #first>
        <div>左侧内容</div>
      </template>
      <template #second>
        <div>右侧内容</div>
      </template>
    </cs-split>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const splitValue = ref(30)
</script>
```

## 垂直分割

<div class="demo-block">
  <div style="height: 300px; border: 1px solid #eee;">
    <cs-split direction="vertical">
      <template #first>
        <div style="padding: 20px;">上方内容</div>
      </template>
      <template #second>
        <div style="padding: 20px;">下方内容</div>
      </template>
    </cs-split>
  </div>
</div>

## Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| modelValue / v-model | 分割位置百分比 | number | 0-100 | 50 |
| direction | 分割方向 | string | horizontal / vertical | horizontal |
| min | 最小占比 (%) | number | — | 10 |
| max | 最大占比 (%) | number | — | 90 |

## Slots

| 插槽名 | 说明 |
| --- | --- |
| first | 第一个面板内容 |
| second | 第二个面板内容 |
| trigger | 自定义分割条内容 |
