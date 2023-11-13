<script setup lang="ts">
import { ref, onMounted } from 'vue'
import fetch from '@/utils/fetch'

import type { Post } from '@/types/Posts'

import PostCard from '@/components/Post.vue'
import Loader from '@/components/Loader.vue'

const posts = ref<Post[]>([])
const loading = ref(true)

onMounted(async () => {
  loading.value = true
  try {
    const res = await fetch({
      method: 'get',
      path: '/posts',
    })

    if (res) {
      posts.value = res
    }
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div v-if="!loading">
    <div class="posts" v-for="post in posts" :key="post.id">
      <PostCard :post="post" />
    </div>
  </div>
  <Loader v-else />
</template>
