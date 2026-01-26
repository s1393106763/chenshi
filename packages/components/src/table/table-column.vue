<template>
  <div v-if="false">
    <slot />
  </div>
</template>

<script lang="ts" setup>
defineOptions({ name: 'chenshi-table-column' });

export interface TableColumnProps {
  prop?: string;
  label?: string;
  width?: string | number;
}

defineProps<TableColumnProps>();
</script>
