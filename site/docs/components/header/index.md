# Header 顶部导航栏

用于页面顶部的导航和标题展示。

## 基础用法

展示标题和默认返回按钮。

<ClientOnly>
  <div class="demo-block">
    <cs-header title="页面标题" backIcon="https://img.icons8.com/ios/50/000000/left.png"/>
  </div>
</ClientOnly>

```vue
<template>
  <cs-header title="页面标题" @back="handleBack" backIcon="https://img.icons8.com/ios/50/000000/left.png"/>
</template>

<script setup>
const handleBack = () => {
  alert('点击了返回按钮');
};
</script>
```

## 隐藏返回按钮

通过 `showBack` 属性控制是否显示左侧返回按钮。

<ClientOnly>
  <div class="demo-block">
    <cs-header title="不显示返回按钮" :showBack="false" backIcon="https://img.icons8.com/ios/50/000000/left.png"/>
  </div>
</ClientOnly>

```vue
<template>
  <cs-header title="不显示返回按钮" :showBack="false" backIcon="https://img.icons8.com/ios/50/000000/left.png"/>
</template>
```

## 自定义背景色

通过 `backgroundColor` 属性设置导航栏背景颜色。

<ClientOnly>
  <div class="demo-block">
    <cs-header title="自定义背景色" backgroundColor="#409eff" style="color: #fff" backIcon="https://img.icons8.com/ios/50/000000/left.png"/>
  </div>
</ClientOnly>

```vue
<template>
  <cs-header title="自定义背景色" backgroundColor="#409eff" backIcon="https://img.icons8.com/ios/50/000000/left.png"/>
</template>
```

## 适配状态栏高度 (移动端)

通过 `statusBarHeight` 设置顶部占位高度，通常用于适配移动端 App 的状态栏。

<ClientOnly>
  <div class="demo-block">
    <div style="background: #f5f5f5; border: 1px solid #eee;">
      <cs-header 
        title="适配状态栏 (20px)" 
        :statusBarHeight="20" 
        isOnlyPhone 
        backgroundColor="#fff"
        backIcon="https://img.icons8.com/ios/50/000000/left.png"
      />
    </div>
  </div>
</ClientOnly>

```vue
<template>
  <cs-header 
    title="适配状态栏 (20px)" 
    :statusBarHeight="20" 
    isOnlyPhone 
  />
</template>
```

## PC 端样式

通过 `isOnlyPhone` 属性切换布局模式。PC 模式下高度更高，字号更大。

<ClientOnly>
  <div class="demo-block">
    <cs-header title="PC 端模式布局" :isOnlyPhone="false" backIcon="https://img.icons8.com/ios/50/000000/left.png"/>
  </div>
</ClientOnly>

```vue
<template>
  <cs-header title="PC 端模式布局" :isOnlyPhone="false" />
</template>
```

## 自定义返回图标

可以通过 `backIcon` 属性传入图片链接，或者使用 `back-icon` 插槽。

<ClientOnly>
  <div class="demo-block">
    <cs-header title="自定义图标" backIcon="https://img.icons8.com/ios/50/000000/left.png" />
  </div>
</ClientOnly>

```vue
<template>
  <cs-header title="自定义图标" backIcon="https://xxx.png" />
</template>
```

## 插槽用法 (Slots)

通过插槽可以完全自定义左侧、中间标题和右侧内容。

<ClientOnly>
  <div class="demo-block">
    <cs-header>
      <template #left>
        <div style="padding-left: 12px; color: #409eff; cursor: pointer;">关闭</div>
      </template>
      <template #default>
        <span style="font-weight: bold; color: #f56c6c;">🔥 热门话题</span>
      </template>
      <template #right>
        <div style="padding-right: 12px; color: #409eff; cursor: pointer;">分享</div>
      </template>
    </cs-header>
  </div>
</ClientOnly>

```vue
<template>
  <cs-header>
    <template #left>
      <div style="padding-left: 12px; color: #409eff; cursor: pointer;">关闭</div>
    </template>
    <template #default>
      <span style="font-weight: bold; color: #f56c6c;">🔥 热门话题</span>
    </template>
    <template #right>
      <div style="padding-right: 12px; color: #409eff; cursor: pointer;">分享</div>
    </template>
  </cs-header>
</template>
```

## Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| title | 标题文本 | string | — | — |
| showBack | 是否显示返回按钮 | boolean | — | true |
| backgroundColor | 背景颜色 | string | — | #ffffff |
| statusBarHeight | 状态栏高度 (px)，用于占位 | number | — | 0 |
| isOnlyPhone | 是否使用移动端样式 (false 为 PC 样式) | boolean | — | false |
| backIcon | 返回按钮图标地址 | string | — | — |

## Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 自定义标题内容，覆盖 title 属性 |
| left | 自定义左侧区域内容，覆盖返回按钮 |
| right | 自定义右侧区域内容 |
| back-icon | 自定义返回按钮内的图标 |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| back | 点击默认返回按钮时触发 | — |
