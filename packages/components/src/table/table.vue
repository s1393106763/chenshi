<template>
  <div class="chenshi-table">
    <!-- 隐藏插槽用于收集 TableColumn 信息 -->
    <div v-show="false" ref="columnSlot">
      <slot />
    </div>

    <table class="chenshi-table__inner" cellspacing="0" cellpadding="0">
      <thead>
        <tr>
          <th v-for="(col, index) in columns" :key="index" :style="{ width: formatWidth(col.width) }">
            {{ col.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in data" :key="rowIndex">
          <td v-for="(col, colIndex) in columns" :key="colIndex">
            {{ row[col.prop!] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import './style/index.less';
import { ref, onMounted, useSlots, VNode, ComponentOptions } from 'vue';

defineOptions({ name: 'chenshi-table' });

interface TableProps {
  data: any[];
}

defineProps<TableProps>();

const slots = useSlots();
const columns = ref<any[]>([]);

const formatWidth = (width?: string | number) => {
  if (!width) return '';
  return typeof width === 'number' ? `${width}px` : width;
};

const getColumns = () => {
  const defaultSlot = slots.default ? slots.default() : [];
  const cols: any[] = [];

  // 递归查找 TableColumn 组件
  const findColumns = (vnodes: VNode[]) => {
    vnodes.forEach((vnode) => {
      if (typeof vnode.type === 'object' && (vnode.type as ComponentOptions).name === 'chenshi-table-column') {
        cols.push(vnode.props || {});
      } else if (Array.isArray(vnode.children)) {
        findColumns(vnode.children as VNode[]);
      }
    });
  };

  findColumns(defaultSlot);
  columns.value = cols;
};

onMounted(() => {
  getColumns();
});
</script>
