import { defineStore } from 'pinia'

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    auth: {
      isAuthenticated: JSON.parse(localStorage.getItem('isAuthenticated') || 'null'),
      neverShowAgain: JSON.parse(localStorage.getItem('neverShowAgain') || 'null'),
    },
  }),
  getters: {
    isAuthenticated: (state) => !!state.auth.isAuthenticated,
    neverShowAgain: (state) => !!state.auth.neverShowAgain,
  },
  actions: {
    setAuth(authValue?: boolean, neverShowValue?: boolean) {
      this.auth.isAuthenticated = authValue
      this.auth.neverShowAgain = neverShowValue
      localStorage.setItem('isAuthenticated', JSON.stringify(this.auth.isAuthenticated))
      localStorage.setItem('neverShowAgain', JSON.stringify(this.auth.neverShowAgain))
    },
  },
})
