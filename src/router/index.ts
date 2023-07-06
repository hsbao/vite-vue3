import 'nprogress/nprogress.css'

import NProgress from 'nprogress'
import type { App } from 'vue'
import type { RouteLocationNormalized, RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory, isNavigationFailure } from 'vue-router'

import { ACCESS_TOKEN } from '@/constants'
import Layout from '@/layout/index.vue'
import { useKeepAliveStore } from '@/store/modules/keepAlive'
import useUserStore from '@/store/modules/user'
import storage from '@/utils/storage'

import { initDynamicRouter } from './dynamicRoutes'

export const whiteNameList = ['Login'] as const

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/layout',
    name: 'Layout',
    redirect: '/home',
    component: Layout,
    children: [],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
    meta: {
      title: '登录',
    },
  },
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_PUBLIC_PATH || './'),
  routes,
})

/**
 * @description 重置路由
 */
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && name !== 'Layout' && !whiteNameList.some((n) => n === name)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

/**
 * 获取路由对应的组件名称
 * @param route
 * @returns
 */
const getComponentName = (route: RouteLocationNormalized) => {
  const comp = route.matched.at(-1)?.components?.default
  return comp?.name ?? (comp as any)?.type?.name
}

export async function initRouter(app: App) {
  router.beforeEach(async (to, from, next) => {
    NProgress.start()
    const token = storage.getItem(ACCESS_TOKEN, null)
    const userStore = useUserStore()
    document.title = to.meta.title as string

    if (to.name === 'Login') {
      if (token) return next({ path: '/home' })
      resetRouter()
      return next()
    }

    if (whiteNameList.some((n) => n === to.name)) return next()

    // 5.判断是否有 Token，没有重定向到 login 页面
    if (!token) return next({ name: 'Login', replace: true })
    const hasRoute = router.hasRoute(to.name!)
    if (userStore.menuList.length === 0) {
      await initDynamicRouter()
      if (!hasRoute) {
        // 如果该路由不存在，可能是动态注册的路由，它还没准备好，需要再重定向一次到该路由
        next({ ...to, replace: true })
      } else {
        next()
      }
    } else {
      next()
    }

    userStore.setRouteName(to.name as string)

    NProgress.done()
  })

  router.afterEach((to, from, failure) => {
    const keepAliveStore = useKeepAliveStore()
    const token = storage.getItem(ACCESS_TOKEN, null)

    if (isNavigationFailure(failure)) {
      console.error('failed navigation', failure)
    }

    // 设置需要缓存的组件名称
    const toCompName = getComponentName(to)
    // 判断当前页面是否开启缓存，如果开启，则将当前页面的 componentName 信息存入 keep-alive 全局状态
    if (to.meta?.keepAlive) {
      if (toCompName) {
        keepAliveStore.add(toCompName)
      } else {
        console.warn(
          `${to.fullPath}页面组件的keepAlive为true但未设置组件名，会导致缓存失效，请检查`
        )
      }
    } else {
      if (toCompName) {
        keepAliveStore.remove(toCompName) // 不需要缓存的组件
      }
    }
    // 如果进入的是 Redirect 页面，则也将离开页面的缓存清空(刷新页面的操作)
    if (to.name === 'Redirect') {
      const fromCompName = getComponentName(from)
      fromCompName && keepAliveStore.remove(fromCompName)
    }
    // 如果用户已登出，则清空所有缓存的组件
    if (!token) {
      keepAliveStore.clear()
    }
    NProgress.done()
  })

  router.onError((error) => {
    console.log(error, '路由错误')
  })

  app.use(router)

  await router.isReady() // 路由准备就绪后挂载APP实例
}

export default router
