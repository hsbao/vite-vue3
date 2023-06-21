<script setup lang="ts" name="Layout">
  import { useGlobalStoreWithOut } from '@/store/modules/global'

  import PageHeader from './page-header/index.vue'

  const { collapsed } = useGlobalStoreWithOut()

  const asiderWidth = computed(() => (collapsed.value ? '80px' : '220px'))
</script>

<template>
  <div class="layout">
    <el-container>
      <el-aside :width="asiderWidth">Aside</el-aside>
      <el-container>
        <el-header height="64px" class="layout-header">
          <PageHeader />
        </el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
  .layout {
    overflow: hidden;
    width: 100%;
    height: 100vh;

    .layout-header {
      padding: 0;
    }
  }
</style>
