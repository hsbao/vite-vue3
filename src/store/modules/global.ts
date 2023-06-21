import { defineStore, storeToRefs } from 'pinia'

import store from '@/store'

interface IGlobalState {
  collapsed: boolean
}

export const useGlobalStore = defineStore({
  id: 'GlobalState',
  state: (): IGlobalState => ({
    collapsed: false,
  }),
  actions: {
    onCollapsedChange(collapsed: boolean) {
      this.collapsed = collapsed
    },
  },
})

export function useGlobalStoreWithOut() {
  const globalStore = useGlobalStore(store)
  const globalStoreRefs = storeToRefs(globalStore)
  return {
    globalStore,
    ...globalStoreRefs,
  }
}

export default useGlobalStore
