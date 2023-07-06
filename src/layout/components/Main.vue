<script setup lang="ts">
  import useKeepAliveStore from '@/store/modules/keepAlive'
  const keepAliveStore = useKeepAliveStore()
  const keepAliveNames = computed(() => keepAliveStore.list)
</script>

<template>
  <el-main>
    <router-view v-slot="{ Component, route }">
      <transition appear name="fade-transform" mode="out-in">
        <keep-alive :include="keepAliveNames">
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </transition>
    </router-view>
  </el-main>
</template>

<style lang="scss" scoped>
  .el-main {
    padding: 0 16px 16px;
    background-color: #f4f5f6;
  }
</style>
