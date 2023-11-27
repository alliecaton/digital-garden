import { defineStore } from 'pinia'

import fetch from '@/utils/fetch'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    // @ts-ignore-next-line
    token: JSON.parse(localStorage.getItem('token')),
    loggedIn: false,
  }),
  actions: {
    async checkUser() {
      try {
        const res = await fetch({
          method: 'get',
          path: '/user',
        })

        if (res) {
          this.loggedIn = res.loggedIn
        } else {
          this.loggedIn = false
        }
      } catch (e) {
        console.error(e)
      }
    },
    async login(username: string, password: string) {
      try {
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

        this.loggedIn = true
      } catch (e) {
        console.error(e)
      }
    },
    logout() {
      this.token = null
      localStorage.removeItem('token')
      this.loggedIn = false
    },
  },
})
