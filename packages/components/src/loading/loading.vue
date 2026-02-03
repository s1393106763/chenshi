<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-show="visible" class="cs-loading" :style="options?.style" @touchmove.prevent>
        <div class="cs-loading-icon">
          <img class="cs-loading-icon__idol" src="./assets/idol.png" />
          <img class="cs-loading-icon__circle" src="./assets/circle.png" />
        </div>
        <p class="cs-loading__msg" v-if="msg">{{ msg }}</p>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'CsLoading'
});

interface IProps {
  msg?: string;
  visible?: boolean;
  options?: {
    style?: string;
  };
}

withDefaults(defineProps<IProps>(), {
  msg: '加载中...',
  visible: false
});
</script>
