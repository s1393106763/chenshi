<template>
  <button
    class="chenshi-button"
    :class="buttonStyle"
    :disabled="disabled || loading"
    :type="nativeType"
    @click="handleClick"
  >
    <span v-if="loading" class="chenshi-button__loading">
      <!-- 这里可以放一个加载图标 -->
      <i class="chenshi-icon-loading"></i>
    </span>
    <span v-if="icon && !loading" class="chenshi-button__icon">
      <i :class="icon"></i>
    </span>
    <span :class="{ 'chenshi-button__text': $slots.default }">
      <slot />
    </span>
  </button>
</template>

<script lang="ts" setup>
import './style/index.less';
import { computed } from 'vue';

defineOptions({ name: 'chenshi-button' });

type ButtonProps = {
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default';
  size?: 'large' | 'normal' | 'small' | 'mini';
  plain?: boolean;
  round?: boolean;
  circle?: boolean;
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  nativeType?: 'button' | 'submit' | 'reset';
};

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'default',
  size: 'normal',
  nativeType: 'button',
});

const emit = defineEmits(['click']);

const buttonStyle = computed(() => {
  return {
    [`chenshi-button--${props.type}`]: props.type,
    [`chenshi-button--${props.size}`]: props.size,
    'is-plain': props.plain,
    'is-round': props.round,
    'is-circle': props.circle,
    'is-disabled': props.disabled || props.loading,
    'is-loading': props.loading,
  };
});

const handleClick = (evt: MouseEvent) => {
  if (props.disabled || props.loading) return;
  emit('click', evt);
};
</script>
