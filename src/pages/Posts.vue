<script setup lang="ts">
import { onMounted } from 'vue'

import { useGetPosts } from '@/composables/useGetPosts'

import PostCard from '@/components/Post.vue'
import Loader from '@/components/Loader.vue'
import Pagination from '@/components/Pagination.vue'
import TagFilters from '@/components/TagFilters.vue'

import { useRoute } from 'vue-router'

const {
  posts,
  loading,
  getPosts,
  pagination,
  filterPostsByTags,
  selectedTags,
  requestTagsOnMount,
} = useGetPosts()

const route = useRoute()

onMounted(() => {
  const pageQuery = Number(route.query.page) || 1
  const tagQuery = route.query.tags
  if (tagQuery) {
    requestTagsOnMount(pageQuery, String(tagQuery))
  } else {
    getPosts(pageQuery)
  }
})

const paginate = (page: number) => {
  if (selectedTags.value?.length) {
    filterPostsByTags(null, page)
  } else {
    getPosts(page)
  }
}
</script>

<template>
  <TagFilters :appliedTags="selectedTags" :onClick="filterPostsByTags" />

  <div>
    <div class="posts" v-for="post in posts" :key="post.id">
      <PostCard :post="post" />
    </div>
  </div>

  <Loader v-if="loading" />

  <Pagination :pagination="pagination" :loadMore="paginate" />
</template>
