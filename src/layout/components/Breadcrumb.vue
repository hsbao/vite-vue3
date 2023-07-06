<script setup lang="ts">
  import useUserStore from '@/store/modules/user'

  const userStore = useUserStore()
  const route = useRoute()
  const router = useRouter()

  const breadcrumbList = computed(() => {
    return userStore.breadcrumbList[route.matched[route.matched.length - 1].path] ?? []
  })

  const onClickBreadcrumb = (item: AuthMenu.MenuOptions, index: number) => {
    if (index !== breadcrumbList.value.length - 1) router.push(item.path)
  }
</script>

<template>
  <div :class="['breadcrumb-box', 'no-icon']">
    <el-breadcrumb>
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="item in breadcrumbList" :key="item.path">
          <div class="el-breadcrumb__inner is-link">
            <span class="breadcrumb-title">{{ item.meta.title }}</span>
          </div>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<style lang="scss" scoped>
  .breadcrumb-box {
    display: flex;
    align-items: center;
    overflow: hidden;
    padding-right: 50px;
    mask-image: linear-gradient(90deg, #000 0%, #000 calc(100% - 50px), transparent);

    .el-breadcrumb {
      white-space: nowrap;

      .el-breadcrumb__item {
        position: relative;
        display: inline-block;
        float: none;

        .el-breadcrumb__inner {
          display: inline-flex;

          .breadcrumb-icon {
            margin-top: 2px;
            margin-right: 6px;
            font-size: 16px;
          }

          .breadcrumb-title {
            margin-top: 3px;
          }
        }

        :deep(.el-breadcrumb__separator) {
          position: relative;
          top: -1px;
        }
      }
    }
  }

  .no-icon {
    .el-breadcrumb {
      .el-breadcrumb__item {
        top: -2px;

        :deep(.el-breadcrumb__separator) {
          top: 2px;
        }
      }
    }
  }
</style>
