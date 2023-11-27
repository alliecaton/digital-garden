<script setup lang="ts">
import { onMounted } from 'vue'

import { useGetPosts } from '@/composables/useGetPosts'

import PostCard from '@/components/Post.vue'
import Loader from '@/components/Loader.vue'

const { posts, loading, getPosts } = useGetPosts()

onMounted(() => {
  getPosts()
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
