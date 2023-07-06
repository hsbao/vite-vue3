import { ElNotification } from 'element-plus'
import type { RouteRecordRaw } from 'vue-router'

import useUserStore from '@/store/modules/user'

import router from './index'

const modules = import.meta.glob('@/views/**/*.vue')

/**
 * 动态添加路由
 */
export const generatorDynamicRouter = async () => {
  const userStore = useUserStore()

  userStore.flatMenuList.forEach((item) => {
    item.children && delete item.children
    if (item.component && typeof item.component == 'string') {
      item.component = modules['/src/views' + item.component + '.vue']
    }
    if (item.meta.isFull) {
      router.addRoute(item as unknown as RouteRecordRaw)
    } else {
      router.addRoute('Layout', item as unknown as RouteRecordRaw)
    }
  })
}

/**
 * @description 初始化动态路由
 */
export const initDynamicRouter = async () => {
  const userStore = useUserStore()
  await userStore.getAuthMenuList()

  // 判断是否有配置菜单权限
  if (!userStore.menuList.length) {
    ElNotification({
      title: '无权限访问',
      message: '当前账号无任何菜单权限，请联系系统管理员！',
      type: 'error',
      duration: 1000,
    })
    return Promise.reject('No permission')
  }

  generatorDynamicRouter()
}
