# Toast 轻提示

用于轻量级的消息反馈。

## 基础用法

<ClientOnly>
  <div class="demo-block">
    <cs-button @click="openToast">点击弹出 Toast</cs-button>
  </div>
</ClientOnly>

<script setup>
import { showToast } from '@chenshi/components'
const openToast = () => {
  showToast('这是一条提示消息')
}
</script>

```javascript
import { showToast } from '@chenshi/components'

showToast('这是一条提示消息')
```

## 自定义时长

<ClientOnly>
  <div class="demo-block">
    <cs-button @click="showToast('5秒后消失', 5000)">5秒后消失</cs-button>
  </div>
</ClientOnly>

```javascript
showToast('5秒后消失', 5000)
```

## 方法

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| showToast | 显示提示 | (msg: string, duration?: number) |
