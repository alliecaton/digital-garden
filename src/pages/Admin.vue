<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'

import PostCreate from '@/components/PostCreate.vue'
import BookmarkCreate from '@/components/BookmarkCreate.vue'

import { useAuthStore } from '@/stores/auth'

import { useRoute } from 'vue-router'

const store = useAuthStore()
const route = useRoute()

const username = ref('')
const password = ref('')

const loading = ref(true)
const login = async () => {
  loading.value = true

  try {
    await store.login(username.value, password.value)
  } catch (e) {
    console.error(e)
  }

  loading.value = false
}

type Tabs = 'posts' | 'bookmarks'

const tab = ref<Tabs>('posts')

const updateTab = (tabName: Tabs) => {
  tab.value = tabName
}

onMounted(async () => {
  loading.value = true
  await store.checkUser()

  if (route.name === 'logout') {
    store.logout()
  }

  loading.value = false
})

const showPosts = computed(() => tab.value === 'posts')
const showBookmarks = computed(() => tab.value === 'bookmarks')
</script>

<template>
  <div class="container" v-if="!store.loggedIn || loading">
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
    <div class="admin-tabs">
      <button
        class="button"
        @click="updateTab('posts')"
        :class="{ 'button--active': showPosts }"
      >
        Posts
      </button>
      <button
        class="button"
        @click="updateTab('bookmarks')"
        :class="{ 'button--active': showBookmarks }"
      >
        Bookmarks
      </button>
    </div>

    <KeepAlive v-if="showPosts">
      <PostCreate />
    </KeepAlive>

    <KeepAlive v-if="showBookmarks">
      <BookmarkCreate />
    </KeepAlive>
  </div>
</template>

<style scoped lang="scss">
.admin-tabs {
  padding: 15px 30px 0 30px;
  display: flex;
  gap: 20px;
  border-bottom: 1px solid $light;
}

.button {
  border: none;
  background-color: transparent;
  border-radius: 4px 4px 0 0;

  cursor: pointer;
  padding: 10px;

  &:hover {
    background-color: $light;
  }
}

.button--active {
  background-color: $light;
}
</style>
