import { createVNode, render } from 'vue';
import ToastConstructor from './toast.vue';
import { withInstall } from '@chenshi1/utils';

let container: HTMLDivElement | null = null;

export function showToast(msg: string, duration = 2000) {
  if (container) {
    render(null, container);
    container.remove();
    container = null;
  }

  container = document.createElement('div');
  const thisContainer = container;
  const vm = createVNode(ToastConstructor, {
    msg,
    duration: duration / 1000,
    close: () => {
      render(null, thisContainer);
      thisContainer.remove();
      if (container === thisContainer) {
        container = null;
      }
    }
  });

  render(vm, container);
  document.body.appendChild(container);
}

export const Toast = withInstall(ToastConstructor);
export default Toast;
