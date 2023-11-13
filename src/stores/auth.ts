import { defineStore } from 'pinia'

import fetch from '@/utils/fetch'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    // @ts-ignore-next-line
    token: JSON.parse(localStorage.getItem('token')),
  }),
  actions: {
    async getUser() {},
    async login(username: string, password: string) {
      const res = await fetch({
        method: 'post',
        path: '/login',
        data: {
          username: username,
          password: password,
        },
      })

      // update pinia state
      this.token = res.accessToken

      // store user details and jwt in local storage to keep user logged in between page refreshes
      localStorage.setItem('token', JSON.stringify(this.token))
    },
    logout() {
      this.token = null
      localStorage.removeItem('token')
    },
  },
})
