<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vitepress'
import defaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'

const DefaultLayout = defaultTheme.Layout

const route = useRoute()
const { site, theme } = useData()

// 当前是否在 iframe 内（移动端预览模式：仅展示组件演示，不展示代码/Attributes）
const isMobilePreview = ref(false)
onMounted(() => {
  isMobilePreview.value = window.self !== window.top
})
onUnmounted(() => {
  isMobilePreview.value = false
})

// 仅在组件文档页显示右侧手机预览（可根据需要改为始终显示）
const showPhonePreview = computed(() => {
  return route.path.startsWith('/components/') && !isMobilePreview.value
})

// iframe 地址：优先使用 themeConfig.mobilePreviewUrl，否则为当前文档同路径
const iframeSrc = computed(() => {
  if (typeof window === 'undefined') return ''
  const custom = theme.value?.mobilePreviewUrl
  if (typeof custom === 'string' && custom) return custom
  const base = site.value?.base ?? '/'
  const path = route.path.startsWith('/') ? route.path.slice(1) : route.path
  const baseNorm = base.endsWith('/') ? base : base + '/'
  return `${window.location.origin}${baseNorm}${path}`
})
</script>

<template>
  <div
    class="doc-with-preview"
    :class="{
      'has-phone': showPhonePreview,
      'doc-with-preview--mobile-preview': isMobilePreview,
    }"
  >
    <!-- 左侧：文档区域，可独立滚动（中间展示代码、配置、Attributes） -->
    <div class="doc-with-preview__main">
      <DefaultLayout>
        <template v-for="(_, name) in $slots" #[name]="slotData">
          <slot :name="name" v-bind="slotData || {}" />
        </template>
      </DefaultLayout>
    </div>

    <!-- 右侧：固定手机外壳 + iframe（仅展示按分类的组件样式） -->
    <aside v-if="showPhonePreview" class="doc-with-preview__phone">
      <div class="phone-frame">
        <div class="phone-frame__screen">
          <iframe
            class="phone-frame__iframe"
            :src="iframeSrc"
            title="移动端预览"
          />
        </div>
      </div>
    </aside>
  </div>
</template>

<style scoped>
.doc-with-preview {
  min-height: 100vh;
}

.doc-with-preview.has-phone .doc-with-preview__main {
  margin-right: var(--vp-phone-width, 375px);
}

.doc-with-preview__main {
  min-width: 0;
}

.doc-with-preview__phone {
  position: fixed;
  top: var(--vp-nav-height, 64px);
  right: 24px;
  bottom: 24px;
  width: var(--vp-phone-width, 375px);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.phone-frame {
  width: 100%;
  max-width: 375px;
  height: 100%;
  max-height: 667px;
  min-height: 500px;
  background: #1a1a1a;
  border-radius: 36px;
  padding: 12px;
  box-shadow:
    0 25px 50px -12px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(255, 255, 255, 0.05),
    inset 0 0 0 2px rgba(255, 255, 255, 0.03);
  pointer-events: auto;
}

.phone-frame__screen {
  width: 100%;
  height: 100%;
  background: #fff;
  border-radius: 24px;
  overflow: hidden;
}

.phone-frame__iframe {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
}

@media (max-width: 1279px) {
  .doc-with-preview.has-phone .doc-with-preview__main {
    margin-right: 0;
  }

  .doc-with-preview__phone {
    display: none;
  }
}
</style>

<!-- 移动端预览模式（iframe 内）：仅展示按分类的组件样式，隐藏导航/侧栏/代码/Attributes -->
<style>
.doc-with-preview--mobile-preview .VPSkipLink,
.doc-with-preview--mobile-preview .VPBackdrop,
.doc-with-preview--mobile-preview .VPNav,
.doc-with-preview--mobile-preview .VPLocalNav,
.doc-with-preview--mobile-preview .VPSidebar,
.doc-with-preview--mobile-preview .VPFooter,
.doc-with-preview--mobile-preview .VPDocFooter {
  display: none !important;
}

/* 文档区仅保留标题 + 分类标题 + 演示块；.demo-block 可能在 ClientOnly 的 div 内，用 :has() 保留其容器 */
.doc-with-preview--mobile-preview .vp-doc > * {
  display: none !important;
}
.doc-with-preview--mobile-preview .vp-doc > h1,
.doc-with-preview--mobile-preview .vp-doc > h2,
.doc-with-preview--mobile-preview .vp-doc > h3,
.doc-with-preview--mobile-preview .vp-doc > h4,
.doc-with-preview--mobile-preview .vp-doc > .demo-block,
.doc-with-preview--mobile-preview .vp-doc > div:has(.demo-block) {
  display: block !important;
}

/* 移动端不展示代码块和 Attributes 表格 */
.doc-with-preview--mobile-preview .vp-doc pre,
.doc-with-preview--mobile-preview .vp-doc div[class*='language-'],
.doc-with-preview--mobile-preview .vp-doc table,
.doc-with-preview--mobile-preview .vp-doc .vp-code {
  display: none !important;
}

.doc-with-preview--mobile-preview .doc-with-preview__main {
  margin-right: 0 !important;
  padding-top: 0 !important;
}

.doc-with-preview--mobile-preview .VPContent {
  padding-top: 12px !important;
  padding-left: 0 !important;
}

.doc-with-preview--mobile-preview .VPDoc {
  padding: 16px !important;
}

.doc-with-preview--mobile-preview .vp-doc h1 {
  font-size: 1.25rem;
  margin: 0 0 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.doc-with-preview--mobile-preview .vp-doc h2 {
  font-size: 0.9375rem;
  margin: 16px 0 8px;
  color: var(--vp-c-text-2);
}

.doc-with-preview--mobile-preview .vp-doc .demo-block {
  margin-bottom: 12px;
}

/* 按钮演示间距 */
.demo-block .chenshi-button {
  margin-right: 8px;
  margin-bottom: 8px;
}
</style>
