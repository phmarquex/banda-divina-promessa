import type { App } from 'vue'
import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default function (app: App) {
  const store = createStore({
    state() {
      return {
        authenticated: false,
        token_time: 0,
        user: false,
      }
    },
    mutations: {
      userState(state, payload) {
        state.user = payload
      },
      userAuthenticated(state) {
        state.authenticated = !state.authenticated
      },
      refreshTokenLifetime(state) {
        state.token_time = Date.now()
      },
      logout(state) {
        state.user = false
        state.authenticated = false
      },
    },
    getters: {
      getRemainingTime(state) {
        return Math.round(((Date.now() - state.token_time) / 1000))
      },
    },
    plugins: [
      createPersistedState({
        storage: window.localStorage,
      }),
    ],
  })

  app.use(store)
}
