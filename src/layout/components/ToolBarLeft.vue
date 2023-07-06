<script setup lang="ts">
  import { useGlobalStoreWithOut } from '@/store/modules/global'

  import Breadcrumb from './Breadcrumb.vue'

  const { collapsed, globalStore } = useGlobalStoreWithOut()

  const onCollapsedChange = () => {
    globalStore.onCollapsedChange(!collapsed.value)
  }
</script>

<template>
  <div class="tool-bar-lf">
    <span class="menu-fold" @click="onCollapsedChange">
      <el-icon :size="18" color="#3339">
        <component :is="collapsed ? 'Expand' : 'Fold'" />
      </el-icon>
    </span>

    <Breadcrumb />
  </div>
</template>

<style lang="scss" scoped>
  .tool-bar-lf {
    display: flex;
    align-items: center;

    .menu-fold {
      margin-top: 5px;
      margin-right: 16px;
      cursor: pointer;
    }
  }
</style>
