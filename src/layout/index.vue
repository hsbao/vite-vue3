<script setup lang="ts" name="Layout">
  import { storeToRefs } from 'pinia'

  import { useGlobalStoreWithOut } from '@/store/modules/global'
  import useUserStore from '@/store/modules/user'
  const userStore = useUserStore()
  const { menuList } = storeToRefs(userStore)

  import Main from './components/Main.vue'
  import PageHeader from './components/PageHeader.vue'
  import SidebarMenu from './components/SidebarMenu.vue'

  const { collapsed } = useGlobalStoreWithOut()

  const route = useRoute()

  const asiderWidth = computed(() => (collapsed.value ? '65px' : '220px'))
  const activeMenu = computed(
    () => (route.meta.activeMenu ? route.meta.activeMenu : route.path) as string
  )
</script>

<template>
  <div class="layout">
    <el-container>
      <el-aside>
        <div class="aside-content" :style="{ width: asiderWidth }">
          <div class="logo">
            <img class="logo-img" src="@/assets/vue.svg" alt="logo" />
            <span v-show="!collapsed" class="logo-text">Vue3 Admin</span>
          </div>

          <el-scrollbar>
            <el-menu
              :default-active="activeMenu"
              :collapse="collapsed"
              :router="false"
              :unique-opened="true"
              :collapse-transition="false"
            >
              <SidebarMenu :menu-list="menuList" />
            </el-menu>
          </el-scrollbar>
        </div>
      </el-aside>

      <el-container>
        <el-header height="64px" class="layout-header">
          <PageHeader />
        </el-header>

        <Main />
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
  .layout {
    overflow: hidden;
    width: 100%;
    height: 100vh;

    .el-container {
      width: 100%;
      height: 100%;
    }

    :deep(.el-aside) {
      width: auto;
      height: 100%;
      background-color: var(--el-menu-bg-color);
      border-right: 1px solid var(--el-border-color-light);

      .aside-content {
        display: flex;
        flex-direction: column;
        height: 100%;
        transition: width 0.25s ease;

        .el-scrollbar {
          height: calc(100% - 55px);

          .el-menu {
            overflow-x: hidden;
            width: 100%;
            border-right: none;
          }
        }

        .logo {
          display: flex;
          align-items: center;
          overflow: hidden;
          padding-left: 20px;
          width: 100%;
          height: 64px;

          .logo-img {
            width: 28px;
            object-fit: contain;
          }

          .logo-text {
            margin-left: 6px;
            font-size: 21.5px;
            white-space: nowrap;
            color: var(--el-logo-text-color);
            font-weight: bold;
          }
        }
      }
    }

    .layout-header {
      padding: 0;
    }
  }
</style>
