<script setup lang="ts">
import { onMounted, ref } from 'vue'

import PostCreate from '@/components/PostCreate.vue'

import { useAuthStore } from '@/stores/auth'

import { useRoute } from 'vue-router'

const store = useAuthStore()
const route = useRoute()

const username = ref('')
const password = ref('')

const login = async () => {
  try {
    await store.login(username.value, password.value)
  } catch (e) {
    console.error(e)
  }
}

onMounted(() => {
  if (route.name === 'logout') {
    store.logout()
  }
})
</script>

<template>
  <div class="container" v-if="!store.token">
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
    <PostCreate :submitToken="store.token" />
  </div>
</template>
