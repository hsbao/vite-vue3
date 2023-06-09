import { defineStore } from 'pinia'

interface KeepAliveState {
  /** 需要缓存的路由组件名称列表 */
  list: string[]
}

export const useKeepAliveStore = defineStore({
  id: 'keepAlive',
  state: (): KeepAliveState => ({
    list: [],
  }),
  actions: {
    add(name: string | string[]) {
      if (typeof name === 'string') {
        !this.list.includes(name) && this.list.push(name)
      } else {
        name.map((v) => {
          v && !this.list.includes(v) && this.list.push(v)
        })
      }
    },
    remove(name: string | string[]) {
      if (typeof name === 'string') {
        this.list = this.list.filter((v) => {
          return v !== name
        })
      } else {
        this.list = this.list.filter((v) => {
          return !name.includes(v)
        })
      }
    },
    clear() {
      this.list = []
    },
  },
})

export default useKeepAliveStore
