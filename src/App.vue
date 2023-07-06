<script setup lang="ts">
  import zhCN from 'element-plus/dist/locale/zh-cn.mjs'

  const locale = ref(zhCN)
</script>

<template>
  <el-config-provider :locale="locale">
    <router-view #="{ Component }">
      <component :is="Component" />
    </router-view>
  </el-config-provider>
</template>
