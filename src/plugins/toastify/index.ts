import type { App } from 'vue'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'

export default function (app: App) {
  app.use(Vue3Toastify, {
    clearOnUrlChange: false,
    closeButton: true,
    autoClose: true,
    pauseOnFocusLoss: false,
  } as ToastContainerOptions)
}
