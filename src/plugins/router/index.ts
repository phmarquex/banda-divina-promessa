import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  document.title = (to.meta.title as string) || 'Lazy'
  next()
})

export default function (app: App) {
  app.use(router)
}

export { router }
