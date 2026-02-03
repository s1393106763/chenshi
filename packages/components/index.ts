import * as components from './src/index';
export * from './src/index';
import { App } from 'vue';

export default {
  install: (app: App) => {
    for (const c in components) {
      const component = components[c as keyof typeof components];
      // 只有当它是组件（有 install 方法或是一个对象/函数）时才注册
      if (component && (typeof component === 'function' || typeof component === 'object') && 'install' in component) {
        app.use(component as any);
      }
    }
  }
};
