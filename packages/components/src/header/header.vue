<template>
  <!-- 占位端上状态栏高度 -->
  <div
    :style="{
      height: statusBarHeight + 'px',
      background: isOnlyPhone ? backgroundColor : 'unset'
    }"
  ></div>
  <!-- 占位端上状态栏高度 end -->
  <div
    :class="[
      'cs-header',
      {
        'pc-header': !isOnlyPhone
      }
    ]"
    :style="{ backgroundColor: backgroundColor }"
  >
    <div class="left">
      <img v-if="showBack" class="back" src="./assets/back.png" alt="返回" @click="goBack" />
    </div>
    <div class="center">{{ title }}</div>
    <div class="right">
      <slot name="right-content"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'CsHeader'
});

const emit = defineEmits(['goBack']);

interface IProps {
  showBack?: boolean;
  title?: string;
  backgroundColor?: string;
  statusBarHeight?: number;
  isOnlyPhone?: boolean;
}

withDefaults(defineProps<IProps>(), {
  showBack: true,
  title: '',
  backgroundColor: '#ffffff',
  statusBarHeight: 0,
  isOnlyPhone: false
});

const goBack = () => {
  emit('goBack');
};
</script>

<style lang="less" scoped>
@import './style/index.less';
</style>
