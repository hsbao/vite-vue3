import './styles/index.scss'

import { createApp } from 'vue'

import App from './App.vue'
import { initRouter } from './router'
import store from './store'

const app = createApp(App)

!(async () => {
  app.use(store)
  await initRouter(app)
  app.mount('#app')
})()
