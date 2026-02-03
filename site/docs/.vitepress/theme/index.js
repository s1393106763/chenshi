import DefaultTheme from "vitepress/theme";
import * as components from "@chenshi/components"
import Layout from "./Layout.vue";

// 直接引用组件源码中的样式文件，避免依赖未构建的 lib 目录
import "@chenshi/components/src/button/style/index.less"
import "@chenshi/components/src/header/style/index.less"
import "@chenshi/components/src/image-viewer/style/index.less"
import "@chenshi/components/src/loading/style/index.less"
import "@chenshi/components/src/dialog/style/index.less"
import "@chenshi/components/src/toast/style/index.less"
import "@chenshi/components/src/layout/style/index.less"
import "@chenshi/components/src/split/style/index.less"
import "@chenshi/components/src/video-player/style/index.less"

export default {
    ...DefaultTheme,
    Layout,
    enhanceApp: async ({ app }) => {
        // 注册所有从源码导出的组件
        for (const c in components) {
            const component = components[c];
            if (component && component.install) {
                app.use(component);
            }
        }
    },
};
