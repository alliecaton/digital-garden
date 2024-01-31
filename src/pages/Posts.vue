<script setup lang="ts">
import { onMounted } from 'vue'

import { useGetPosts } from '@/composables/useGetPosts'

import PostCard from '@/components/Post.vue'
import Loader from '@/components/Loader.vue'
import Pagination from '@/components/Pagination.vue'

const { posts, loading, getPosts, pagination } = useGetPosts()

onMounted(() => {
  getPosts(1)
})
</script>

<template>
  <div v-if="!loading">
    <div class="posts" v-for="post in posts" :key="post.id">
      <PostCard :post="post" />
    </div>
  </div>

  <Loader v-if="loading" />

  <Pagination :pagination="pagination" :loadMore="getPosts" />
</template>
