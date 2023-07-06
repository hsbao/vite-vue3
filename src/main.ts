import './styles/index.scss'

import * as Icons from '@element-plus/icons-vue'
import { createApp } from 'vue'

import App from './App.vue'
import { initRouter } from './router'
import store from './store'

const app = createApp(App)

Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key as keyof typeof Icons])
})

!(async () => {
  app.use(store)
  await initRouter(app)
  app.mount('#app')
})()
