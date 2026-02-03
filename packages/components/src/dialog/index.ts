import { createVNode, render } from 'vue';
import type { VNode } from 'vue';
import DialogConstructor from './dialog.vue';
import { withInstall } from '@chenshi1/utils';

interface DialogOptions {
  title?: string;
  content?: string;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
  showConfirm?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export function showDialog(options: DialogOptions | string) {
  const container = document.createElement('div');
  const userOptions = typeof options === 'string' ? { content: options } : options;

  let vm: VNode | null = createVNode(DialogConstructor, {
    ...userOptions,
    visible: true,
    'onUpdate:visible': (val: boolean) => {
      if (!val) {
        render(null, container);
        container.remove();
        vm = null;
      }
    },
    onConfirm: () => {
      userOptions.onConfirm?.();
    },
    onCancel: () => {
      userOptions.onCancel?.();
    }
  });

  render(vm, container);
  document.body.appendChild(container);
}

export const Dialog = withInstall(DialogConstructor);
export default Dialog;
