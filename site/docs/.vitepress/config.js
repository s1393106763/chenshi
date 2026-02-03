export default {
  base: process.env.NODE_ENV === 'production' ? '/chenshi/' : '/',
  themeConfig: {
    siteTitle: "vitepress",
    // 关闭右侧大纲导航，中间只展示文档与代码，右侧仅保留手机预览
    aside: false,
    nav: [
      { text: "指南", link: "/guild/installation" },
      { text: "组件", link: "/components/button/" },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/s1393106763/chenshi" },
    ],
    sidebar: {
      "/guild/": [
        {
          text: "基础",
          items: [
            {
              text: "安装",
              link: "/guild/installation",
            },
            {
              text: "快速开始",
              link: "/guild/quickstart",
            },
          ],
        },
        {
          text: "进阶",
          items: [
            {
              text: "xx",
              link: "/xx",
            },
          ],
        },
      ],
      "/components/": [
        {
          text: "基础组件",
          items: [
            {
              text: "Button",
              link: "/components/button/",
            },
            {
              text: "Header",
              link: "/components/header/",
            },
            {
              text: "ImageViewer",
              link: "/components/image-viewer/",
            },
            {
              text: "Loading",
              link: "/components/loading/",
            },
            {
              text: "Layout",
              link: "/components/layout/",
            },
            {
              text: "Split",
              link: "/components/split/",
            },
            {
              text: "Dialog",
              link: "/components/dialog/",
            },
            {
              text: "Toast",
              link: "/components/toast/",
            },
            {
              text: "VideoPlayer",
              link: "/components/video-player/",
            }
          ],
        }
      ]
    },  
  },
};
