<template>
  <div class="cs-layout" :class="[{ 'is-pc': !isOnlyPhone }]">
    <!-- 头部区域 -->
    <cs-header 
      v-if="showHeader"
      :showBack="showBack" 
      :title="title" 
      @back="handleBack"
    >
      <template #right>
        <slot name="header-right"></slot>
      </template>
    </cs-header>
    
    <!-- 主体区域 -->
    <div class="cs-layout__main">
      <template v-if="split">
        <cs-split 
          v-model="splitValue" 
          :direction="splitDirection"
          :min="minSplit"
          :max="maxSplit"
          @resize="onSplitResize"
        >
          <template #first>
            <slot name="left"></slot>
          </template>
          <template #second>
            <slot name="right"></slot>
          </template>
        </cs-split>
      </template>
      <div v-else class="cs-layout__content">
        <slot></slot>
      </div>
    </div>

    <!-- 底部区域 -->
    <div v-if="$slots.footer" class="cs-layout__footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { showDialog } from '../dialog';
import CsSplit from '../split/split.vue';

defineOptions({
  name: 'CsLayout'
});

interface IProps {
  title?: string;
  showHeader?: boolean;
  showBack?: boolean;
  isOnlyPhone?: boolean;
  interceptBack?: boolean;
  backDialogTitle?: string;
  backDialogContent?: string;
  split?: boolean; // 是否开启分割布局
  splitDirection?: 'horizontal' | 'vertical';
  defaultSplit?: number;
  minSplit?: number;
  maxSplit?: number;
}

const props = withDefaults(defineProps<IProps>(), {
  title: '',
  showHeader: true,
  showBack: true,
  isOnlyPhone: true,
  interceptBack: false,
  backDialogTitle: '确定要退出吗？',
  backDialogContent: '退出后作答记录将自动保存',
  split: false,
  splitDirection: 'horizontal',
  defaultSplit: 50,
  minSplit: 10,
  maxSplit: 90
});

const emit = defineEmits(['back', 'confirm-back', 'split-resize']);

const splitValue = ref(props.defaultSplit);

const handleBack = () => {
  if (props.interceptBack) {
    showDialog({
      title: props.backDialogTitle,
      content: props.backDialogContent,
      onConfirm: () => {
        emit('confirm-back');
      }
    });
  } else {
    emit('back');
  }
};

const onSplitResize = (percent: number) => {
  emit('split-resize', percent);
};
</script>
