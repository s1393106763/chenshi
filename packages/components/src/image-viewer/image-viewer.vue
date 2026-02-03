<template>
  <teleport to="body" :disabled="!teleported">
    <transition name="cs-viewer-fade" appear>
      <div ref="wrapper" :tabindex="-1" :class="ns.e('wrapper')" :style="{ zIndex }">
        <div :class="ns.e('mask')" @click.self="hideOnClickModal && hide()" />

        <!-- INDEX -->
        <span :class="[ns.e('label')]">{{ activeIndex + 1 }}/{{ urlList.length }} </span>

        <!-- CLOSE -->
        <span :class="[ns.e('btn'), ns.e('close')]" @click="hide">
          <slot name="close-icon">
             <i class="cs-icon-close">✕</i>
          </slot>
        </span>

        <!-- ARROW -->
        <template v-if="!isSingle">
          <span :class="arrowPrevKls" @click="prev">
             <slot name="prev-icon">
                <i class="cs-icon-prev">◀</i>
             </slot>
          </span>
          <span :class="arrowNextKls" @click="next">
             <slot name="next-icon">
                <i class="cs-icon-next">▶</i>
             </slot>
          </span>
        </template>
        
        <!-- ACTIONS -->
        <div :class="[ns.e('btn'), ns.e('actions')]">
          <div :class="ns.e('actions__inner')">
            <span :class="ns.e('icon')" @click="handleActions('zoomOut')">➖</span>
            <i :class="ns.e('actions__divider')" />
            <span :class="ns.e('icon')" @click="reset">1:1</span>
            <i :class="ns.e('actions__divider')" />
            <span :class="ns.e('icon')" @click="handleActions('zoomIn')">➕</span>
            
            <template v-if="rotate">
              <i :class="ns.e('actions__divider')" />
              <span :class="ns.e('icon')" @click="handleActions('anticlockwise')">↺</span>
              <i :class="ns.e('actions__divider')" />
              <span :class="ns.e('icon')" @click="handleActions('clockwise')">↻</span>
            </template>
          </div>
        </div>

        <!-- CANVAS -->
        <div :class="ns.e('canvas')">
          <img
            v-for="(url, i) in urlList"
            v-show="i === activeIndex"
            :ref="(el) => (imgRefs[i] = el as HTMLImageElement)"
            :key="url"
            :src="url"
            :style="imgStyle"
            :class="ns.e('img')"
            :crossorigin="crossorigin"
            @load="handleImgLoad"
            @error="handleImgError"
            @mousedown="handleMouseDown"
          />
        </div>
        <slot />
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts" setup>
import { computed, effectScope, nextTick, onMounted, ref, watch, onUnmounted } from 'vue';
import { imageViewerEmits, imageViewerProps } from './image-viewer';
import type { CSSProperties } from 'vue';
import type { ImageViewerAction } from './image-viewer';

const EVENT_CODE = {
  space: 'Space',
  left: 'ArrowLeft',
  up: 'ArrowUp',
  right: 'ArrowRight',
  down: 'ArrowDown',
  esc: 'Escape',
};

defineOptions({
  name: 'CsImageViewer'
});

const props = defineProps(imageViewerProps);
const emit = defineEmits(imageViewerEmits);

const ns = {
  e: (element: string) => `cs-image-viewer__${element}`,
  is: (name: string, state: boolean) => (state ? `is-${name}` : '')
};

const wrapper = ref<HTMLDivElement>();
const imgRefs = ref<HTMLImageElement[]>([]);
const scopeEventListener = effectScope();

const loading = ref(true);
const activeIndex = ref(props.initialIndex);
const transform = ref({
  scale: 1,
  deg: 0,
  offsetX: 0,
  offsetY: 0,
  enableTransition: false
});

const isSingle = computed(() => props.urlList.length <= 1);
const isFirst = computed(() => activeIndex.value === 0);
const isLast = computed(() => activeIndex.value === props.urlList.length - 1);

const currentImg = computed(() => props.urlList[activeIndex.value]);

const arrowPrevKls = computed(() => [
  'cs-image-viewer__btn', 
  'cs-image-viewer__prev', 
  ns.is('disabled', !props.infinite && isFirst.value)
]);

const arrowNextKls = computed(() => [
  'cs-image-viewer__btn', 
  'cs-image-viewer__next', 
  ns.is('disabled', !props.infinite && isLast.value)
]);

const imgStyle = computed(() => {
  const { scale, deg, offsetX, offsetY, enableTransition } = transform.value;
  const style: CSSProperties = {
    transform: `scale(${scale}) rotate(${deg}deg) translate(${offsetX / scale}px, ${offsetY / scale}px)`,
    transition: enableTransition ? 'transform .3s' : ''
  };
  return style;
});

function hide() {
  unregisterEventListener();
  emit('close');
}

function registerEventListener() {
  const keydownHandler = (e: KeyboardEvent) => {
    switch (e.code) {
      case EVENT_CODE.esc:
        props.closeOnPressEscape && hide();
        break;
      case EVENT_CODE.space:
        reset();
        break;
      case EVENT_CODE.left:
        prev();
        break;
      case EVENT_CODE.up:
        handleActions('zoomIn');
        break;
      case EVENT_CODE.right:
        next();
        break;
      case EVENT_CODE.down:
        handleActions('zoomOut');
        break;
    }
  };
  const mousewheelHandler = (e: WheelEvent) => {
    const delta = e.deltaY || e.deltaX;
    handleActions(delta < 0 ? 'zoomIn' : 'zoomOut', {
      zoomRate: props.zoomRate,
      enableTransition: false
    });
  };

  document.addEventListener('keydown', keydownHandler);
  document.addEventListener('wheel', mousewheelHandler);

  onUnmounted(() => {
    document.removeEventListener('keydown', keydownHandler);
    document.removeEventListener('wheel', mousewheelHandler);
  });
}

function unregisterEventListener() {
  // 手动移除监听器已经在 onUnmounted 处理，或者可以在这里显式处理
}

function handleImgLoad() {
  loading.value = false;
}

function handleImgError(e: Event) {
  loading.value = false;
  (e.target as HTMLImageElement).alt = 'error';
}

function handleMouseDown(e: MouseEvent) {
  if (loading.value || e.button !== 0 || !wrapper.value) return;
  transform.value.enableTransition = false;

  const { offsetX, offsetY } = transform.value;
  const startX = e.pageX;
  const startY = e.pageY;

  const dragHandler = (ev: MouseEvent) => {
    transform.value = {
      ...transform.value,
      offsetX: offsetX + ev.pageX - startX,
      offsetY: offsetY + ev.pageY - startY
    };
  };
  
  const mouseupHandler = () => {
    document.removeEventListener('mousemove', dragHandler);
    document.removeEventListener('mouseup', mouseupHandler);
  };

  document.addEventListener('mousemove', dragHandler);
  document.addEventListener('mouseup', mouseupHandler);

  e.preventDefault();
}

function reset() {
  transform.value = {
    scale: 1,
    deg: 0,
    offsetX: 0,
    offsetY: 0,
    enableTransition: false
  };
}

function setActiveItem(index: number) {
  const len = props.urlList.length;
  activeIndex.value = (index + len) % len;
}

function prev() {
  if (isFirst.value && !props.infinite) return;
  setActiveItem(activeIndex.value - 1);
}

function next() {
  if (isLast.value && !props.infinite) return;
  setActiveItem(activeIndex.value + 1);
}

function handleActions(action: ImageViewerAction, options = {}) {
  if (loading.value) return;
  const { minScale, maxScale } = props;
  const { zoomRate, rotateDeg, enableTransition } = {
    zoomRate: props.zoomRate,
    rotateDeg: 90,
    enableTransition: true,
    ...options
  };
  switch (action) {
    case 'zoomOut':
      if (transform.value.scale > minScale) {
        transform.value.scale = Number.parseFloat((transform.value.scale / zoomRate).toFixed(3));
      }
      break;
    case 'zoomIn':
      if (transform.value.scale < maxScale) {
        transform.value.scale = Number.parseFloat((transform.value.scale * zoomRate).toFixed(3));
      }
      break;
    case 'clockwise':
      transform.value.deg += rotateDeg;
      emit('rotate', transform.value.deg);
      break;
    case 'anticlockwise':
      transform.value.deg -= rotateDeg;
      emit('rotate', transform.value.deg);
      break;
  }
  transform.value.enableTransition = enableTransition;
}

watch(currentImg, () => {
  nextTick(() => {
    const $img = imgRefs.value[activeIndex.value];
    if (!$img?.complete) {
      loading.value = true;
    }
  });
});

watch(activeIndex, (val) => {
  reset();
  emit('switch', val);
});

onMounted(() => {
  registerEventListener();
  wrapper.value?.focus?.();
});

defineExpose({
  setActiveItem
});
</script>
