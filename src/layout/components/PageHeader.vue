<script setup lang="ts" name="PageHeader">
  import ToolBarLeft from './ToolBarLeft.vue'
  import ToolBarRight from './ToolBarRight.vue'
</script>

<template>
  <div class="page-header">
    <ToolBarLeft />
    <ToolBarRight />
  </div>
</template>

<style lang="scss" scoped>
  .page-header {
    position: sticky;
    top: 0;
    z-index: 10;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    width: 100%;
    height: 100%;
    background: #f4f5f6;
  }
</style>
