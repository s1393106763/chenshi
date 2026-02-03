import { ref, createVNode, render } from 'vue';
import type { App, VNode } from 'vue';
import LoadingConstructor from './loading.vue';
import { withInstall } from '@chenshi1/utils';

// 命令式调用支持
let vm: VNode | null = null;
const container = document.createElement('div');

export function showLoading(msg = '加载中...', options = {}) {
  if (vm) return;
  
  vm = createVNode(LoadingConstructor, {
    msg,
    visible: true,
    options
  });
  
  render(vm, container);
  document.body.appendChild(container);
}

export function hideLoading() {
  if (!vm) return;
  
  render(null, container);
  if (container.parentNode) {
    container.parentNode.removeChild(container);
  }
  vm = null;
}

// 导出组件和插件
export const Loading = withInstall(LoadingConstructor);
export const LoadingService = {
  show: showLoading,
  hide: hideLoading
};
// 不要直接导出包含复杂 Vue 实例的对象作为默认导出
export default Loading;
