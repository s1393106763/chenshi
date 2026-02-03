1. 创建组件本体
在 packages/components/src/ 下新建组件目录：
目录结构：
  packages/components/src/input/
    ├── __tests__/          # 单元测试  
    │   └── input.test.ts
    ├── style/              # 样式文件  
    │   └── index.less  
    ├── input.vue           # 组件核心代码
    └── index.ts            # 组件入口（处理插件注册）
关键代码实现 (index.ts)：
参考 button/index.ts，使用 withInstall 工具函数包装组件，使其支持全局 app.use() 注册。
  import _Input from './input.vue';  import { withInstall } from '@chenshi1/utils';  export const Input = withInstall(_Input);  export default Input;
2. 导出组件
在 packages/components/src/index.ts 中统一导出新组件：
export * from './button';export * from './table';export * from './input'; // 新增
3. 本地调试 (Playground)
在 play/app.vue 中引入并测试你的新组件，确保功能符合预期：
<script setup>import { Input } from '@chenshi1/components';</script><template>  <Input /></template>
4. 编写文档
在 site/docs/components/ 下创建文档：
创建文件：site/docs/components/input/index.md
更新配置：在 site/docs/.vitepress/config.js 的 sidebar 中添加该组件的路径，方便在文档左侧菜单查看。
5. 编写单元测试
在组件目录下的 __tests__ 编写测试用例。从你目录结构看，你已经配置了 coverage，建议运行测试命令确保覆盖率：
# 在 packages/components 下运行pnpm test
6. 构建与发布
构建：运行根目录或 packages/components 下的构建脚本（基于你 script/build/index.ts 的配置）。
发布：更新 package.json 版本号，执行发布脚本。
