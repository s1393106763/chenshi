# Button 按钮

常用的操作按钮。

## 基础用法

使用 `type` 属性来定义按钮的类型。

<div class="demo-block">
  <chenshi-button>Default</chenshi-button>
  <chenshi-button type="primary">Primary</chenshi-button>
  <chenshi-button type="success">Success</chenshi-button>
  <chenshi-button type="info">Info</chenshi-button>
  <chenshi-button type="warning">Warning</chenshi-button>
  <chenshi-button type="danger">Danger</chenshi-button>
</div>

```html
<chenshi-button>Default</chenshi-button>
<chenshi-button type="primary">Primary</chenshi-button>
<chenshi-button type="success">Success</chenshi-button>
<chenshi-button type="info">Info</chenshi-button>
<chenshi-button type="warning">Warning</chenshi-button>
<chenshi-button type="danger">Danger</chenshi-button>
```

## 朴素按钮

使用 `plain` 属性来定义朴素按钮。

<div class="demo-block">
  <chenshi-button plain>Default</chenshi-button>
  <chenshi-button type="primary" plain>Primary</chenshi-button>
  <chenshi-button type="success" plain>Success</chenshi-button>
  <chenshi-button type="info" plain>Info</chenshi-button>
  <chenshi-button type="warning" plain>Warning</chenshi-button>
  <chenshi-button type="danger" plain>Danger</chenshi-button>
</div>

```html
<chenshi-button plain>Default</chenshi-button>
<chenshi-button type="primary" plain>Primary</chenshi-button>
```

## 圆角按钮

使用 `round` 属性来定义圆角按钮。

<div class="demo-block">
  <chenshi-button round>Default</chenshi-button>
  <chenshi-button type="primary" round>Primary</chenshi-button>
  <chenshi-button type="success" round>Success</chenshi-button>
</div>

```html
<chenshi-button round>Default</chenshi-button>
<chenshi-button type="primary" round>Primary</chenshi-button>
```

## 禁用状态

使用 `disabled` 属性来定义按钮是否可用。

<div class="demo-block">
  <chenshi-button disabled>Disabled</chenshi-button>
  <chenshi-button type="primary" disabled>Disabled</chenshi-button>
</div>

```html
<chenshi-button disabled>Disabled</chenshi-button>
```

## 加载中

使用 `loading` 属性来定义按钮是否显示加载状态。

<div class="demo-block">
  <chenshi-button loading>Loading</chenshi-button>
  <chenshi-button type="primary" loading>Loading</chenshi-button>
</div>

```html
<chenshi-button loading>Loading</chenshi-button>
```

## 尺寸

使用 `size` 属性来定义按钮的尺寸。

<div class="demo-block">
  <chenshi-button size="large">Large</chenshi-button>
  <chenshi-button size="normal">Normal</chenshi-button>
  <chenshi-button size="small">Small</chenshi-button>
  <chenshi-button size="mini">Mini</chenshi-button>
</div>

```html
<chenshi-button size="large">Large</chenshi-button>
<chenshi-button size="normal">Normal</chenshi-button>
<chenshi-button size="small">Small</chenshi-button>
<chenshi-button size="mini">Mini</chenshi-button>
```

## Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| type | 类型 | string | primary / success / warning / danger / info / default | default |
| size | 尺寸 | string | large / normal / small / mini | normal |
| plain | 是否朴素按钮 | boolean | — | false |
| round | 是否圆角按钮 | boolean | — | false |
| circle | 是否圆形按钮 | boolean | — | false |
| disabled | 是否禁用状态 | boolean | — | false |
| loading | 是否加载中状态 | boolean | — | false |
| icon | 图标类名 | string | — | — |
| native-type | 原生 type 属性 | string | button / submit / reset | button |

## Events

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击按钮的回调 | (event: MouseEvent) |

## Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 自定义按钮内容 |
