import { defineStore } from 'pinia'

import { ACCESS_TOKEN } from '@/constants'
import { getAllBreadcrumbList, getFlatMenuList } from '@/utils'
import storage from '@/utils/storage'

interface UserState {
  token: string
  menuList: AuthMenu.MenuOptions[]
  // router name，用来做按钮权限筛选
  routeName: string
}

export const useUserStore = defineStore({
  id: 'UserStore',
  state: (): UserState => ({
    token: storage.getItem(ACCESS_TOKEN) || '',
    menuList: [],
    routeName: '',
  }),
  getters: {
    flatMenuList: (state) => getFlatMenuList(state.menuList),
    breadcrumbList: (state) => getAllBreadcrumbList(state.menuList),
  },
  actions: {
    /** 登录成功保存token */
    setToken(token: string) {
      this.token = token ?? ''
      storage.setItem(ACCESS_TOKEN, this.token, 1)
    },
    setRouteName(name: string) {
      this.routeName = name
    },
    updateMenuList(menuList: AuthMenu.MenuOptions[]) {
      this.menuList = menuList
    },
    async getAuthMenuList() {
      const mockMenuList = [
        {
          path: '/home',
          name: 'Home',
          component: '/home/index',
          meta: {
            icon: 'HomeFilled',
            title: '首页',
          },
        },
        {
          path: '/test',
          name: 'Test',
          redirect: '/test/child',
          meta: {
            icon: 'Setting',
            title: '测试菜单',
          },
          children: [
            {
              path: '/test/child',
              name: 'TestChild',
              component: '/test/child',
              meta: {
                icon: 'HomeFilled',
                title: '测试子页面',
              },
            },
          ],
        },
      ]
      this.updateMenuList(mockMenuList)
    },
  },
})

export default useUserStore
