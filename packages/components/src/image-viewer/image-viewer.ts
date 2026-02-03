import type { Component, ExtractPropTypes, PropType } from 'vue';

export const definePropType = <T>(val: any): PropType<T> => val;
type Mutable<T> = { -readonly [P in keyof T]: T[P] };
const mutable = <T extends readonly any[] | Record<string, unknown>>(val: T) => val as Mutable<typeof val>;
const isNumber = (val: any): val is number => typeof val === 'number';

export type ImageViewerAction = 'zoomIn' | 'zoomOut' | 'clockwise' | 'anticlockwise';

export const imageViewerProps = {
  urlList: {
    type: definePropType<string[]>(Array),
    default: () => mutable([] as const)
  },
  zIndex: {
    type: Number,
    default: 2000
  },
  initialIndex: {
    type: Number,
    default: 0
  },
  infinite: {
    type: Boolean,
    default: true
  },
  hideOnClickModal: {
    type: Boolean,
    default: false
  },
  teleported: {
    type: Boolean,
    default: true
  },
  closeOnPressEscape: {
    type: Boolean,
    default: true
  },
  zoomRate: {
    type: Number,
    default: 1.2
  },
  minScale: {
    type: Number,
    default: 0.2
  },
  maxScale: {
    type: Number,
    default: 7
  },
  crossorigin: {
    type: definePropType<'anonymous' | 'use-credentials' | ''>(String)
  },
  rotate: {
    type: Boolean,
    default: true
  }
};

export type ImageViewerProps = ExtractPropTypes<typeof imageViewerProps>;

export const imageViewerEmits = {
  close: () => true,
  switch: (index: number) => isNumber(index),
  rotate: (deg: number) => isNumber(deg)
};

export type ImageViewerEmits = typeof imageViewerEmits;

export interface ImageViewerMode {
  name: string;
  icon: Component;
}
