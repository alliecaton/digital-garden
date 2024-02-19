<script setup lang="ts">
import { onMounted } from 'vue'

import { useGetPosts } from '@/composables/useGetPosts'

import PostCard from '@/components/Post.vue'
import Loader from '@/components/Loader.vue'
import Pagination from '@/components/Pagination.vue'
import TagFilters from '@/components/TagFilters.vue'

const { posts, loading, getPosts, pagination, filterPostsByTags, tagIds } =
  useGetPosts()

onMounted(() => {
  getPosts(1)
})

const paginate = (page: number) => {
  if (tagIds.value?.length) {
    filterPostsByTags(null, page)
  } else {
    getPosts(page)
  }
}
</script>

<template>
  <div>
    <TagFilters :appliedTags="tagIds" :onClick="filterPostsByTags" />
  </div>

  <div>
    <div class="posts" v-for="post in posts" :key="post.id">
      <PostCard :post="post" />
    </div>
  </div>

  <Loader v-if="loading" />

  <Pagination :pagination="pagination" :loadMore="paginate" />
</template>
