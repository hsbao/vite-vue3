<script setup lang="ts">
  import { ElConfigProvider } from 'element-plus'
  import zhCN from 'element-plus/dist/locale/zh-cn.mjs'

  const locale = ref(zhCN)
</script>

<template>
  <el-config-provider :locale="locale">
    <el-button type="primary">Primary</el-button>
  </el-config-provider>
</template>

<style lang="scss" scoped>
  .logo {
    padding: 1.5em;
    height: 6em;
    transition: filter 300ms;
    will-change: filter;
  }

  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }

  .logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
  }
</style>
