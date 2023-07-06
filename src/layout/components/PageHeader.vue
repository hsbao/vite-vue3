<script setup lang="ts" name="PageHeader">
  import { useGlobalStoreWithOut } from '@/store/modules/global'

  const { collapsed, globalStore } = useGlobalStoreWithOut()

  const onCollapsedChange = () => {
    globalStore.onCollapsedChange(!collapsed.value)
  }
</script>

<template>
  <div class="page-header">
    <span class="menu-fold" @click="onCollapsedChange">
      <el-icon v-if="collapsed"><Expand /></el-icon>
      <el-icon v-else><Fold /></el-icon>
    </span>
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
