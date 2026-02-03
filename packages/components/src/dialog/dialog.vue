<template>
  <Teleport to="body">
    <Transition name="cs-fade">
      <div v-if="visible" class="cs-dialog-wrapper">
        <div class="cs-dialog-mask" @click="handleMaskClick"></div>
        <div class="cs-dialog">
          <div v-if="title" class="cs-dialog__header">
            <slot name="title">{{ title }}</slot>
          </div>
          <div class="cs-dialog__content">
            <slot>{{ content }}</slot>
          </div>
          <div class="cs-dialog__footer">
            <button v-if="showCancel" class="cs-dialog__btn cs-dialog__btn--cancel" @click="handleCancel">
              {{ cancelText }}
            </button>
            <button v-if="showConfirm" class="cs-dialog__btn cs-dialog__btn--confirm" @click="handleConfirm">
              {{ confirmText }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'CsDialog'
});

interface IProps {
  visible?: boolean;
  title?: string;
  content?: string;
  showCancel?: boolean;
  showConfirm?: boolean;
  cancelText?: string;
  confirmText?: string;
  closeOnClickModal?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  visible: false,
  title: '',
  content: '',
  showCancel: true,
  showConfirm: true,
  cancelText: '取消',
  confirmText: '确定',
  closeOnClickModal: true
});

const emit = defineEmits(['update:visible', 'cancel', 'confirm']);

const handleCancel = () => {
  emit('cancel');
  emit('update:visible', false);
};

const handleConfirm = () => {
  emit('confirm');
  emit('update:visible', false);
};

const handleMaskClick = () => {
  if (props.closeOnClickModal) {
    handleCancel();
  }
};
</script>
