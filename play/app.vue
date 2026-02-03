<template>
  <div class="play-container">
    <section>
      <h3>基础按钮</h3>
      <chenshi-button>Default</chenshi-button>
      <chenshi-button type="primary">Primary</chenshi-button>
      <chenshi-button type="success">Success</chenshi-button>
      <chenshi-button type="info">Info</chenshi-button>
      <chenshi-button type="warning">Warning</chenshi-button>
      <chenshi-button type="danger">Danger</chenshi-button>
    </section>

    <section>
      <h3>朴素按钮</h3>
      <chenshi-button plain>Default</chenshi-button>
      <chenshi-button type="primary" plain>Primary</chenshi-button>
      <chenshi-button type="success" plain>Success</chenshi-button>
      <chenshi-button type="info" plain>Info</chenshi-button>
      <chenshi-button type="warning" plain>Warning</chenshi-button>
      <chenshi-button type="danger" plain>Danger</chenshi-button>
    </section>

    <section>
      <h3>圆角按钮</h3>
      <chenshi-button round>Default</chenshi-button>
      <chenshi-button type="primary" round>Primary</chenshi-button>
      <chenshi-button type="success" round>Success</chenshi-button>
    </section>

    <section>
      <h3>禁用状态</h3>
      <chenshi-button disabled>Disabled</chenshi-button>
      <chenshi-button type="primary" disabled>Disabled</chenshi-button>
    </section>

    <section>
      <h3>加载中</h3>
      <chenshi-button loading>Loading</chenshi-button>
      <chenshi-button type="primary" loading>Loading</chenshi-button>
    </section>

    <section>
      <h3>不同尺寸</h3>
      <chenshi-button size="large">Large</chenshi-button>
      <chenshi-button size="normal">Normal</chenshi-button>
      <chenshi-button size="small">Small</chenshi-button>
      <chenshi-button size="mini">Mini</chenshi-button>
    </section>
    <section>
      <h3>自定义图标</h3>
      <Table></Table>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { Button as ChenshiButton } from '@chenshi/components';
import { Header as CsHeader } from '@chenshi/components';

</script>

<style scoped>
.play-container {
  padding: 20px;
}
section {
  margin-bottom: 20px;
}
button {
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
