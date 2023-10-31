<script setup lang="ts">
import { onMounted, ref } from 'vue'
import fetch from '@/utils/fetch'

import PostCreate from '@/components/PostCreate.vue'

const loggedIn = ref(false)

const username = ref('')
const password = ref('')

const token = ref('')

const login = async () => {
  try {
    const res = await fetch({
      method: 'post',
      path: '/login',
      data: {
        username: username.value,
        password: password.value,
      },
      headers: {
        'x-access-token': token.value,
      },
    })

    if (res) {
      token.value = res.accessToken
      loggedIn.value = true
    }
  } catch (e) {
    console.error(e)
  }
}

const checkIfLoggedIn = async () => {
  loggedIn.value = false

  try {
    const res = await fetch({
      method: 'get',
      path: '/user',
    })

    if (res) {
      loggedIn.value = true
    } else {
      loggedIn.value = false
    }
  } catch (e) {
    console.error(e)
  }
}

onMounted(() => {
  checkIfLoggedIn()
})
</script>

<template>
  <div class="container" v-if="!loggedIn">
    <div>
      <label>username: </label>
      <input v-model="username" />
    </div>

    <div>
      <label>password: </label>
      <input v-model="password" type="password" />
    </div>

    <button @click="login">Login</button>
  </div>
  <div v-else>
    <PostCreate :submitToken="token" />
  </div>
</template>
