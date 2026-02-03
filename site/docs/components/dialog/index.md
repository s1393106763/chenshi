# Dialog 对话框

用于重要信息的告知或操作确认。支持组件式和命令式调用。

## 基础用法 (组件式)

<div class="demo-block">
  <cs-button @click="visible = true">打开对话框</cs-button>
  <cs-dialog 
    v-model:visible="visible" 
    title="提示" 
    content="这是一个对话框内容" 
    @confirm="handleConfirm"
  />
</div>

<script setup>
import { ref } from 'vue'
import { showToast, showDialog } from '@chenshi/components'

const visible = ref(false)
const handleConfirm = () => {
  showToast('点击了确定')
}

const openDialog = () => {
  showDialog({
    title: '命令式调用',
    content: '通过 JS 函数直接弹出',
    onConfirm: () => showToast('确认成功')
  })
}
</script>

```vue
<template>
  <cs-button @click="visible = true">打开对话框</cs-button>
  <cs-dialog 
    v-model:visible="visible" 
    title="提示" 
    content="内容" 
  />
</template>

<script setup>
import { ref } from 'vue'
const visible = ref(false)
</script>
```

## 命令式调用

通过 `showDialog` 函数直接调用。

<div class="demo-block">
  <cs-button @click="openDialog">函数式打开</cs-button>
</div>

```javascript
import { showDialog } from '@chenshi/components'

showDialog({
  title: '确认提交',
  content: '提交后不可修改，是否继续？',
  onConfirm: () => {
    console.log('用户点击了确定')
  }
})
```

## Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| visible | 是否显示 | boolean | — | false |
| title | 标题 | string | — | — |
| content | 内容文本 | string | — | — |
| showCancel | 是否显示取消按钮 | boolean | — | true |
| showConfirm | 是否显示确定按钮 | boolean | — | true |
| cancelText | 取消按钮文字 | string | — | 取消 |
| confirmText | 确定按钮文字 | string | — | 确定 |
| closeOnClickModal | 点击遮罩是否关闭 | boolean | — | true |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| confirm | 点击确定按钮时触发 | — |
| cancel | 点击取消按钮时触发 | — |
