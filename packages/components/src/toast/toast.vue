<template>
  <Teleport to="body">
    <Transition name="fade">
      <div class="cs-toast">
        <p>{{ msg }}</p>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';

defineOptions({
  name: 'CsToast'
});

export interface ToastProps {
  msg?: string;
  duration?: number;
}

export interface IProps extends ToastProps {
  close?: () => void;
  msg?: string;
  duration?: number;
}

const props = withDefaults(defineProps<IProps>(), {
  msg: '网络异常，请稍后再试',
  duration: 2
});

onMounted(() => {
  if (props.close) {
    const timer = setTimeout(() => {
      props.close && props.close();
      clearTimeout(timer);
    }, props.duration * 1000);
  }
});
</script>

<style lang="less" scoped>
@import './style/index.less';
</style>
