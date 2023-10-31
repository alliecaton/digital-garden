<script setup lang="ts">
import { ref, onMounted } from 'vue'
import fetch from '@/utils/fetch'

import type { Post } from '@/types/Posts'

import PostCard from '@/components/Post.vue'

const posts = ref<Post[]>([])

onMounted(async () => {
  const res = await fetch({
    method: 'get',
    path: '/posts',
  })

  if (res) {
    posts.value = res
  }
})
</script>

<template>
  <div v-for="post in posts" :key="post.id">
    <PostCard :post="post" />
  </div>
</template>
