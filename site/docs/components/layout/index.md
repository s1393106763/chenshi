# Layout 布局

用于页面整体结构的布局组件，集成了 Header、内容区和 Footer。支持 PC/移动端自适应及左右分割布局。

## 基础用法

最基础的页面布局，包含标题和内容区。

<ClientOnly>
  <div class="demo-block">
    <div style="height: 300px; border: 1px solid #eee;">
      <cs-layout title="基础布局">
        <div style="padding: 20px;">这是页面内容区域</div>
      </cs-layout>
    </div>
  </div>
</ClientOnly>

```vue
<template>
  <cs-layout title="基础布局">
    <div>这是页面内容区域</div>
  </cs-layout>
</template>
```

## 左右分割布局

通过 `split` 属性开启左右可拖拽分割布局，常用于左侧题目、右侧答题或预览等场景。

<ClientOnly>
  <div class="demo-block">
    <div style="height: 400px; border: 1px solid #eee;">
      <cs-layout title="分割布局演示" :split="true" :defaultSplit="40">
        <template #left>
          <div style="padding: 20px; background: #f0f9eb; height: 100%;">左侧面板 (可拖拽右侧边缘)</div>
        </template>
        <template #right>
          <div style="padding: 20px; background: #fdf6ec; height: 100%;">右侧面板内容</div>
        </template>
      </cs-layout>
    </div>
  </div>
</ClientOnly>

```vue
<template>
  <cs-layout title="分割布局" :split="true" :defaultSplit="40">
    <template #left>
      <div>左侧内容</div>
    </template>
    <template #right>
      <div>右侧内容</div>
    </template>
  </cs-layout>
</template>
```

## 上下分割布局

通过设置 `splitDirection="vertical"` 可以实现上下拖拽的布局。

<ClientOnly>
  <div class="demo-block">
    <div style="height: 500px; border: 1px solid #eee;">
      <cs-layout title="上下分割演示" :split="true" splitDirection="vertical" :defaultSplit="30">
        <template #left>
          <div style="padding: 20px; background: #ecf5ff; height: 100%;">顶部面板 (可拖拽底部边缘)</div>
        </template>
        <template #right>
          <div style="padding: 20px; background: #fef0f0; height: 100%;">底部面板内容</div>
        </template>
      </cs-layout>
    </div>
  </div>
</ClientOnly>

```vue
<template>
  <cs-layout title="上下分割" :split="true" splitDirection="vertical" :defaultSplit="30">
    <template #left>
      <div>顶部内容</div>
    </template>
    <template #right>
      <div>底部内容</div>
    </template>
  </cs-layout>
</template>
```

## 动态高度分割布局 (AutoHeightLayout)

这是一个特殊的布局组件，顶部面板初始根据内容自动撑开，用户可以通过中间的分割线动态调整高度。

## 返回拦截

开启 `interceptBack` 后，点击返回按钮将弹出确认弹窗。

<ClientOnly>
  <div class="demo-block">
    <div style="height: 300px; border: 1px solid #eee;">
      <cs-layout 
        title="返回拦截演示" 
        :interceptBack="true"
        @confirm-back="handleConfirmBack"
      >
        <div style="padding: 20px;">点击左上角返回按钮试试</div>
      </cs-layout>
    </div>
  </div>
</ClientOnly>

<script setup>
import { showToast } from '@chenshi/components'
const handleConfirmBack = () => {
  showToast('已确认退出')
}
</script>

## Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| title | 页面标题 | string | — | — |
| showHeader | 是否显示头部 | boolean | — | true |
| showBack | 是否显示返回按钮 | boolean | — | true |
| isOnlyPhone | 是否为移动端布局 (false 为 PC 模式) | boolean | — | true |
| interceptBack | 是否拦截返回按钮点击 | boolean | — | false |
| backDialogTitle | 拦截弹窗标题 | string | — | 确定要退出吗？ |
| backDialogContent | 拦截弹窗内容 | string | — | 退出后作答记录将自动保存 |
| split | 是否开启分割布局 | boolean | — | false |
| splitDirection | 分割方向 | string | horizontal / vertical | horizontal |
| defaultSplit | 初始分割比例 (%) | number | 0-100 | 50 |
| minSplit | 最小分割比例 (%) | number | — | 10 |
| maxSplit | 最大分割比例 (%) | number | — | 90 |

## Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 页面主体内容 (非 split 模式) |
| left | 分割布局左侧内容 |
| right | 分割布局右侧内容 |
| header-right | Header 右侧自定义内容 |
| footer | 页面底部内容 |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| back | 点击返回按钮（未开启拦截时） | — |
| confirm-back | 拦截弹窗点击确定时触发 | — |
| split-resize | 分割位置改变时触发 | (percent: number) |
