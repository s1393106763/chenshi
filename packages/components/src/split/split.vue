<template>
  <div ref="containerRef" :class="['cs-split', `is-${direction}`]">
    <div :style="firstStyle" class="cs-split__first">
      <slot name="first"></slot>
    </div>
    
    <div 
      class="cs-split__trigger" 
      @mousedown="handleMouseDown"
    >
      <slot name="trigger">
        <div class="cs-split__trigger-line"></div>
      </slot>
    </div>

    <div class="cs-split__second">
      <slot name="second"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onUnmounted } from 'vue';

defineOptions({
  name: 'CsSplit'
});

interface IProps {
  direction?: 'horizontal' | 'vertical';
  min?: number; // 最小百分比
  max?: number; // 最大百分比
  modelValue?: number; // 分割位置 (0-100)
}

const props = withDefaults(defineProps<IProps>(), {
  direction: 'horizontal',
  min: 10,
  max: 90,
  modelValue: 50
});

const emit = defineEmits(['update:modelValue', 'resize']);

const containerRef = ref<HTMLElement | null>(null);
const splitValue = ref(props.modelValue);

const firstStyle = computed(() => {
  const size = `${splitValue.value}%`;
  return props.direction === 'horizontal' ? { width: size } : { height: size };
});

const handleMouseDown = (e: MouseEvent) => {
  e.preventDefault();
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
  document.body.style.cursor = props.direction === 'horizontal' ? 'col-resize' : 'row-resize';
};

const handleMouseMove = (e: MouseEvent) => {
  if (!containerRef.value) return;

  const rect = containerRef.value.getBoundingClientRect();
  let offset = 0;
  let total = 0;

  if (props.direction === 'horizontal') {
    offset = e.clientX - rect.left;
    total = rect.width;
  } else {
    offset = e.clientY - rect.top;
    total = rect.height;
  }

  let percent = (offset / total) * 100;
  if (percent < props.min) percent = props.min;
  if (percent > props.max) percent = props.max;

  splitValue.value = percent;
  emit('update:modelValue', percent);
  emit('resize', percent);
};

const handleMouseUp = () => {
  document.removeEventListener('mousemove', handleMouseMove);
  document.removeEventListener('mouseup', handleMouseUp);
  document.body.style.cursor = '';
};

onUnmounted(() => {
  handleMouseUp();
});
</script>
