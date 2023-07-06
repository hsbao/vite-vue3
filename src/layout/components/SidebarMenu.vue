<script setup lang="ts" name="SubMenu">
  defineProps<{ menuList: AuthMenu.MenuOptions[] }>()

  const route = useRoute()
  const router = useRouter()

  const handleClickMenu = (item: AuthMenu.MenuOptions) => {
    if (item.meta.link) return window.open(item.meta.link, '_blank')
    if (item.path === route.fullPath) return
    router.push(item.path)
  }
</script>

<template>
  <template v-for="subItem in menuList" :key="subItem.path">
    <el-sub-menu v-if="subItem.children?.length" :index="subItem.path">
      <template #title>
        <el-icon>
          <component :is="subItem.meta.icon"></component>
        </el-icon>
        <span class="sle">{{ subItem.meta.title }}</span>
      </template>
      <SubMenu :menu-list="subItem.children" />
    </el-sub-menu>
    <el-menu-item v-else :index="subItem.path" @click="handleClickMenu(subItem)">
      <el-icon>
        <component :is="subItem.meta.icon"></component>
      </el-icon>
      <template #title>
        <span class="sle">{{ subItem.meta.title }}</span>
      </template>
    </el-menu-item>
  </template>
</template>
